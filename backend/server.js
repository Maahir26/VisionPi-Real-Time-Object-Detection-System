/**
 * @file server.js
 * @author Gabriel
 * @brief This file handles the backend server request
 * @version 0.1
 * @date 2024-04-01
 * 
 * @copyright Copyright (c) 2024
 * 
 */
const express = require('express');
const app = express();
const { spawn } = require('child_process');
const cors = require('cors');
const path = require('path');
const multer = require('multer');


app.use(cors());

///set up multer to handle file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './'); //save the uploaded file in the current directory
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname); //keeps the original filename
    }
});

const upload = multer({ storage: storage }); //because its in backend folder now and thats where it will save to aka destination


app.use((req, res, next) => { //this function basically is used to log and print out all the requests in this server
    console.log(req.path, req.method)
    next()
})


app.get('/', (req, res) => { //get request when its at home, its used to test api request
    res.send('Hello, Express!');
});

/**
 * @brief this handles the post request of uploading image
 */
app.post('/upload-image', upload.single('image'), (req, res) => { //this is the post request, to upload image to backend datastorage
    if (!req.file) {
        return res.status(400).send('No files were uploaded.');
    }
    res.send('Image uploaded successfully');
});

/**
 * @brief this handles the get request for pictures to be posted on website
 */
app.get('/picture', (req, res) => { //this is get request for picture, which runs the c++ file called detect_img and gets result to frontned
    // Execute the C++ file
    const process = spawn('./detect_img.out', [], { detached: true });

    process.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    process.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    process.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
        //serve the image file
        res.sendFile(__dirname + '/image_result.jpg'); //sends the image file from current directory path so its equivlance would be ./image_result.jpg, it will send that file
    });
});


/**
 * @brief this handles the get request for video
 */
app.get('/video', (req, res) => {
    const process = spawn('./detect_live.out', [], { detached: true });


    process.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    process.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    process.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
        // Once the process is finished, respond with the video file
        res.sendFile(__dirname + '/video_result.avi');
    });

});


app.listen(4000, () => {
    console.log('Server is running on http://localhost:4000');
});
