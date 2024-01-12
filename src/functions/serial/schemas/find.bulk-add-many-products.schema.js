const bulkAddManyProductsSchemaValidations = {
    Products: {
      in: ["body"],
      isArray: {
        errorMessage: "Products must be an array",
      },
      notEmpty: {
        errorMessage: "Products cannot be empty",
      },
      isLength: {
        options: { max: 30 },
        errorMessage: "Products must be have less than 30 products long",
      },
    }
  };
  
  module.exports = bulkAddManyProductsSchemaValidations;
  