const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const mainRoutes = require('./routes/index'); 

const app = express();

app.use(cors());
app.use(helmet({ crossOriginResourcePolicy: false })); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

app.use('/api', mainRoutes); 

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        meta: { code: 500, status: 'error', message: 'Something broke!' },
        errors: err.message
    });
});

module.exports = app;