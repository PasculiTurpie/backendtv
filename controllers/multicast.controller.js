const Multicast = require('../models/multicast.model');

module.exports.getMulticasts = async (req, res) => {
    try {
        const multicasts = await Multicast.find().sort({ipMulticast:1});
        res.json(multicasts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los multicasts' });
    }
};

module.exports.createMulticast = async (req, res) => {
    const { name, ipMulticast } = req.body;
    try{
        const multicast = new Multicast({ name, ipMulticast });
        await multicast.save();
        res.json({ msg: 'Multicast creado exitosamente', multicast });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el multicast' });
    }

}
