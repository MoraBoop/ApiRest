const { Router } = require('express');
const router = Router(); 



router.get('/', (req, res)=>{
    var data = {
        name : 'jason',
        web: 'moraboop.com'
    };
    res.json(data);
});

module.exports = router;