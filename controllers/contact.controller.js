const Contact = require('../models/contact.model');

module.exports.getContact = async(req, res, next) => {
  try {
    const contact = await Contact.find();
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el contacto' });
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
   const {id} = req.params.id;
   const updatedContact = req.body;
   
   const contact = await Contact.findByIdAndUpdate(_id, updatedContact, { new: true });
   
   if (!contact) return res.status(404).json({ message: 'Contacto no encontrado' });
   
   res.json(contact);

    
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el contacto', error: error.message });    
  }
}