const { Op } = require("sequelize");
const cors=require('cors')
const express = require("express");
const app = express();
app.use(cors())
app.use(express.json());

const port = 5000;

const sequelize = require('./sequelize.js');
const Playlist = require("./modele/Playlist.js");
const Song = require("./modele/Song")

Playlist.hasMany(Song);


app.get('/sync', async (req, res, next) => {
    try{
        await sequelize.sync({force: true});
        res.status(201).json({message: "tabelele au fost create"})
    }
    catch (error) {
        res.status(500).json({message: 'eroare'})
    }
})

app.get('/playlist', async (req, res) => {
    try {
        const playlist = await Playlist.findAll()
        res.status(200).json(playlist)
    } catch (error) {
        res.status(500).json({message: 'eroare'})
    }
})

app.get('/playlist/filtrat', async (req, res) => {
    try {
        const descriere = req.query.desc
        const dataMin = req.query.data
        const playlist = await Playlist.findAll({
            where: {
                descriere: {
                    [Op.like]: `%${descriere}%`
                },
                data: {
                    [Op.gte]: dataMin
                }
            }
        })
        res.status(200).json(playlist)
    } catch (error) {
        res.status(500).json({message: 'eroare'})
    }
})

app.get('/playlist/paginare', async (req, res) => {
    try {
        const playlist = await Playlist.findAndCountAll({
            limit: 3,
            offset: req.query.offset
        })
        res.status(200).json(playlist.rows)
    } catch (error) {
        res.status(500).json({message: 'eroare'})
    }
})

app.post('/playlist', async (req, res) => {
    try {
        const playlist = req.body; 
        playlist.data = Date.now();
        await Playlist.create(playlist)
        res.status(200).json({message: 'playlist creat'})
    } catch (error) {
        res.status(500).json({message: 'eroare'})
    }
})

app.put('/playlist/:pid', async (req, res) => {
    try {
        const playlist = await Playlist.findByPk(req.params.pid);
        if(playlist){
            await playlist.update(req.body, {fields: ["descriere"]})
            res.status(200).json({message: "playlist-ul a fost modificat"})
        } else{
            res.status(404).json({message: 'playlist-ul nu exista'})
        }
    } catch (error) {
        res.status(500).json({message: 'eroare'})
    }
})

app.delete('/playlist/:pid', async (req, res) => {
    try {
        const playlist = await Playlist.findByPk(req.params.pid);
        if(playlist){
            await playlist.destroy()
            res.status(200).json({message: "playlist-ul a fost sters"})
        } else{
            res.status(404).json({message: 'playlist-ul nu exista'})
        }
    } catch (error) {
        res.status(500).json({message: 'eroare'})
    }
})

app.get('/playlist/:pid/songs', async (req, res) => {
    try {
        const playlist = await Playlist.findByPk(req.params.pid);
        if(playlist){
           const songs = await playlist.getSongs();
            res.status(200).json(songs)
        } else{
            res.status(404).json({message: 'playlist-ul nu exista'})
        }
    } catch (error) {
        res.status(500).json({message: 'eroare'})
    }
})

const sortareMelodii = (x, y) => {
    xTitlu = x.titlu.toUpperCase();
    yTitlu = y.titlu.toUpperCase();
    if(xTitlu < yTitlu) return -1;
    if(xTitlu > yTitlu) return 1;
    return 0;
}

app.get('/playlist/:pid/songs/sortat', async (req, res) => {
    try {
        const playlist = await Playlist.findByPk(req.params.pid);
        if(playlist){
            const songs = await playlist.getSongs();
            songs.sort(sortareMelodii)
            res.status(200).json(songs)
        } else{
            res.status(404).json({message: 'playlist-ul nu exista'})
        }
    } catch (error) {
        res.status(500).json({message: 'eroare'})
    }
})

app.post('/playlist/:pid/songs', async (req, res) => {
    try {
        const playlist = await Playlist.findByPk(req.params.pid);
        if(playlist){
            const song = req.body;
            song.playlistId = playlist.id
            await Song.create(song);
            res.status(200).json({message: 'melodia a fost creata'})
        } else{
            res.status(404).json({message: 'playlist-ul nu exista'})
        }
    } catch (error) {
        res.status(500).json({message: 'eroare'})
    }
})

app.put('/playlist/:pid/songs/:sid', async (req, res) => {
    try {
        const playlist = await Playlist.findByPk(req.params.pid);
        if(playlist){
            const songs = await playlist.getSongs({where: {id: req.params.sid}})
            const song = songs.shift();
            if(song){
                await song.update(req.body, {fields: ['titlu', 'url', 'stil']});
                res.status(200).json({message: 'melodia a fost modificata'})
            }else {
                res.status(404).json({message: 'melodia nu exista'})
            }
        } else{
            res.status(404).json({message: 'playlist-ul nu exista'})
        }
    } catch (error) {
        res.status(500).json({message: 'eroare'})
    }
})

app.delete('/playlist/:pid/songs/:sid', async (req, res) => {
    try {
        const playlist = await Playlist.findByPk(req.params.pid);
        if(playlist){
            const songs = await playlist.getSongs({where: {id: req.params.sid}})
            const song = songs.shift();
            if(song){
                await song.destroy()
                res.status(200).json({message: 'melodia a fost stearsa'})
            }else {
                res.status(404).json({message: 'melodia nu exista'})
            }
        } else{
            res.status(404).json({message: 'playlist-ul nu exista'})
        }
    } catch (error) {
        res.status(500).json({message: 'eroare'})
    }
})

app.listen(port, async () => {
    console.log("Server: http://localhost:" + port);
})