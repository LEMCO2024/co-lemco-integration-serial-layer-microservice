const { checkSchema } = require('express-validator');

const validateRequest = (schema, request) => {
    return checkSchema(schema)
        .run(request)
        .then(validatedSchema => validatedSchema.flatMap(field => field.errors));
}

module.exports = { validateRequest };