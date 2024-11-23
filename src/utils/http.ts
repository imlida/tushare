/**
 * HTTP请求工具类
 */
export class HttpClient {
    private baseUrl: string;
    private token: string;

    constructor(baseUrl: string = 'http://api.tushare.pro', token: string) {
        this.baseUrl = baseUrl;
        this.token = token;
    }

    /**
     * 发送POST请求到Tushare API
     * @param apiName API名称
     * @param params 请求参数
     * @param fields 可选的返回字段列表
     * @returns 
     */
    async post<T>(apiName: string, params: Record<string, any>, fields?: string): Promise<T> {
        const response = await fetch(this.baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                api_name: apiName,
                token: this.token,
                params,
                fields: fields,
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        // Tushare API 错误处理
        if (data.code !== 0) {
            throw new Error(`API error: ${data.msg}`);
        }

        return data.data;
    }
}

// 创建单例实例
let httpClient: HttpClient | null = null;

/**
 * 初始化HTTP客户端
 * @param token API token
 * @param baseUrl 可选的基础URL
 */
export function initHttpClient(token: string, baseUrl?: string) {
    httpClient = new HttpClient(baseUrl, token);
}

/**
 * 获取HTTP客户端实例
 */
export function getHttpClient(): HttpClient {
    if (!httpClient) {
        throw new Error('HTTP client not initialized. Please call initHttpClient first.');
    }
    return httpClient;
}
