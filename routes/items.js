const express = require('express');
const router = express.Router();
const Item = require('../models/item');

/**
    * @swagger
    * /items:
    *   post:
    *     summary: Create a new item
    *     responses:
    *       201:
    *         description: Newly created item
    *       500:
    *         description: error message
    */
router.post('/', async (req, res) => {
  try {
    console.log(req.body);
    const newItem = await Item.create(req.body);
    console.log(newItem);
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
    * @swagger
    * /items:
    *   get:
    *     summary: Retrieve a list of items
    *     responses:
    *       200:
    *         description: A list of items
    *       500:
    *         description: Item not found
    */
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
    * @swagger
    * /items:
    *   patch:
    *     summary: Update an item
    *     responses:
    *       200:
    *         description: updated item
    *       400:
    *         description: error message
    */
router.patch('/:id', async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
    * @swagger
    * /items:
    *   delete:
    *     summary: Delete an item
    *     responses:
    *       200:
    *         description: confirmation of delete
    *       400:
    *         description: error message
    */router.delete('/:id', async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
