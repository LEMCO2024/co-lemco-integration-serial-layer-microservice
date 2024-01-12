const pricesSchema = {
    FinalValidityDate: {
        in: ['query'],
        optional: true,
        isDate: {
            options: { format: "DD/MM/YY"},
            errorMessage: 'The format of the Final Validity Date must be DD/MM/YY',
        }
    }    
};

module.exports = pricesSchema;
