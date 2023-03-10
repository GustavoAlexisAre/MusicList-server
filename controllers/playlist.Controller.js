const Playlist = require("../models/Playlist.model")
const Songs = require("../models/song.model")
const User = require("../models/User.model")


exports.getPlaylists = async (req, res) => {
    const list = await Playlist.find()
	.populate("tracks")
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
    const list = await Playlist.create({name})
	await User.findByIdAndUpdate(userId,{$push:{playlists:list._id}},	{ new: true })
		res.json(list)
}

exports.updatePlaylist = async (req, res) => {
	const { id } = req.params
	const { newName } = req.body
	console.log(newName)
	
	const list = await Playlist.findByIdAndUpdate(
		id,
		{
			name:newName
		},
		{ new: true }
	)
	res.json(list)
}

//5. borrar una coleccion
exports.deletePlaylist = async (req, res) => {
	const {playlistid, userId} = req.params
	await User.findByIdAndUpdate(userId, {$pull:{playlists:playlistid}}, {new:true})
	await Playlist.findByIdAndDelete(playlistid)
	res.json({ message: "deleted" })
}

