const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const userData = await Tag.findAll({
      include: [{ model: Product }], 
        // { model: ProductTag }],
    });
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const userData = await Tag.findByPk(req.params.id, {
        include: [{ model: Product }], 
        // { model: ProductTag }],
    });
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const userData = await Tag.create(req.body);
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});

  // update a tag's name by its `id` value
  router.put('/:id', async (req, res) => {
    try {
      const userData = await Tag.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  try {
    const userData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
