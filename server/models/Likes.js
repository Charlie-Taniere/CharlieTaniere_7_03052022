// Création du modèle des Likes

module.exports = (sequelize, DataTypes) => {
    const Likes = sequelize.define("Likes");
  
    return Likes;
  };