/**
 * @file Video.jsx
 * @author Gabriel
 * @brief This file handles the video frontend
 * @version 0.1
 * @date 2024-04-01
 * 
 * @copyright Copyright (c) 2024
 * 
 */
import React, { useEffect, useRef } from 'react';

const Video = () => {
    return (
        <div>
            <PanelOne />
        </div>
    );
}

const PanelOne = () => {
    const videoRef = useRef(null);

    useEffect(() => {
       
    }, []);

    const fetchVideoStream = async () => { //function that fetches the /video get request
        try {
            const response = await fetch('http://localhost:4000/video');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const videoBlob = await response.blob();
            const videoURL = URL.createObjectURL(videoBlob);
            if (videoRef.current) {
                videoRef.current.src = videoURL;
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h2>Live Video with Object Detection</h2>
            <video ref={videoRef} autoPlay controls />
        </div>
    );
}

export default Video;
