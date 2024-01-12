const productBySerialSchemaValidations = {
  SerialCode: {
    in: ["query"],
    isString: {
      errorMessage: "SerialCode must be a string",
    },
    notEmpty: {
      errorMessage: "SerialCode cannot be empty",
    },
    isLength: {
      options: { max: 30 },
      errorMessage: "SerialCode must be have less than 15 characters long",
    },
  },
};

module.exports = productBySerialSchemaValidations;
