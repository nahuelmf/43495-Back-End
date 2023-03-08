const express = require('express');
const app = express();

if (process.env.MODE != 'production') {
  require('dotenv').config();
}

const PORT = process.env.PORT;
const MODE = process.env.MODE;
const MONGO_URL = process.env.MONGO_URL;

const httpServer = require('http').createServer(app);

//COMPRESION GZIP
const compression = require('compression');
app.use(compression());

// const io = require('socket.io')(httpServer);
// const MensajesDaoMongoDB = require('./daos/mensajesDaoMongoDB.js');
// const ProductosDaoMongoDB = require('./daos/productosDaoMongoDB.js');
const mongoose = require('mongoose');

const routerDatos = require('./ROUTES-LAYER/datos.js');

const session = require('express-session');
const MongoStore = require('connect-mongo');

//passport
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Users = require('./models/users.js');
const bcrypt = require('bcrypt');

const { engine } = require('express-handlebars');

app.use(express.json());
app.use(session({ secret: 'secreto' })); //!
app.use(express.urlencoded({ extended: true }));
app.enable('trust proxy');

app.use('/public', express.static(__dirname + '/public'));

app.use('/', routerDatos);

// handlebars settings
app.set('view engine', 'hbs');
app.set('views', './views');
app.engine(
  'hbs',
  engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
  })
);

//fork
const { fork } = require('child_process');

// MONGOOSE CONNECTION
async function connectMG() {
  try {
    await mongoose.connect(MONGO_URL, { useNewUrlParser: true });
    console.log('Conectado a mongo!');
  } catch (e) {
    console.log(e);
    throw 'can not connect to the db';
  }
}

connectMG();

// const products = new ProductosDaoMongoDB();
// const msgs = new MensajesDaoMongoDB();

// //config passport
function isValidPassword(user, password) {
  return bcrypt.compareSync(password, user.password);
}

function createHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

passport.use(
  'login',
  new LocalStrategy((username, password, done) => {
    Users.findOne({ username }, (err, user) => {
      if (err) return done(err);

      if (!user) {
        console.log('User Not Found with username ' + username);
        return done(null, false);
      }
      if (!isValidPassword(user, password)) {
        console.log('Invalid Password');
        return done(null, false);
      }
      return done(null, user);
    });
  })
);

passport.use(
  'signup',
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      Users.findOne({ username: username }, function (err, user) {
        if (err) {
          console.log('error in signup' + err);
          return done(err);
        }
        if (user) {
          console.log('user already exists');
          return done(null, false);
        }
        const newUser = {
          username: username,
          password: createHash(password),
        };
        Users.create(newUser, (err, userWithId) => {
          if (err) {
            console.log('error in saving user:' + err);
            return done(err);
          }
          console.log('user', user);
          console.log('user registration succesful');
          return done(null, userWithId);
        });
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});
passport.deserializeUser((id, done) => {
  Users.findById(id, done);
});

// //SESSION WITH MONGO
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: MONGO_URL,
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      ttl: 60,
    }),
    secret: 'secretKey',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 },
  })
);

app.use(passport.initialize()); //inicializamos passport dentro de express
app.use(passport.session()); //meto la sesion de passport adentro de la app (serializ y deserializ)

app.enable('trust proxy');

httpServer.listen(PORT, () => {
  console.log('Servidor http escuchando en el puerto http://localhost:' + PORT);
});
