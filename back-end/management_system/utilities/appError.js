class AppError extends Error {
    constructor() {
        super();
    }
    create(statusCode, message, statusMessage, appName) {
        this.statusCode = statusCode;
        this.message = message;
        this.statusMessage = statusMessage;
        this.name = appName;
        return this;
    }
}

class AppSuccess {
    create(statusCode, message, statusMessage, appName) {
        this.statusCode = statusCode;
        this.message = message;
        this.errorMessage = statusMessage;
        this.name = appName;
        return this;
    }
}

const appError = new AppError();
const appSuccess = new AppSuccess();

export { appError, appSuccess };