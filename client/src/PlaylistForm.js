import { useState } from 'react';
import './PlaylistForm.css'

function PlaylistForm (props) {
    const {onPost} = props;
    const [descriere, setDescriere] = useState("");

    const schimbaDescrierea = (event) => {
        setDescriere(event.target.value)
    }

    const postPlaylist = () => {
        onPost({descriere})
        setDescriere("")
    }

    return(
        <div className="playlist-form">
            <div className="playlist-descriere">
                <h5>Playlist nou</h5>
                <label>Descrierea playlist-ului:</label>
                <br/>
                <input type="text" value={descriere} onChange={schimbaDescrierea} />
            </div>
            <input type="button" value="Salveaza" onClick={postPlaylist}/>

        </div>
    )
}

export default PlaylistForm;