var express = require('express');
const { route } = require('express/lib/application');
var router = express.Router();
const Validator = require('fastest-validator');

const {Product} = require('../models');

const v = new Validator();

// get data 
router.get('/', async (req, res)=>{
    const products = await Product.findAll();

    return res.json(products)
});

// list product by id
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const product = await Product.findByPk(id);
    return res.json(product || {});
})

// post data
router.post('/', async (req, res) => {
    // membuat schema validator
    const schema = {
        name: 'string',
        brand: 'string',
        description: 'string|optional'
    }

    const validate = v.validate(req.body, schema);

    if (validate .length){
        return res
            .status(400)
            .json(validate);
    }

    // res.send('berhasil')
    const product = await Product.create(req.body);

    res.json(product);
});

// update data
router.put('/:id', async (req, res) => {
    const id = req.params.id;

    // cek id di database ada / tidaknya
    let product = await Product.findByPk(id);

    if (!product) {
        return res.json({message: "Product not found"});
    }
    // res.send('berhasil')
    // jika id data sudah ada 
    // membuat validasi
    const schema = {
        name : 'string|optional',
        brand: 'string|optional',
        description: 'string|optional'
    }

    const validate = v.validate(req.body, schema);
    if (validate.length){
        return res
            .status(400)
            .json(validate);
    };
    // res.send('berhasil')
    // tinggal update data
    product = await product.update(req.body);
    res.json(product)
});

// delete
router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    const product = await Product.findByPk(id);
    if(!product){
        return res.json({message: 'product not found'})
    }

    await product.destroy();

    res.json({
        message: 'product is deleted!'
    })
})


module.exports = router;