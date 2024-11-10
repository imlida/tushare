import { TushareAPIError, HTTPError } from '../utils/error';
import { APIResponse } from '../types';

/**
 * API基础类，处理通用的请求逻辑
 */
export class BaseAPI {
    protected token: string;
    protected baseURL: string;

    constructor(token: string, baseURL: string) {
        this.token = token;
        this.baseURL = baseURL;
    }

    /**
     * 发送API请求的通用方法
     * @protected
     */
    protected async request<T>(
        apiName: string,
        params: Record<string, any> = {},
        fields: string = ''
    ): Promise<APIResponse<T>> {
        try {
            const response = await fetch(this.baseURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    api_name: apiName,
                    token: this.token,
                    params,
                    fields
                })
            });

            if (!response.ok) {
                throw new HTTPError(`HTTP error! status: ${response.status}`, response.status);
            }

            const data = await response.json();
            
            if (data.code !== 0) {
                throw new TushareAPIError(data.msg, data.code);
            }

            return data;
        } catch (error) {
            if (error instanceof HTTPError || error instanceof TushareAPIError) {
                throw error;
            }
            throw new TushareAPIError(`API请求失败: ${(error as Error).message}`);
        }
    }

    /**
     * 验证日期格式是否正确 (YYYYMMDD)
     * @protected
     */
    protected validateDate(date: string | undefined): boolean {
        if (!date) return true;
        return /^\d{8}$/.test(date);
    }

    /**
     * 验证股票代码格式是否正确
     * @protected
     */
    protected validateTsCode(tsCode: string | undefined): boolean {
        if (!tsCode) return true;
        return /^\d{6}\.(SH|SZ|BJ)$/.test(tsCode);
    }
}
