import './PlaylistList.css'
import { useEffect, useState } from 'react';
import Playlist from './Playlist';
import PlaylistForm from './PlaylistForm';
import SongsList from './SongsList';
import PlaylistFiltrare from './PlaylistFiltrare';

const server = "http://localhost:5000"

function PlaylistList() {
    const [playlists, setPlaylists] = useState([]);
    const [playlistId, setPlaylistId] = useState(0);
    const [filtrat, setFiltrat] = useState(false);

    useEffect(() => {
        getPlaylists();
    }, [])

    const getPlaylists = async () => {
        try {
            const response = await fetch(`${server}/playlist`)
            if (!response.ok) {
                throw response
            }
            const data = await response.json();
            setPlaylists(data);
        } catch (error) {
            console.warn(error);
        }
    }

    const postPlaylist = async (playlist) => {
        try {
            const response = await fetch(`${server}/playlist`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(playlist)
            })
            if (!response.ok) {
                throw response
            }
            getPlaylists()
        } catch (error) {
            console.warn(error);
        }
    }

    const putPlaylist = async (playlistId, playlist) => {
        try {
            const response = await fetch(`${server}/playlist/${playlistId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(playlist)
            })
            if (!response.ok) {
                throw response
            }
            getPlaylists()
        } catch (error) {
            console.warn(error);
        }
    }

    const deletePlaylist = async (playlistId) => {
        try {
            const response = await fetch(`${server}/playlist/${playlistId}`, {
                method: 'DELETE'
            })
            if (!response.ok) {
                throw response
            }
            getPlaylists()
        } catch (error) {
            console.warn(error);
        }
    }

    const selecteazaPlaylist = (id) => {
        setPlaylistId(id);
    }

    const filtreaza = async (descriere, dataMin) => {
        try {
            const response = await fetch(`${server}/playlist/filtrat?desc=${descriere}&data=${dataMin}`)
            if (!response.ok) {
                throw response
            }
            const data = await response.json();
            setFiltrat(true);
            setPlaylists(data);
        } catch (error) {
            console.warn(error);
        }
    }

    const reseteaza = async () => {
        getPlaylists();
        setFiltrat(false);
    }

    return (
        <div className='wrapper'>
            <div className='wrapper-playlist'>
                <div className='name'>
                    <h3>Playlists</h3>
                </div>
                {
                    playlists.map(playlist => <Playlist key={playlist.id} item={playlist} onPut={putPlaylist} onDelete={deletePlaylist} onSelect={selecteazaPlaylist} />)
                }
                <PlaylistForm onPost={postPlaylist} />
                <PlaylistFiltrare onFilter={filtreaza} onReset={reseteaza} />
            </div>
            <div className='wrapper-songs'>
                <div className='name'>
                    <h3>Songs</h3>
                    {
                        (playlistId!==0) ? (
                            <SongsList server={server} playlistId={playlistId}/>
                        ) : (<></>)
                    }
                </div>
            </div>
        </div>
    );
}

export default PlaylistList;
