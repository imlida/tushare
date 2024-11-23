/**
 * A股日线行情数据接口
 */
import { BaseAPI } from './base';
import { getHttpClient } from '../utils/http';

/**
 * 日线行情请求参数接口
 */
export interface DailyRequestParams {
    ts_code?: string;      // 股票代码（支持多个股票同时提取，逗号分隔）
    trade_date?: string;   // 交易日期（YYYYMMDD）
    start_date?: string;   // 开始日期(YYYYMMDD)
    end_date?: string;     // 结束日期(YYYYMMDD)
}

/**
 * 日线行情返回数据接口
 */
export interface DailyResponseData {
    ts_code: string;       // 股票代码
    trade_date: string;    // 交易日期
    open: number;         // 开盘价
    high: number;         // 最高价
    low: number;          // 最低价
    close: number;        // 收盘价
    pre_close: number;    // 昨收价
    change: number;       // 涨跌额
    pct_chg: number;      // 涨跌幅
    vol: number;          // 成交量（手）
    amount: number;       // 成交额（千元）
}

/**
 * 日期格式验证函数
 */
const isValidDate = (date: string): boolean => {
    if (!date) return false;
    return /^\d{8}$/.test(date);
};

/**
 * 股票代码验证函数
 */
const isValidTsCode = (code: string): boolean => {
    if (!code) return false;
    // 支持多个股票代码，逗号分隔
    const codes = code.split(',');
    return codes.every(c => /^\d{6}\.(SH|SZ)$/.test(c.trim()));
};

/**
 * A股日线行情数据API实现类
 */
export class DailyAPI extends BaseAPI<DailyRequestParams, DailyResponseData[]> {
    readonly apiName = 'daily';

    readonly requestParams = [
        {
            name: 'ts_code',
            type: 'string',
            required: false,
            description: '股票代码（支持多个股票同时提取，逗号分隔）',
            validator: isValidTsCode
        },
        {
            name: 'trade_date',
            type: 'string',
            required: false,
            description: '交易日期（YYYYMMDD）',
            validator: isValidDate
        },
        {
            name: 'start_date',
            type: 'string',
            required: false,
            description: '开始日期(YYYYMMDD)',
            validator: isValidDate
        },
        {
            name: 'end_date',
            type: 'string',
            required: false,
            description: '结束日期(YYYYMMDD)',
            validator: isValidDate
        }
    ];

    readonly defaultFields = [
        'ts_code', 'trade_date', 'open', 'high', 'low', 'close',
        'pre_close', 'change', 'pct_chg', 'vol', 'amount'
    ];

    /**
     * 获取日线行情数据
     * @param options 请求参数
     * @returns Promise<DailyResponseData[]>
     */
    async getData(options: DailyRequestParams): Promise<DailyResponseData[]> {
        // 验证参数
        this.validateParams(options);

        // 确保至少提供了一个查询条件
        if (!options.ts_code && !options.trade_date && !options.start_date && !options.end_date) {
            throw new Error('至少需要提供一个查询条件：股票代码、交易日期、开始日期或结束日期');
        }

        // 发送请求
        const httpClient = getHttpClient();
        const fields = this.defaultFields.join(',');
        const response = await httpClient.post<{
            fields: string[];
            items: any[][];
        }>(this.apiName, options, fields);

        // 转换响应数据格式
        return response.items.map(item => {
            const data: any = {};
            response.fields.forEach((field, index) => {
                // 数值类型转换
                if (['open', 'high', 'low', 'close', 'pre_close', 'change', 'pct_chg', 'vol', 'amount'].includes(field)) {
                    data[field] = parseFloat(item[index]);
                } else {
                    data[field] = item[index];
                }
            });
            return data as DailyResponseData;
        });
    }
}

// 导出API实例
export const dailyAPI = new DailyAPI();

// 导出API类型
export type DailyAPIType = (params: DailyRequestParams) => Promise<DailyResponseData[]>;
