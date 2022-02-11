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

// get data
router.get('/', async (req, res) => {
    const costumers = await Costumer.findAll();

    return res.json(costumers)
})

// list per id
router.get('/:id', async (req, res)=>{
    const id = req.params.id;
    const costumer = await Costumer.findByPk(id)

    return res.json(costumer || {})
});

// update data
router.put('/:id', async (req, res) => {
    const id = req.params.id;

    let costumer = await Costumer.findByPk(id);
    if (!costumer){
        return res.json({message: "Costumer update not found"});
    }

    const schema = {
        name : 'string',
        alamat: 'string',
        no_hp: 'number'
    }

    const validate = v.validate(req.body, schema);
    if (validate.length){
        return res 
            .status(400)
            .json(validate);
    };

    costumer = await costumer.update(req.body);
    res.json(costumer)
});

// delete
router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    const costumer = await Costumer.findByPk(id);
    if(!costumer){
        return res.json({message: 'costumer not found'})
    }

    await costumer.destroy();


    res.json({
        message: "costumer deleted"
    })
})

module.exports = router