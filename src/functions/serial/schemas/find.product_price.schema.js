const productPriceSchema = {
    ClientCode: {
        in: ['query'],
        isString: {
            errorMessage: 'ClientCode must be a string',
        },
        notEmpty: {
            errorMessage: 'ClientCode cannot be empty',
        },
        isLength: {
            options: { max: 15 },
            errorMessage: 'ClientCode must be have less than 15 characters long',
        }
    },
    ProductCode: {
        in: ['query'],
        isString: {
            errorMessage: 'ProductCode must be a string',
        },
        notEmpty: {
            errorMessage: 'ProductCode cannot be empty',
        },
        isLength: {
            options: { max: 47 },
            errorMessage: 'ProduceCode must be have less than 47 characters long',
        }
    }    
};

module.exports = productPriceSchema;
