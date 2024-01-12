/* INSTANCES */
// Get instance express validator
const requestValidator = require('../middleware/validate.schema.middleware');
// Get methods to format response callback
const responseUtil = require('../middleware/create.response.middleware');
// Get lib functions to execute baan queries
const pricesRepository = require('../services/repository/prices.repository');

/* VALIDATION SQUEMA */
// Get Json config validator squema
const bulkAddManyProductsSchemaValidations = require('../schemas/find.bulk-add-many-products.schema');


const bulkAddManyProducts = async (req, res) => {
  const requestErrors = await requestValidator.validateRequest(bulkAddManyProductsSchemaValidations, req);
  if (requestErrors.length > 0) {
    return responseUtil.buildErrorResponse(res, requestErrors);
  }
  const prices = await pricesRepository.bulkAddManyProducts(req.body.Products);
  return responseUtil.buildClientResponse(res, prices, 200);
}

module.exports = bulkAddManyProducts;