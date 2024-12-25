const Origen = require ('../models/origen.model')

module.exports.getOrigene = async (req, res) => {
    try {
        const origenes = await Origen.find().sort({nombreOrigen:1})
        res.json(origenes)
    } catch (error) {
        console.error(error)
        res.status(500).json({msg: 'Hubo un error al obtener los origenes'})
    }
}

module.exports.createOrigen = async (req, res) =>{
    const { nombreOrigen } = req.body
    try {
        const newOrigen = new Origen({ nombreOrigen })
        await newOrigen.save()
        res.json({msg: 'Origen creado correctamente'})
    } catch (error) {
        console.error(error)
        res.status(500).json({msg: 'Hubo un error al crear el origen'})
    }
}