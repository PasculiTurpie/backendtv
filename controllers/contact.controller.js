const Contact = require('../models/contact.model');

module.exports.getContact = async(req, res) => {
  try {
    const contact = await Contact.find();
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el contacto' });
  }

}

module.exports.getIdContact = async(req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);
    if (!contact) return res.status(404).json({ msg: "Contacto no encontrado" });
    res.json(contact);
    } catch (error) {
    res.status(500).json({ message: 'Error al obtener el contacto', error });
}
}
module.exports.createContact = async (req, res) => {
  try {
    const contact = req.body;
    const newContact = new Contact(contact);
    await newContact.save();
    res.json(newContact);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error al crear el contacto', 
      error: error.message 
    });
  }
};

module.exports.updateContact = async (req, res) => {
  try {
    const { id } = req.params; // El ID del contacto
    const updatedData = req.body; // Los datos actualizados del contacto

    // Busca y actualiza el contacto en la base de datos
    const updatedContact = await Contact.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedContact) {
        return res.status(404).json({ message: 'Contacto no encontrado' });
    }

    res.status(200).json({
        message: 'Contacto actualizado exitosamente',
        contact: updatedContact,
    });
} catch (error) {
    console.error('Error al actualizar el contacto:', error);
    res.status(500).json({ message: 'Error al actualizar el contacto', error });
}
};