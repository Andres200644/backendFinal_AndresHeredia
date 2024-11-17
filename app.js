const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Configuración de la base de datos
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Configuración de la vista
app.engine('handlebars', require('express-handlebars')());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'src', 'views'));

// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Rutas
app.use('/auth', require('./src/routes/authRoutes'));
app.use('/cart', require('./src/routes/cartRoutes'));
app.use('/products', require('./src/routes/productRoutes'));

// Escuchando en el puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
