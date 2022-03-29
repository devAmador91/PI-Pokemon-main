const router = require('express').Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const pokemonsRoute = require('./pokemons.js')
const typesRoutes = require('./types.js')

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use(pokemonsRoute);
router.use(typesRoutes)




module.exports = router;
