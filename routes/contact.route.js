const express = require('express');
const Contact = require('../controllers/contact.controller')
const router = express.Router();


router.get('/contacto', Contact.getContact);
router.post("/contacto", Contact.createContact);
router.patch('/contacto/:id', Contact.getIdContact);
router.patch('/contacto/:id', Contact.updateContact);


module.exports = router;