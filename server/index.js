// Importation des ressources

const express = require("express");
const app = express();
const cors = require("cors");
const path = require('path');

// Importation des routes 

const postRouter = require("./routes/Posts");
const commentsRouter = require("./routes/Comments");
const usersRouter = require("./routes/Users");
const likesRouter = require("./routes/Likes");

// Importation des modèles

const db = require("./models");


app.use(express.json());
app.use(cors());

// Middleware général 
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use("/posts", postRouter);
app.use("/comments", commentsRouter);
app.use("/auth", usersRouter);
app.use("/likes", likesRouter);
app.use('/images', express.static(path.join(__dirname, 'images')));

// Méthode pour synchroniser Sequelize avec la base de donnée

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});

