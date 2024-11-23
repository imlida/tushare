import { HttpClient, initHttpClient } from './utils/http';
import { StockBasicAPI, StockBasicParams, StockBasicAPIType } from './api/stock_basic';
export type { StockBasicParams, StockBasicData } from './api/stock_basic';

/**
 * Tushare API客户端
 */
export class Client {
    private httpClient: HttpClient;
    private _stockBasicAPI: StockBasicAPI;
    
    /**
     * 股票基本信息API
     */
    readonly stock_basic: StockBasicAPIType;

    constructor(token: string, baseUrl?: string) {
        this.httpClient = new HttpClient(baseUrl, token);
        this._stockBasicAPI = new StockBasicAPI();
        this.stock_basic = (params: StockBasicParams) => this._stockBasicAPI.getData(params);
    }
}

/**
 * 初始化Tushare API客户端
 * @param token API token
 * @param baseUrl 可选的基础URL
 * @returns Client实例
 */
export function init(token: string, baseUrl?: string): Client {
    // 为了保持向后兼容性，仍然调用initHttpClient
    initHttpClient(token, baseUrl);
    return new Client(token, baseUrl);
}
