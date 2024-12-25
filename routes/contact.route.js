const express = require('express');
const Contact = require('../controllers/contact.controller')
const router = express.Router();


router.get('/contacto', Contact.getContact)
router.post("/contacto", Contact.createContact)
module.exports = router;