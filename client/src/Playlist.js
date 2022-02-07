import { useState } from 'react';
import './Playlist.css'

function Playlist(props) {
    const { item, onPut, onDelete, onSelect } = props;
    const [descriere, setDescriere] = useState(item.descriere)
    const [editeaza, setEditeaza] = useState(false);

    const stergePlaylist = () => {
        onDelete(item.id);
    }

    const schimbaDescrierea = (event) => {
        setDescriere(event.target.value)
    }

    const editeazaPlaylist = () => {
        setEditeaza(true);
    }

    const anuleaza = () => {
        setEditeaza(false);
    }

    const salveaza = () => {
        onPut(item.id, {descriere})
        setEditeaza(false);
    }

    const selecteazaPlaylist = () => {
        onSelect(item.id)
    }

    return (
        <>
            {
                editeaza ? (
                    <div className="playlist">
                        <div className="descriere">
                            <input type="text" value={descriere} onChange={schimbaDescrierea} />
                        </div>
                        <div className="data">
                            {item.data}
                        </div>
                        <button onClick={anuleaza}>Anuleaza</button>
                        <button onClick={salveaza}>Salveaza</button>
                    </div>
                ) : (
                    <div className="playlist">
                        <div className="descriere">
                            {item.descriere}
                        </div>
                        <div className="data">
                            {item.data}
                        </div>
                        <button onClick={stergePlaylist}>Sterge</button>
                        <button onClick={editeazaPlaylist}>Editeaza</button>
                        <button onClick={selecteazaPlaylist}>Vezi playlist</button>
                    </div>
                )
            }
        </>
    )
}

export default Playlist;