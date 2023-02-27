const STATUS_CODE = {
    ERROR: 0,
    SUCCESS: 1,
};

const HTTP_STATUS_CODES = {
    SUCCESS: 200,
    BAD_REQUEST : 400,
    NOT_FOUND : 404,
    INTERNAL_SERVER : 500,
}

const MESSAGES = {
    EMPTY: {},
    KEY_CANT_EMPTY: "{{key}} cannot be empty",
    INTERNAL_SERVER_ERROR: 'Something went wrong.',
    UNAUTHORIZED_ACCESS_EXCEPTION: 'Unauthorised Access',
    NO_TOKEN_SUPPLIED: 'No Token Supplied',
}

module.exports = Object.freeze({
    STATUS_CODE,
    MESSAGES,
    HTTP_STATUS_CODES
})