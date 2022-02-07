import { useState } from 'react';
import './Song.css'

function Song(props) {
    const { item, onPut, onDelete } = props;
    const [editeaza, setEditeaza] = useState(false);
    const [titlu, setTitlu] = useState(item.titlu);
    const [url, setUrl] = useState(item.url);
    const [stil, setStil] = useState(item.stil);

    const deleteSong = () => {
        onDelete(item.id);
    }

    const editSong = () => {
        setEditeaza(true)
    }

    const anuleaza = () => {
        setEditeaza(false);
        setTitlu(item.titlu)
        setUrl(item.url)
        setStil(item.stil)
    }

    const salveaza = () => {
        onPut(item.id, { titlu, url, stil })
        setEditeaza(false);
    }


    return (

        <>
            {
                editeaza ? (
                    <div className="song">
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
                                <option value={stil}>{stil}</option>
                                <option value="POP">POP</option>
                                <option value="ALTERNATIVE">ALTERNATIVE</option>
                                <option value="ROCK">ROCK</option>
                            </select>
                        </div>
                        <input type="button" value="Anuleaza" onClick={anuleaza} />
                        <input type="button" value="Salveaza" onClick={salveaza} />

                    </div>
                ) : (
                    <div className="song">
                        <div className="titlu">
                            {item.titlu}
                        </div>
                        <div className="url">
                            {item.url}
                        </div>
                        <div className="stil">
                            {item.stil}
                        </div>
                        <button onClick={deleteSong}>Sterge</button>
                        <button onClick={editSong}>Editeaza</button>
                    </div>
                )
            }
        </>


    )
}

export default Song;