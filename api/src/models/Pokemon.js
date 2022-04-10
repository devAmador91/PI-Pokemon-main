const { DataTypes } = require("sequelize");

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  sequelize.define("pokemon", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is:/^([A-Za-z])+$/
      }
    },
    hp: {
      type: DataTypes.INTEGER,
      validate:{
        isInt: true
      }
    },
    attack: {
      type: DataTypes.INTEGER,
      validate:{
        isInt: true
      }
    },
    defense: {
      type: DataTypes.INTEGER,
      validate:{
        isInt: true
      }
    },
    speed: {
      type: DataTypes.INTEGER,
      validate:{
        isInt: true
      }
    },
    weight: {
      type: DataTypes.INTEGER,
      validate:{
        isInt: true
      }
    },
    height: {
      type: DataTypes.INTEGER,
      validate:{
        isInt: true
      }
    },
    img: {
      type: DataTypes.STRING,
      validate:{
        isUrl: true
      }
    },
    type:{
      type: DataTypes.ARRAY(DataTypes.STRING)
    }
  });
};
