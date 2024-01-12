const findProductBySerial = require("./find.product_by_serial.controller");
const bulkAddManyProducts = require("./find.bulk-add-many-products.controller");
const findAsociatedProduct = require("./find.exist-associated-product.controller");

module.exports = { findProductBySerial, findAsociatedProduct, bulkAddManyProducts };
