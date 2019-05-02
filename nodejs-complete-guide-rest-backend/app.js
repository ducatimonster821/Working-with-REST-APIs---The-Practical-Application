const path = require('path');

const express = require('express');
const hbs = require('hbs');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const multer = require('multer');
const keys = require('./keys');

const feedRoutes = require('./routes/feed');

const app = express();

// app.set('view engine', 'hbs');

app.use(cors());

// app.get('/home', (req, res) => {
//     // res.send({"ret": "success"});
//     res.render('home.hbs');
// });

// app.post('/upload', (req, res) => {
//     const storage = multer.diskStorage({
//         destination: function (req, file, cb) {
//             cb(null, __dirname + '/images')
//         },
//         filename: function (req, file, cb) {
//             // cb(null, file.fieldname + '-' + Date.now())
//             cb(null, file.originalname)
//         }
//     });
//
//     // const upload = multer({storage: storage}).single('avatar');
//     const upload = multer({storage: storage}).array('myfile', 4);
//
//     upload(req, res, function (err) {
//         if (err) {
//             // A Multer error occurred when uploading.
//             console.log('err', err);
//             res.send({"ret": "err"});
//             return;
//         }
//         console.log('files', req.files);
//         console.log('body', req.body);
//         res.send({"ret": "success"});
//         // Everything went fine.
//     });
// });

// const fileStorage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'images');
//     },
//     filename: (req, file, cb) => {
//         cb(null, new Date().toISOString() + '-' + file.originalname);
//     }
// });
//
// const fileFilter = (req, file, cb) => {
//     if (
//         file.mimetype === 'image/png' ||
//         file.mimetype === 'image/jpg' ||
//         file.mimetype === 'image/jpeg'
//     ) {
//         cb(null, true);
//     } else {
//         cb(null, false);
//     }
// };

app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json
// app.use(
//     multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
// );
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/feed', feedRoutes);

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({
        message: message
    });
});

mongoose
    .connect(
        keys.mongoURI
    )
    .then(result => {
        console.log('MongoDB connected.');
        app.listen(8080);
    })
    .catch(err => console.log(err));
