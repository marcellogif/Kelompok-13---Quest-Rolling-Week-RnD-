require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const connectDB = require('./server/config/db');


const app = express();
const port = 5000 || process.env.PORT;

//Connect ke Database
connectDB();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride('_method'));


//static
app.use(express.static('public'));

// Express session
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie:{
        maxAge: 1000*60*24*7,
    }
}))

// Flash Messages
app.use(flash({ sessionKeyName: 'flashMessage' }));

//template
app.use(expressLayout);
app.set('layout', './layout/main');
app.set('view engine', 'ejs');

//Home
// app.get('/', (req, res) => {
//     // res.send('Hello World');
//     const locals = {
//         title: 'Node.js',
//         description: 'Free NodeJs User Management System'
//     }
//     res.render('index', locals); 
// })

//Routes
app.use('/', require('./server/routes/customer'));

//Handle 404
app.get('/*splat', (req, res) => {
    res.status(404).render('404');
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});

