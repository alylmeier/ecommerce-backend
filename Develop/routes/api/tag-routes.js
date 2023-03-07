const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  //const prods = await Category.findAll({ include: Products });
  Tag.findAll().then((tagsData) => {
    res.json(tagsData);
  });
  // find all tags
  // be sure to include its associated Product data
});

router.get("/:id", (req, res) => {
  Tag.findByPk(req.params.id).then((tagsData) => {
    //
    res.json(tagsData);
  });
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post("/", (req, res) => {
  Tag.create(req.body)
    //do i have to tell it to do id, or is that automatic even though the column is defined?

    .then((newTag) => {
      // Send the newly created row as a JSON object
      res.json(newTag);
    })
    .catch((err) => {
      res.json(err);
    });

  // create a new tag
});

router.put("/:id", (req, res) => {
  Tag.update(req.body, {
    where: { id: req.params.id },
    // All the fields you can update and the data attached to the request body.
  })
    .then((updatedTag) => {
      // Sends the updated book as a json response
      res.json(updatedTag);
    })
    .catch((err) => res.json(err));

  // update a tag's name by its `id` value
});

router.delete("/:id", (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedTag) => {
      res.json(deletedTag);
    })
    .catch((err) => res.json(err));

  // delete on tag by its `id` value
});

module.exports = router;
