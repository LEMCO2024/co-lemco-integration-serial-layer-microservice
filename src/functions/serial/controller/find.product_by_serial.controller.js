/* INSTANCES */
// Get instance express validator
const requestValidator = require("../middleware/validate.schema.middleware");
// Get methods to format response callback
const responseUtil = require("../middleware/create.response.middleware");
// Get lib functions to execute baan queries
const pricesRepository = require("../services/repository/prices.repository");

/* VALIDATION SQUEMA */
// Get Json config validator squema
const productBySerialSchemaValidations = require("../schemas/find.product_by_serial.schema");

const findProductBySerial = async (req, res) => {
  const requestErrors = await requestValidator.validateRequest(
    productBySerialSchemaValidations,
    req
  );
  if (requestErrors.length > 0) {
    return responseUtil.buildErrorResponse(res, requestErrors);
  }
  let pageNumber = 1;
  let pageSize = 30;
  if (req.query.page && !isNaN(req.query.page)) {
    pageNumber = parseInt(req.query.page);
  }
  if (req.query.limit && !isNaN(req.query.limit)) {
    pageSize = parseInt(req.query.limit);
  }
  const prices = await pricesRepository.findProductBySerial(
    req.query.SerialCode,
    pageNumber,
    pageSize
  );
  return responseUtil.buildClientResponse(res, prices, 200);
};

module.exports = findProductBySerial;
