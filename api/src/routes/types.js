const router = require('express').Router();


router.get('/types',(req,res)=>{
    res.json({prueba:"tipos"})
})

module.exports = router;