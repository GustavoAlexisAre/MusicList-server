const router = require("express").Router();
const SpotifyWebApi = require('spotify-web-api-node');
const {getPlaylists, getPlaylistById, createPlaylist, updatePlaylist, deletePlaylist } = require("../controllers/playlist.Controller");
const { createSong, deleteSong } = require("../controllers/song.Controller");
const User = require("../models/User.model");
const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
});



spotifyApi
    .clientCredentialsGrant()
    .then(data => spotifyApi.setAccessToken(data.body['access_token']))
    .catch(error => console.log('Something went wrong when retrieving an access token', error));

router.get("/", (req,res) => {
    res.json("all good here")
})

router.get("/artists/:artistName", (req, res) => {
    spotifyApi
        .searchArtists(req.params.artistName)
        .then(data => {
            const artists = data.body.artists.items.map(artist => ({
                id: artist.id,
                name: artist.name,
                image: artist.images.length ? artist.images[0].url : null
            }));
            res.json(artists);
            return artists
        })
        .catch(err => console.log('The error while searching artists occurred: ', err));
});

router.get('/artists/:artistId/albums', (req, res, next) => {
    spotifyApi.getArtistAlbums(req.params.artistId)
        .then((data) => {
            const albums = data.body.items.map(album => ({
                id: album.id,
                name: album.name,
                image: album.images.length ? album.images[0].url : null
            }));
            res.json(albums);
            return albums
        })
        .catch(err => console.log('The error while getting artist albums occurred: ', err));
});



router.get('/albums/:albumId/tracks', (req, res, next) => {
    spotifyApi.getAlbumTracks(req.params.albumId)
        .then((data) => {
            const tracks = data.body.items.map(track => ({
                id: track.id,
                name: track.name,
                previewUrl: track.preview_url
            }));
            const artistId = data.body.items[0].artists[0].id
            const albumId = req.params.albumId

            Promise.all([
                spotifyApi.getArtist(artistId),
                spotifyApi.getAlbum(albumId)
              ])
                .then((resultado) =>{
                    console.log(resultado)
                    const artist = resultado[0].body
                    const album = resultado[1].body;
                    console.log(artist)
                    console.log(album)

                res.json({
                    tracks: tracks,
                    artist: {
                        id: artist.id,
                        name: artist.name,
                        image: artist.images.length ? artist.images[0].url : null
                        },
                        album: {
                        id: album.id,
                        name: album.name,
                        image: album.images.length ? album.images[0].url : null
                        }
                      });
                    })
        .catch(err => console.log('The error while getting album tracks occurred: ', err));
});
})


router.get('/user/:id', (req, res) => {
    const {id} = req.params
    User.findById(id)
    .populate({path:"playlists", populate:{path:"tracks", model:"song"}})
    .then((data)=> {res.json({data})})
})


router.get('/playlist',getPlaylists)
router.get('/playlist/:id',getPlaylistById)
router.post('/playlist',createPlaylist)
router.put('/playlist/:id',updatePlaylist)
router.delete('/playlist/:id',deletePlaylist)




router.post('/song',createSong)
router.delete('/song/:id',deleteSong)



module.exports = router;