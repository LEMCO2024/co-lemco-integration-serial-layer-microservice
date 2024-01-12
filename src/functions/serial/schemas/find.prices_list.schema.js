const pricesListSchema = {
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
    }    
};

module.exports = pricesListSchema;
