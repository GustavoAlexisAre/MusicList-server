const Playlist = require("../models/Playlist.model")
const Songs = require("../models/song.model")
const User = require("../models/User.model")


exports.getPlaylists = async (req, res) => {
    const list = await Playlist.find() 
    res.json(list)
}

exports.getPlaylistById = async (req,res) => {
	const{id} = req.params
	const list = await Playlist.findById(id)
	const tracks = await Songs.find({list:id})
	res.json({list, tracks})
}

exports.createPlaylist = async (req,res) => {
    const {name, userId} = req.body
	console.log(userId)
    const list = await Playlist.create({name})
	await User.findByIdAndUpdate(userId,{$push:{playlists:list._id}})
		res.json(list)
}

exports.updatePlaylist = async (req, res) => {
	const { id } = req.params
	const { name } = req.body
	const list = await Playlist.findByIdAndUpdate(
		id,
		{
			name
		},
		{ new: true }
	)
	res.json(list)
}

//5. borrar una coleccion
exports.deletePlaylist = async (req, res) => {
	const { id } = req.params
	await Playlist.findByIdAndDelete(id)
	res.json({ message: "deleted" })
}

