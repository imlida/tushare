import { BaseAPI } from './base';
import { RequestParamSpec } from '../types/api';
import { getHttpClient } from '../utils/http';

// 输入参数类型定义
export interface StkFactorRequestParams {
    ts_code?: string;         // 股票代码
    trade_date?: string;      // 交易日期
    start_date?: string;      // 开始日期
    end_date?: string;        // 结束日期
}

// 响应数据类型定义
export interface StkFactorResponseData {
    ts_code: string;           // 股票代码
    trade_date: string;        // 交易日期
    close: number;             // 收盘价
    open: number;              // 开盘价
    high: number;              // 最高价
    low: number;               // 最低价
    pre_close: number;         // 昨收价
    change: number;            // 涨跌额
    pct_change: number;        // 涨跌幅
    vol: number;               // 成交量（手）
    amount: number;            // 成交额（千元）
    adj_factor: number;        // 复权因子
    open_hfq: number;          // 开盘价后复权
    open_qfq: number;          // 开盘价前复权
    close_hfq: number;         // 收盘价后复权
    close_qfq: number;         // 收盘价前复权
    high_hfq: number;          // 最高价后复权
    high_qfq: number;          // 最高价前复权
    low_hfq: number;           // 最低价后复权
    low_qfq: number;           // 最低价前复权
    pre_close_hfq: number;     // 昨收价后复权
    pre_close_qfq: number;     // 昨收价前复权
    macd_dif: number;          // MCAD_DIF
    macd_dea: number;          // MCAD_DEA
    macd: number;              // MCAD
    kdj_k: number;             // KDJ_K
    kdj_d: number;             // KDJ_D
    kdj_j: number;             // KDJ_J
    rsi_6: number;             // RSI_6
    rsi_12: number;            // RSI_12
    rsi_24: number;            // RSI_24
    boll_upper: number;        // BOLL_UPPER
    boll_mid: number;          // BOLL_MID
    boll_lower: number;        // BOLL_LOWER
    cci: number;               // CCI
}

// 日期格式验证函数
const isValidDate = (date: string): boolean => {
    if (!date) return false;
    return /^\d{8}$/.test(date);
};

// 股票代码验证函数
const isValidTsCode = (code: string): boolean => {
    if (!code) return false;
    return /^\d{6}\.(SH|SZ|BJ)$/.test(code);
};

/**
 * 股票技术因子数据接口实现
 */
export class StkFactorAPI extends BaseAPI<StkFactorRequestParams, StkFactorResponseData[]> {
    readonly apiName = 'stk_factor';

    readonly requestParams: RequestParamSpec[] = [
        {
            name: 'ts_code',
            type: 'string',
            required: false,
            description: '股票代码',
            validator: (value: string) => !value || isValidTsCode(value)
        },
        {
            name: 'trade_date',
            type: 'string',
            required: false,
            description: '交易日期',
            validator: (value: string) => !value || isValidDate(value)
        },
        {
            name: 'start_date',
            type: 'string',
            required: false,
            description: '开始日期',
            validator: (value: string) => !value || isValidDate(value)
        },
        {
            name: 'end_date',
            type: 'string',
            required: false,
            description: '结束日期',
            validator: (value: string) => !value || isValidDate(value)
        }
    ];

    readonly defaultFields = [
        'ts_code', 'trade_date', 'close', 'open', 'high', 'low', 'pre_close',
        'change', 'pct_change', 'vol', 'amount', 'adj_factor',
        'open_hfq', 'open_qfq', 'close_hfq', 'close_qfq',
        'high_hfq', 'high_qfq', 'low_hfq', 'low_qfq',
        'pre_close_hfq', 'pre_close_qfq',
        'macd_dif', 'macd_dea', 'macd',
        'kdj_k', 'kdj_d', 'kdj_j',
        'rsi_6', 'rsi_12', 'rsi_24',
        'boll_upper', 'boll_mid', 'boll_lower',
        'cci'
    ];

    /**
     * 获取股票技术因子数据
     * @param options 请求参数
     * @returns Promise<StkFactorResponseData[]>
     */
    async getData(options: StkFactorRequestParams): Promise<StkFactorResponseData[]> {
        // 验证参数
        this.validateParams(options);

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
                if (field === 'ts_code' || field === 'trade_date') {
                    data[field] = item[index];
                } else {
                    data[field] = parseFloat(item[index]);
                }
            });
            return data as StkFactorResponseData;
        });
    }
}

// 导出API实例
export const stkFactorAPI = new StkFactorAPI();
