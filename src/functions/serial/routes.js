const express = require("express");
const api = express.Router();

// controllers
const { findProductBySerial, findAsociatedProduct, bulkAddManyProducts} = require("./controller/index");

api.get("/test", (req, res) => {
  res.status(200).json({
    msg: "Hello world! :D",
    body: req.params,
  });
});

api.post("/product-by-serial", findProductBySerial);

api.post("/bulk-add-many-products", bulkAddManyProducts);

api.post("/exist-associated-product", findAsociatedProduct);

module.exports = api;
