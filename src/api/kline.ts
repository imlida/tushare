import { BaseAPI } from './base';
import { ValidationError } from '../utils/error';
import {
    BaseParams,
    MinuteParams,
    APIResponse,
    MinuteKLineData,
    DailyKLineData,
    APIConfig
} from '../types';

/**
 * K线数据相关API
 */
export class KlineAPI extends BaseAPI {
    private config: APIConfig;

    constructor(token: string, baseURL: string, config: APIConfig) {
        super(token, baseURL);
        this.config = config;
    }

    /**
     * 验证参数
     * @private
     */
    private validateParams(options: BaseParams) {
        const { ts_code, start_date, end_date, trade_date } = options;

        if (ts_code && !this.validateTsCode(ts_code)) {
            throw new ValidationError('无效的股票代码格式');
        }

        if (start_date && !this.validateDate(start_date)) {
            throw new ValidationError('无效的开始日期格式');
        }

        if (end_date && !this.validateDate(end_date)) {
            throw new ValidationError('无效的结束日期格式');
        }

        if (trade_date && !this.validateDate(trade_date)) {
            throw new ValidationError('无效的交易日期格式');
        }
    }

    /**
     * 获取K线数据的基础方法
     * @private
     */
    private async getKlineData(
        period: 'daily' | 'weekly' | 'monthly' | 'yearly',
        options: BaseParams
    ): Promise<APIResponse<DailyKLineData>> {
        this.validateParams(options);

        const config = this.config.kline[period];
        if (!config) {
            throw new ValidationError(`不支持的周期类型: ${period}`);
        }

        const { ts_code, start_date, end_date, trade_date, fields, ...rest } = options;
        const params = {
            ts_code,
            start_date,
            end_date,
            trade_date,
            ...rest
        };

        return this.request<DailyKLineData>(
            config.api_name,
            params,
            fields || config.defaultFields
        );
    }

    /**
     * 获取分钟级别K线数据
     * @private
     */
    private async getMinuteData(
        freq: 1 | 5 | 15 | 30 | 60,
        options: Omit<MinuteParams, 'freq'>
    ): Promise<APIResponse<MinuteKLineData>> {
        this.validateParams(options);

        const config = this.config.kline.minutes[`min${freq}`];
        if (!config) {
            throw new ValidationError(`不支持的分钟频率: ${freq}`);
        }

        const { ts_code, start_date, end_date, trade_date, fields, ...rest } = options;
        const params = {
            ts_code,
            start_date,
            end_date,
            trade_date,
            freq: config.freq,
            ...rest
        };

        return this.request<MinuteKLineData>(
            config.api_name,
            params,
            fields || config.defaultFields
        );
    }

    /**
     * 获取1分钟K线数据
     */
    async getMin1(options: Omit<MinuteParams, 'freq'>): Promise<APIResponse<MinuteKLineData>> {
        return this.getMinuteData(1, options);
    }

    /**
     * 获取5分钟K线数据
     */
    async getMin5(options: Omit<MinuteParams, 'freq'>): Promise<APIResponse<MinuteKLineData>> {
        return this.getMinuteData(5, options);
    }

    /**
     * 获取15分钟K线数据
     */
    async getMin15(options: Omit<MinuteParams, 'freq'>): Promise<APIResponse<MinuteKLineData>> {
        return this.getMinuteData(15, options);
    }

    /**
     * 获取30分钟K线数据
     */
    async getMin30(options: Omit<MinuteParams, 'freq'>): Promise<APIResponse<MinuteKLineData>> {
        return this.getMinuteData(30, options);
    }

    /**
     * 获取60分钟K线数据
     */
    async getMin60(options: Omit<MinuteParams, 'freq'>): Promise<APIResponse<MinuteKLineData>> {
        return this.getMinuteData(60, options);
    }

    /**
     * 获取日线数据
     */
    async getDaily(options: BaseParams): Promise<APIResponse<DailyKLineData>> {
        return this.getKlineData('daily', options);
    }

    /**
     * 获取周线数据
     */
    async getWeekly(options: BaseParams): Promise<APIResponse<DailyKLineData>> {
        return this.getKlineData('weekly', options);
    }

    /**
     * 获取月线数据
     */
    async getMonthly(options: BaseParams): Promise<APIResponse<DailyKLineData>> {
        return this.getKlineData('monthly', options);
    }

    /**
     * 获取年线数据
     */
    async getYearly(options: BaseParams): Promise<APIResponse<DailyKLineData>> {
        return this.getKlineData('yearly', options);
    }
}
