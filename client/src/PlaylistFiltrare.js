import {useState} from 'react';
import './PlaylistFiltrare.css'

function PlaylistFiltrare (props) {
    const {onFilter, onReset} = props;
    const [descriere, setDescriere] = useState("")
    const [dataMin, setDataMin] = useState("")

    const filtreaza = async () => {
        onFilter(descriere, dataMin);
        setDescriere("");
        setDataMin("");
    }

    const reseteaza = async () => {
        onReset();
        setDescriere("");
        setDataMin("");
    }

    return(
        <div className='filtrare-playlist'>
            <h5>Filtrare playlist-uri</h5>
            <label>Keyword:</label>
            <input type="text" value={descriere} onChange={(evt) => setDescriere(evt.target.value)}></input>
            <label>Data minima a creari:</label>
            <input type="date" value={dataMin} onChange={(evt) => setDataMin(evt.target.value)}></input>
            <input type="button" value="Filtreaza" onClick={filtreaza}/>
            <input type="button" value="Vezi toate playlist-urile" onClick={reseteaza}/>
        </div>
    )
}

export default PlaylistFiltrare;