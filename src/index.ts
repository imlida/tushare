import API_CONFIG from './api/config';
import {
    ClientConfig,
    BaseParams,
    MinuteParams,
    StockBasicParams
} from './types';
import { KlineAPI } from './api/kline';
import { StockBasicAPI } from './api/stock_basic';
import { StkFactorAPI } from './api/stk_factor';

/**
 * Tushare API 客户端类
 * 整合所有API模块，提供统一的接口
 */
class TushareClient {
    private klineAPI: KlineAPI;
    private stockBasicAPI: StockBasicAPI;
    private stkFactorAPI: StkFactorAPI;

    /**
     * @param {string} token - Tushare API token
     * @param {string} [baseURL='http://api.tushare.pro'] - API基础URL
     */
    constructor({ token, baseURL = 'http://api.tushare.pro' }: ClientConfig) {
        this.klineAPI = new KlineAPI(token, baseURL, API_CONFIG);
        this.stockBasicAPI = new StockBasicAPI(token, baseURL);
        this.stkFactorAPI = new StkFactorAPI(token, baseURL);
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

    // 股票基础数据相关方法
    /**
     * 获取股票基础信息
     * @param {StockBasicParams} options - 查询参数
     * @returns {Promise} 返回股票基础信息
     */
    async stock_basic(options: StockBasicParams = {}) {
        return this.stockBasicAPI.getStockBasic(options);
    }

    // 股票因子数据相关方法
    /**
     * 获取股票因子数据
     * @param {BaseParams} options - 查询参数
     * @returns {Promise} 返回股票因子数据
     */
    async stk_factor(options: BaseParams = {}) {
        return this.stkFactorAPI.getStkFactor(options);
    }
}

export default TushareClient;
