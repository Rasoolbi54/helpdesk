const express = require('express');
const { createTicket, getTickets, updateTicket, getTicketById } = require('../controllers/ticketController');
const { verifyToken } = require('../middleware/auth');
const router = express.Router();



router.post('/tickets' ,verifyToken, createTicket);

router.get('/tickets' , verifyToken , getTickets );

router.put('/tickets/:id' , verifyToken , updateTicket);

router.get('/tickets/:id' , verifyToken ,getTicketById);




module.exports = router