import API_CONFIG from './api/config';
import {
    ClientConfig,
    BaseParams,
    MinuteParams,
    StockBasicParams
} from './types';
import { KlineAPI } from './api/kline';
import { StockAPI } from './api/stock_basic';

/**
 * Tushare API 客户端类
 * 整合所有API模块，提供统一的接口
 */
class TushareClient {
    private klineAPI: KlineAPI;
    private stockAPI: StockAPI;

    /**
     * @param {string} token - Tushare API token
     * @param {string} [baseURL='http://api.tushare.pro'] - API基础URL
     */
    constructor({ token, baseURL = 'http://api.tushare.pro' }: ClientConfig) {
        this.klineAPI = new KlineAPI(token, baseURL, API_CONFIG);
        this.stockAPI = new StockAPI(token, baseURL);
    }

    // K线数据相关方法
    async min1(options: Omit<MinuteParams, 'freq'>) { return this.klineAPI.getMin1(options); }
    async min5(options: Omit<MinuteParams, 'freq'>) { return this.klineAPI.getMin5(options); }
    async min15(options: Omit<MinuteParams, 'freq'>) { return this.klineAPI.getMin15(options); }
    async min30(options: Omit<MinuteParams, 'freq'>) { return this.klineAPI.getMin30(options); }
    async min60(options: Omit<MinuteParams, 'freq'>) { return this.klineAPI.getMin60(options); }
    async daily(options: BaseParams) { return this.klineAPI.getDaily(options); }
    async weekly(options: BaseParams) { return this.klineAPI.getWeekly(options); }
    async monthly(options: BaseParams) { return this.klineAPI.getMonthly(options); }
    async yearly(options: BaseParams) { return this.klineAPI.getYearly(options); }

    // 股票数据相关方法
    async stock_basic(options: StockBasicParams = {}) { return this.stockAPI.getStockBasic(options); }
}

export default TushareClient;
