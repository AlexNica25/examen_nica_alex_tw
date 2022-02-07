import { useState } from 'react';
import './SongForm.css'

function PlaylistForm(props) {
    const { onPost } = props;
    const [titlu, setTitlu] = useState("");
    const [url, setUrl] = useState("");
    const [stil, setStil] = useState("");

    const postSong = () => {
        onPost({ titlu, url, stil })
        setTitlu("")
        setUrl("")
        setStil("")
    }

    return (
        <div className="song-form">
            <div className="song-titlu">
                <label>Titlu:</label>
                <br />
                <input type="text" value={titlu} onChange={(evt) => setTitlu(evt.target.value)} />
            </div>
            <div className="song-url">
                <label>URL:</label>
                <br />
                <input type="text" value={url} onChange={(evt) => setUrl(evt.target.value)} />
            </div>
            <div className="song-stil">
                <label>Stil:</label>
                <br />
                <select onChange={(evt) => setStil(evt.target.value)}>
                    <option></option>
                    <option value="POP">POP</option>
                    <option value="ALTERNATIVE">ALTERNATIVE</option>
                    <option value="ROCK">ROCK</option>
                </select>
            </div>
            <input type="button" value="Salveaza" onClick={postSong} />

        </div>
    )
}

export default PlaylistForm;