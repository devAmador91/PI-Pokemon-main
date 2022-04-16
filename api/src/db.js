require('dotenv').config(); 
const {DB_USER, DB_PASSWORD, DB_HOST, DB_NAME} = process.env;
const { Sequelize } = require('sequelize');
const modelPokemon = require("./models/Pokemon.js"); 
const modelType = require("./models/Type.js")

const sequelize = process.env.NODE_ENV === "production"
? new Sequelize({
    database: DB_NAME,
    dialect: "postgres",
    host: DB_HOST,
    port: 5432,
    username: DB_USER,
    password: DB_PASSWORD,
    pool: {
      max: 3,
      min: 1,
      idle: 10000,
    },
    dialectOptions: {
      ssl: {
        require: true,
    
        rejectUnauthorized: false,
      },
      keepAlive: true,
    },
    ssl: true,
  })
: new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/pokemon`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});


modelPokemon(sequelize);
modelType(sequelize);

const {Pokemon, Type} = sequelize.models;

Pokemon.belongsToMany(Type, { through: 'Pokemon-Types' });
Type.belongsToMany(Pokemon, { through: 'Pokemon-Types' });

module.exports = {
  ...sequelize.models, 
  conn: sequelize,     
};
