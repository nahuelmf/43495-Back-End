const express = require('express');
const app = express();
const MongoStore = require('connect-mongo');
const session = require('express-session');
const httpServer = require('http').createServer(app);
const mongoose = require('mongoose');
const compression = require('compression');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Users = require('./models/modelUser.js');
const bcrypt = require('bcrypt');
const routes = require('./routes.js');

if (process.env.MODE != 'production') {
  require('dotenv').config();
}

const PORT = process.env.PORT;
const MODE = process.env.MODE;
const MONGO_URL = process.env.MONGO_URL;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use('/public', express.static(__dirname + '/public'));

// handlebars settings
const { engine } = require('express-handlebars');

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

// MONGOOSE CONNECTION
async function connectMG() {
  try {
    await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
    console.log('Conectado a mongoDB!✅');
  } catch (e) {
    console.log(e);
    throw 'can not connect to the db❌';
  }
}
connectMG();

// const products = new ProductosDaoMongoDB();
// const msgs = new MensajesDaoMongoDB();

//passport
function isValidPassword(user, password) {
  return bcrypt.compareSync(password, user.password);
}

function createHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

passport.use(
  'login',
  new LocalStrategy((username, password, done) => {
    Users.findOne({ username }, (err, user) => {
      if (err) return done(err);

      if (!user) {
        console.log('❌User Not Found with username ' + username);
        return done(null, false);
      }
      if (!isValidPassword(user, password)) {
        console.log('Invalid Password❌');
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
          console.log('❌error in signup' + err);
          return done(err);
        }
        if (user) {
          console.log('❌user already exists');
          return done(null, false);
        }
        const newUser = {
          username: username,
          password: createHash(password),
          name: req.body.name,
          address: req.body.address,
          age: req.body.age,
          phone: req.body.phone,
          url: req.body.url,
        };
        Users.create(newUser, (err, userWithId) => {
          if (err) {
            console.log('❌error in saving user:' + err);
            return done(err);
          }
          console.log('user registration succesful:', newUser);
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

//-----------ROUTES
//INDEX
app.get('/', routes.getRoute);

//LOGIN
app.get('/login', routes.getLogin);
app.get('/failLogin', routes.getFailLogin);
app.post('/login', passport.authenticate('login', { failureRedirect: '/failLogin' }), routes.postLogin);

//SIGNUP
app.get('/signup', routes.getSignUp);
app.get('/failSignUp', routes.getFailSignUp);
app.post('/signup', passport.authenticate('signup', { failureRedirect: '/failSignUp' }), routes.postSignUp);

//LOGOUT
app.get('/logout', routes.getLogout);

//GET INFO
app.get('/info', routes.getInfo);

app.get('/datos', (req, res) => {
  console.log(`port: ${PORT} -> Fyh: ${Date.now()}`);
  res.send(`Servidor express <span style="color:blueviolet;">(Nginx)</span> en ${PORT} - 
    <b>PID ${process.pid}</b> - ${new Date().toLocaleString()}`);
});

//FAILROUTE
app.get('*', routes.failRoute);

httpServer.listen(PORT, () => {
  console.log('Servidor http escuchando en el puerto http://localhost:' + PORT);
});
