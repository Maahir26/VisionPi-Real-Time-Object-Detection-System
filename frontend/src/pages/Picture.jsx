/**
 * @file Picture.jsx
 * @author Gabriel
 * @brief This file handles the picture taking
 * @version 0.1
 * @date 2024-04-01
 * 
 * @copyright Copyright (c) 2024
 * 
 */
import React, { useEffect, useState, useRef } from 'react';

const Picture = () => { //picture function that runs panelOne and panelTwo functions
    return (
        <div>
            <PanelOne/>
        </div>
    );
}

const PanelOne = () => {
    const [stream, setStream] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => { //use effect 
        const startCamera = async () => {
            try {
                const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
                setStream(mediaStream);
                if (videoRef.current) {
                    videoRef.current.srcObject = mediaStream;
                }
            } catch (error) {
                console.error('Error accessing camera:', error);
            }
        };

        //startCamera();

        return () => {
            if (stream) {
                stream.getTracks().forEach(track => {
                    track.stop();
                });
            }
        };
    }, []);

    const takePictureAndFetch = async () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            canvas.toBlob(async (blob) => {
                const formData = new FormData();
                formData.append('image', blob, 'image.jpg');
                try {
                    const response = await fetch('http://localhost:4000/upload-image', {
                        method: 'POST',
                        body: formData,
                    });
                    if (!response.ok) {
                        throw new Error('Failed to save image');
                    }
                    console.log('Image saved successfully');

                    const pictureResponse = await fetch('http://localhost:4000/picture');
                    if (!pictureResponse.ok) {
                        throw new Error('Failed to fetch image');
                    }
                    const imageData = await pictureResponse.blob();
                    const url = URL.createObjectURL(imageData);
                    setImageUrl(url);
                } catch (error) {
                    console.error(error);
                }
            }, 'image/jpeg');
        }
    };

    const displayImage = () => {
        // Create an image element
        const img = document.createElement('img');

        // Set the source of the image to the local file path
        img.src = './image_result.jpg'; // Replace 'path/to/your/image.jpg' with the actual path to your image

        // Set optional attributes like width and height
        img.width = 1000; // Adjust width as needed
        img.height = 800; // Adjust height as needed

        // Get the container element where the image will be displayed
        const container = document.getElementById('imageContainer');

        // Clear any existing content in the container
        container.innerHTML = '';

        // Append the image to the container
        container.appendChild(img);
    };

    return (
        <div>
            <div>
                <video ref={videoRef} autoPlay />
                <canvas ref={canvasRef} style={{ display: 'none' }} />
            </div>
            <div>
                <button onClick={displayImage}>Display Image</button>
            </div>
            <div>
                <div className='button'>
                    {imageUrl && <img src={imageUrl} alt="Result" />}
                    Here is where it will display the image:
                    <div id="imageContainer" className="button"></div>
                </div>
            </div>
        </div>
    );
}

export default Picture;
