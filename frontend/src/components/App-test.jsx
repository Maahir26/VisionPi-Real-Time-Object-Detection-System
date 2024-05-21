import React, { useState } from 'react';

function App() {
    const [imageUrl, setImageUrl] = useState('');

    const handleClick = async () => {
        try {
            const response = await fetch('http://localhost:4000/picture');
            if (!response.ok) {
                throw new Error('Failed to fetch image');
            }
            const imageData = await response.blob();
            const url = URL.createObjectURL(imageData);
            setImageUrl(url);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <button onClick={handleClick}>Get Picture</button>
            {imageUrl && <img src={imageUrl} alt="Result" />}
        </div>
    );
}

export default App;
