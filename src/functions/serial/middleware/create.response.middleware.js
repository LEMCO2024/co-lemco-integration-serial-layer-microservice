function buildClientResponse(res, data, httpStatus) {
    return res.status(httpStatus).json({
        data: data
    });
}

function buildErrorResponse(res, requestErrors) {
    return res.status(400).json({
        errors: requestErrors
    });
}

module.exports = { buildClientResponse, buildErrorResponse };