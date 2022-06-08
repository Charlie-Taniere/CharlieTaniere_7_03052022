// Création du modèle utilisateur 

module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: "0",
      },
    });
  
    // Association des modèles Likes et Posts à l'utilisateur 
    // Utilisation de la méthode onDelete "cascade" pour la suppression des posts et des likes de l'utilisateur lors de la 
    // supression de son compte 
    
    Users.associate = (models) => {
      Users.hasMany(models.Likes, {
        onDelete: "cascade",
      });
  
      Users.hasMany(models.Posts, {
        onDelete: "cascade",
      });
    };
  
    return Users;
  };