const errorFactory = (msg, statusCode) => {
    const error = new Error(msg);
    error.code = statusCode;
    return error;
}

module.exports = {
    errorFactory
}