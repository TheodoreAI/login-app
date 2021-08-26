const express = require('express');
const router = express.Router();

router.get('/', (req, res) =>{
    // To easily expose the routers I need to expose the user context to the view to 
    // know if a suer is logged in or not so I know which buttons to display.
    const {userContext } = req;
    res.render('index', {userContext});
});




module.exports = router;