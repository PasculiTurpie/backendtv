const Contact = require('../models/contact.model');

module.exports.getContact = async(req, res, next) => {
  try {
    const contact = await Contact.find();
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el contacto' });
  }

}

module.exports.createContact = async (req, res, next) => {
  try {
    const { nombreContact, emailContact, telefonoContact } = req.body;
    const newContact = new Contact({
      nombreContact,
      emailContact,
      telefonoContact,
    });
    await newContact.save();
    res.json(newContact);
  } catch (error) {
    res.status(500).json({ message: [{ error }] });
  }
}