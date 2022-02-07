import { useEffect, useState } from "react";
import Song from './Song'
import SongForm from "./SongForm";

function SongsList(props) {
    const { server, playlistId } = props;
    const [songs, setSongs] = useState([]);

    const getSongs = async () => {
        try {
            const response = await fetch(`${server}/playlist/${playlistId}/songs`)
            if (!response.ok) {
                throw response
            }
            const data = await response.json();
            setSongs(data);
        } catch (error) {
            console.warn(error);
        }
    }

    const postSong = async (song) => {
        try {
            const response = await fetch(`${server}/playlist/${playlistId}/songs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(song)
            })
            if (!response.ok) {
                throw response
            }
            getSongs();
        } catch (error) {
            console.warn(error);
        }
    }

    const putSong = async (songId, song) => {
        try {
            const response = await fetch(`${server}/playlist/${playlistId}/songs/${songId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(song)
            })
            if (!response.ok) {
                throw response
            }
            getSongs();
        } catch (error) {
            console.warn(error);
        }
    }

    const deleteSong = async (songId) => {
        try {
            const response = await fetch(`${server}/playlist/${playlistId}/songs/${songId}`, {
                method: 'DELETE'
            })
            if (!response.ok) {
                throw response
            }
            getSongs();
        } catch (error) {
            console.warn(error);
        }
    }

    useEffect(() => {
        getSongs()
    }, [playlistId])

    return (
        <div>
            {
                songs.map(song => <Song key={song.id} item={song} onPut={putSong} onDelete={deleteSong} />)
            }
            <SongForm onPost={postSong}/>
        </div>
    )

}

export default SongsList;