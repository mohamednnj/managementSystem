class AppError extends Error {
    constructor() {
        super();
    }

    create(statusMessage,message, statusCode) {
        this.statusMessage = statusMessage;
        this.errorMessage = message;
        this.statusCode = statusCode;
        this.name = 'AppError';
        return this;
    }
}

export default new AppError()