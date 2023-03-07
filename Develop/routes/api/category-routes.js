const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

//200-AWESOME
//400-USER ERROR
//500-SERVER ERROR

router.get("/", async (req, res) => {
  try {
    const categoryData = await Category.findAll({ include: Product });
    res.json(categoryData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id", async ({ params }, res) => {
  try {
    const categoryData = await Category.findByPk(params.id);
    //const categoryData = await Category.findOne({where: {id : req.body.id}})
    if (!categoryData) res.status(400).json("No category found with that id");
    res.json(categoryData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// be sure to include its associated Products- remember to check above!

router.post("/", async (req, res) => {
  // Use Sequelize's `create()` method to add a row to the table
  // Similar to `INSERT INTO` in plain SQL
  //OLD WAY
  console.log("PASSING>>>", { category_name: req.body.category_name });
  //New Way
  console.log("REQ BODY>>>", req.body);
  try {
    const newCategory = await Category.create(req.body);
    res.json(newCategory);
  } catch (error) {
    res.json(err);
  }
  // create a new category
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
  //update takes 2 params
  //1st param-Info we use to update product
  //2nd param-Which product to update
  Category.update(req.body, { where: { id: req.params.id } })
    .then((updatedCategory) => {
      // Sends the updated book as a json response
      res.json(updatedCategory);
    })
    .catch((err) => res.json(err));
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedCategory) => {
      res.json(deletedCategory);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
