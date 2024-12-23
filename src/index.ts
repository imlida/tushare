import { HttpClient, initHttpClient } from './utils/http';
import { StockBasicAPI, StockBasicParams, StockBasicAPIType } from './api/stock_basic';
import { DailyAPI, DailyAPIType } from './api/daily';
import { ProBarAPI, ProBarAPIType, ProBarRequestParams } from './api/pro_bar';
import { StkFactorAPI, StkFactorRequestParams } from './api/stk_factor';
import { StkFactorProAPI, StkFactorProParams, StkFactorProAPIType } from './api/stk_factor_pro';

export type { StockBasicParams, StockBasicData } from './api/stock_basic';
export type { DailyRequestParams, DailyResponseData } from './api/daily';
export type { ProBarRequestParams, ProBarResponseData } from './api/pro_bar';
export type { StkFactorRequestParams, StkFactorResponseData } from './api/stk_factor';
export type { StkFactorProParams, StkFactorProData } from './api/stk_factor_pro';

/**
 * Tushare API客户端
 */
export class Client {
    private httpClient: HttpClient;
    private _stockBasicAPI: StockBasicAPI;
    private _dailyAPI: DailyAPI;
    private _proBarAPI: ProBarAPI;
    private _stkFactorAPI: StkFactorAPI;
    private _stkFactorProAPI: StkFactorProAPI;

    /**
     * 股票基本信息API
     */
    readonly stock_basic: StockBasicAPIType;

    /**
     * A股日线行情数据API
     */
    readonly daily: DailyAPIType;

    /**
     * 通用行情接口
     */
    readonly pro_bar: ProBarAPIType;

    /**
     * 股票技术因子数据接口
     */
    readonly stk_factor: (params: StkFactorRequestParams) => Promise<any[]>;

    /**
     * 股票技术面因子数据接口(专业版)
     */
    readonly stk_factor_pro: StkFactorProAPIType;

    constructor(token: string, baseUrl?: string) {
        this.httpClient = new HttpClient(baseUrl, token);
        this._stockBasicAPI = new StockBasicAPI();
        this._dailyAPI = new DailyAPI();
        this._proBarAPI = new ProBarAPI();
        this._stkFactorAPI = new StkFactorAPI();
        this._stkFactorProAPI = new StkFactorProAPI();
        this.stock_basic = (params: StockBasicParams) => this._stockBasicAPI.getData(params);
        this.daily = (params) => this._dailyAPI.getData(params);
        this.pro_bar = (params) => this._proBarAPI.getData(params);
        this.stk_factor = (params) => this._stkFactorAPI.getData(params);
        this.stk_factor_pro = (params) => this._stkFactorProAPI.getData(params);
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
