import { HttpClient, initHttpClient } from './utils/http';
import { StockBasicAPI, StockBasicParams, StockBasicAPIType } from './api/stock_basic';
import { DailyAPI, DailyAPIType } from './api/daily';
export type { StockBasicParams, StockBasicData } from './api/stock_basic';
export type { DailyRequestParams, DailyResponseData } from './api/daily';

/**
 * Tushare API客户端
 */
export class Client {
    private httpClient: HttpClient;
    private _stockBasicAPI: StockBasicAPI;
    private _dailyAPI: DailyAPI;
    
    /**
     * 股票基本信息API
     */
    readonly stock_basic: StockBasicAPIType;

    /**
     * A股日线行情数据API
     */
    readonly daily: DailyAPIType;

    constructor(token: string, baseUrl?: string) {
        this.httpClient = new HttpClient(baseUrl, token);
        this._stockBasicAPI = new StockBasicAPI();
        this._dailyAPI = new DailyAPI();
        this.stock_basic = (params: StockBasicParams) => this._stockBasicAPI.getData(params);
        this.daily = (params) => this._dailyAPI.getData(params);
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
