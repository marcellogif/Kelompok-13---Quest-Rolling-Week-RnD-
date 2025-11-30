const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

// //Home
// app.get('/', (req, res) => {
//     // res.send('Hello World');
//     const locals = {
//         title: 'Node.js',
//         description: 'Free NodeJs User Management System'
//     }
//     res.render('index', locals); 
// })

router.get('/', customerController.homepage);
router.get('/add', customerController.addCustomer);
router.post('/add', customerController.postCustomer);
router.get('/view/:id', customerController.viewCustomer);

router.get('/edit/:id', customerController.editCustomer);
router.put('/edit/:id', customerController.editPostCustomer);

router.delete('/edit/:id', customerController.deleteCustomer);

module.exports = router;