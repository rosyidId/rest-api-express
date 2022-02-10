let express = require('express');
let router = express.Router();
const Validator = require('fastest-validator');

const {Costumer} = require('../models');

const v = new Validator();

// post data costumer
router.post('/', async (req, res) => {
    const schema = {
        name : 'string',
        alamat: 'string',
        no_hp: 'number'
    }

    const validate = v.validate(req.body, schema);

    if (validate.length){
        return res
            .status(400)
            .json(validate)
    }

    // res.send('berhasil')
    const costumer = await Costumer.create(req.body);

    res.json(costumer);
})



module.exports = router