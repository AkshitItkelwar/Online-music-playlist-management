import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [file, setFile] = useState(null);
    const [musicList, setMusicList] = useState([]);

    useEffect(() => {
        fetchMusic();
    }, []);

    const fetchMusic = async () => {
        try {
            const response = await axios.get('http://localhost:5000/music');
            setMusicList(response.data);
        } catch (error) {
            console.error('Error fetching music:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('artist', artist);
        formData.append('file', file);

        try {
            await axios.post('http://localhost:5000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            fetchMusic();
            setTitle('');
            setArtist('');
            setFile(null);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div>
            <h1>Gaana Clone</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Artist"
                    value={artist}
                    onChange={(e) => setArtist(e.target.value)}
                    required
                />
                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    required
                />
                <button type="submit">Upload</button>
            </form>
            <div>
                <h2>Uploaded Music</h2>
                <ul>
                    {musicList.map((music, index) => (
                        <li key={index}>
                            <strong>{music.title}</strong> by {music.artist}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default App;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [file, setFile] = useState(null);
    const [musicList, setMusicList] = useState([]);

    useEffect(() => {
        fetchMusic();
    }, []);

    const fetchMusic = async () => {
        try {
            const response = await axios.get('http://localhost:5000/music');
            setMusicList(response.data);
        } catch (error) {
            console.error('Error fetching music:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('artist', artist);
        formData.append('file', file);

        try {
            await axios.post('http://localhost:5000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            fetchMusic();
            setTitle('');
            setArtist('');
            setFile(null);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div>
            <h1>Gaana Clone</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Artist"
                    value={artist}
                    onChange={(e) => setArtist(e.target.value)}
                    required
                />
                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    required
                />
                <button type="submit">Upload</button>
            </form>
            <div>
                <h2>Uploaded Music</h2>
                <ul>
                    {musicList.map((music, index) => (
                        <li key={index}>
                            <strong>{music.title}</strong> by {music.artist}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default App;
