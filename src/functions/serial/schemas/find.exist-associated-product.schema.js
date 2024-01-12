const findAsociatedProductSchemaValidations = {
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
    SkuCode: {
        in: ["query"],
        isString: {
          errorMessage: "SkuCode must be a string",
        },
        notEmpty: {
          errorMessage: "SkuCode cannot be empty",
        },
        isLength: {
          options: { max: 30 },
          errorMessage: "SkuCode must be have less than 15 characters long",
        },
      },
  };
  
  module.exports = findAsociatedProductSchemaValidations;
  