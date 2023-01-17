const express = require("express");
const session = require("express-session");
const expbs = require("express-handlebars");
require("dotenv").config({ path: "./config/.env" });
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const path = require("path");
const routes = require("./routers/index");
const mongoose = require('mongoose');
require('./middlewares/auth');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const PORT = process.env.port || 8080;
mongoose.set('strictQuery', true);

app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        httpOnly: false,
        secure: false,
        maxAge: 100000
    }
}));

app.use(passport.initialize());
app.use(passport.session());

/*      PERSISTENCIA POR MONGO ATLAS     */
const MongoStore = require("connect-mongo");
const adavancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
/* ------------------------------------- */

//Session config
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.MONGOATLAS,
      mongoOptions: adavancedOptions,
    }),
    secret: "secreto",
    resave: false,
    saveUninitialized: false,
  })
);

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./views/layouts"));
app.use("/", routes);

//Motor de plantillas
app.engine(
  "hbs",
  expbs.engine({
    defaultLayout: "main",
    partialsDir: path.join(__dirname, "views/partials"),
    extname: ".hbs",
  })
);
app.set("views", "./views");
app.set("views engine", "hbs");

/* CHAT */
const ApiChat = require("./api/apiChat");
const apiChat = new ApiChat();
let messages = [];

io.on("connection", async (socket) => {
  let messagesToEmit = await apiChat.readChatFromFile();

  messages.splice(0, messages.length);
  for (const m of messagesToEmit) {
    messages.push(m);
  }

  socket.emit("messages", messagesToEmit);

  socket.on("new-message", (data) => {
    data.id = messages.length+1
    messages.push(data);

    io.sockets.emit("messages", [data]);

    apiChat.writeChatToFile(messages);
  });
});

//Manejador de errores
app.use(function (err, req, res, next) {
  console.log(err.stack);
  res.status(500).send("Ocurrio un error: " + err);
});

//Server


const server = httpServer.listen(PORT, async () => {
  await mongoose.connect('mongodb+srv://nahuelmf:nawueh0731@cluster0.irezwt9.mongodb.net/test');
  console.log(`Server running on port ${PORT}`);
});
server.on('error', err => console.log(`Error: ${err}`));