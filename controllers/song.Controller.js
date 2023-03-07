const Songs = require("../models/song.model")
const Playlist = require("../models/Playlist.model")


exports.createSong = async (req, res) => {
	const { name, artist, disc, image, url, id} = req.body
    console.log(req.body)
	const song = await Songs.create({name, artist, disc, image, url})
    await Playlist.findByIdAndUpdate(id,{$push:{tracks:song._id}})
	res.json({ song })
}


exports.deleteSong = async (req, res) => {
	const { id } = req.params
	await Songs.findByIdAndDelete(id)
	res.json({
		message: "deleted"
	})
}
