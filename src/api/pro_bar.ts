import { BaseAPI } from './base';
import { RequestParamSpec } from '../types/api';
import { getHttpClient } from '../utils/http';

// 输入参数类型定义
export interface ProBarRequestParams {
    ts_code: string;           // 证券代码
    start_date?: string;       // 开始日期
    end_date?: string;         // 结束日期
    asset?: 'E' | 'I' | 'C' | 'FT' | 'FD' | 'O' | 'CB';  // 资产类别
    adj?: 'qfq' | 'hfq' | null;  // 复权类型
    freq?: string;             // 数据频度
    ma?: number[];            // 均线
    factors?: ('tor' | 'vr')[];  // 股票因子
    adjfactor?: boolean;       // 复权因子
}

// 响应数据类型定义
export interface ProBarResponseData {
    ts_code: string;           // 证券代码
    trade_date: string;        // 交易日期
    open: number;              // 开盘价
    high: number;              // 最高价
    low: number;               // 最低价
    close: number;             // 收盘价
    pre_close?: number;        // 昨收价
    change?: number;           // 涨跌额
    pct_chg?: number;         // 涨跌幅
    vol?: number;             // 成交量
    amount?: number;          // 成交额
    ma_5?: number;            // 5日均线
    ma_20?: number;           // 20日均线
    ma_50?: number;           // 50日均线
    tor?: number;             // 换手率
    vr?: number;              // 量比
    adj_factor?: number;      // 复权因子
}

// 日期格式验证函数
const isValidDate = (date: string): boolean => {
    if (!date) return false;
    // 支持两种格式：YYYYMMDD 和 YYYY-MM-DD HH:mm:ss
    return /^\d{8}$/.test(date) || /^\d{4}-\d{2}-\d{2}(\s\d{2}:\d{2}:\d{2})?$/.test(date);
};

// 证券代码验证函数
const isValidTsCode = (code: string): boolean => {
    if (!code) return false;
    // 根据不同市场的代码规则验证
    return /^\d{6}\.(SH|SZ|BJ)|[A-Z]+\.[A-Z]+$/.test(code);
};

// 频度验证函数
const isValidFreq = (freq: string): boolean => {
    if (!freq) return false;
    return /^(D|W|M|\d+min)$/.test(freq);
};

export type ProBarAPIType = (params: ProBarRequestParams) => Promise<ProBarResponseData[]>;

/**
 * 通用行情接口实现
 */
export class ProBarAPI extends BaseAPI<ProBarRequestParams, ProBarResponseData[]> {
    readonly apiName = 'pro_bar';

    readonly requestParams: RequestParamSpec[] = [
        {
            name: 'ts_code',
            type: 'string',
            required: true,
            description: '证券代码',
            validator: isValidTsCode
        },
        {
            name: 'start_date',
            type: 'string',
            required: false,
            description: '开始日期',
            validator: isValidDate
        },
        {
            name: 'end_date',
            type: 'string',
            required: false,
            description: '结束日期',
            validator: isValidDate
        },
        {
            name: 'asset',
            type: 'string',
            required: true,
            default: 'E',
            description: '资产类别：E股票 I沪深指数 C数字货币 FT期货 FD基金 O期权 CB可转债',
            validator: (value: string) => ['E', 'I', 'C', 'FT', 'FD', 'O', 'CB'].includes(value)
        },
        {
            name: 'adj',
            type: 'string',
            required: false,
            description: '复权类型(只针对股票)：qfq前复权 hfq后复权',
            validator: (value: string) => ['qfq', 'hfq', null].includes(value as any)
        },
        {
            name: 'freq',
            type: 'string',
            required: true,
            default: 'D',
            description: '数据频度：支持分钟(min)/日(D)/周(W)/月(M)K线',
            validator: isValidFreq
        },
        {
            name: 'ma',
            type: 'array',
            required: false,
            description: '均线，支持任意合理int数值',
            validator: (value: number[]) => Array.isArray(value) && value.every(n => Number.isInteger(n) && n > 0)
        },
        {
            name: 'factors',
            type: 'array',
            required: false,
            description: '股票因子，支持 tor换手率 vr量比',
            validator: (value: string[]) => Array.isArray(value) && value.every(f => ['tor', 'vr'].includes(f))
        },
        {
            name: 'adjfactor',
            type: 'boolean',
            required: false,
            description: '复权因子，在复权数据时，如果此参数为True，返回的数据中则带复权因子'
        }
    ];

    readonly defaultFields = [
        'ts_code',
        'trade_date',
        'open',
        'high',
        'low',
        'close',
        'pre_close',
        'change',
        'pct_chg',
        'vol',
        'amount'
    ];

    /**
     * 获取通用行情数据
     * @param options 请求参数
     * @returns Promise<ProBarResponseData[]>
     */
    async getData(options: ProBarRequestParams): Promise<ProBarResponseData[]> {
        // 验证参数
        this.validateParams(options);

        // 根据资产类型确定API接口名称
        let apiName = '';
        switch (options.asset) {
            case 'E':
                apiName = options.freq === 'D' ? 'daily' : 'stk_mins';
                break;
            case 'I':
                apiName = options.freq === 'D' ? 'index_daily' : 'index_mins';
                break;
            case 'FT':
                apiName = options.freq === 'D' ? 'fut_daily' : 'fut_mins';
                break;
            case 'FD':
                apiName = options.freq === 'D' ? 'fund_daily' : 'fund_mins';
                break;
            case 'O':
                apiName = 'opt_daily';
                break;
            case 'CB':
                apiName = 'cb_daily';
                break;
            default:
                throw new Error('不支持的资产类别');
        }

        // 构建请求参数
        const requestParams: any = {
            ts_code: options.ts_code,
            start_date: options.start_date,
            end_date: options.end_date,
            freq: options.freq
        };

        // 添加复权参数（仅针对股票）
        if (options.asset === 'E' && options.adj) {
            requestParams.adj = options.adj;
        }

        // 添加均线参数
        if (options.ma) {
            requestParams.ma = options.ma.join(',');
        }

        // 添加因子参数
        if (options.factors) {
            requestParams.factors = options.factors.join(',');
        }

        // 添加复权因子参数
        if (options.adjfactor !== undefined) {
            requestParams.adjfactor = options.adjfactor;
        }

        // 发送请求
        const httpClient = getHttpClient();
        const fields = this.defaultFields.join(',');
        const response = await httpClient.post<{
            fields: string[];
            items: any[][];
        }>(apiName, requestParams, fields);

        // 转换响应数据格式
        return response.items.map(item => {
            const data: any = {};
            response.fields.forEach((field, index) => {
                // 数值类型转换
                if ([
                    'open', 'high', 'low', 'close', 'pre_close',
                    'change', 'pct_chg', 'vol', 'amount',
                    'ma_5', 'ma_20', 'ma_50', 'tor', 'vr', 'adj_factor'
                ].includes(field)) {
                    data[field] = parseFloat(item[index]);
                } else {
                    data[field] = item[index];
                }
            });
            return data as ProBarResponseData;
        });
    }
}

// 导出API实例
export const proBarAPI = new ProBarAPI();
