/**
 * 自定义API错误类
 */
export class TushareAPIError extends Error {
    code: number;
    
    constructor(message: string, code: number = -1) {
        super(message);
        this.name = 'TushareAPIError';
        this.code = code;
    }
}

/**
 * HTTP请求错误类
 */
export class HTTPError extends Error {
    status: number;
    
    constructor(message: string, status: number) {
        super(message);
        this.name = 'HTTPError';
        this.status = status;
    }
}

/**
 * 参数验证错误类
 */
export class ValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ValidationError';
    }
}
