const spotifyApi = require("../routes/user.routes")


exports.getArtist = async (req, res) => {
    const {id} = req.params
    const soloArtistAlbum = spotifyApi.getArtistAlbums(id)
    res.json({soloArtistAlbum})

}
   