import { BaseAPI } from './base';
import { RequestParamSpec } from '../types/api';
import { getHttpClient } from '../utils/http';

/**
 * 股票基本信息请求参数
 */
export interface StockBasicParams {
    ts_code?: string;      // TS股票代码
    name?: string;         // 股票名称
    exchange?: string;     // 交易所
    market?: string;       // 市场类型
    list_status?: string;  // 上市状态
    is_hs?: string;       // 是否沪深港通标的
    fields?: string[];     // 需要返回的字段列表
}

/**
 * 股票基本信息返回数据
 */
export interface StockBasicData {
    ts_code: string;      // TS代码
    symbol: string;       // 股票代码
    name: string;         // 股票名称
    area: string;         // 地域
    industry: string;     // 所属行业
    fullname: string;     // 股票全称
    enname: string;       // 英文全称
    market: string;       // 市场类型
    exchange: string;     // 交易所代码
    curr_type: string;    // 交易货币
    list_status: string;  // 上市状态
    list_date: string;    // 上市日期
    delist_date: string;  // 退市日期
    is_hs: string;        // 是否沪深港通标的
}

/**
 * 股票基本信息API实现
 */
export class StockBasicAPI extends BaseAPI<StockBasicParams, StockBasicData[]> {
    readonly apiName = 'stock_basic';

    readonly requestParams: RequestParamSpec[] = [
        {
            name: 'ts_code',
            type: 'string',
            required: false,
            description: 'TS股票代码',
        },
        {
            name: 'name',
            type: 'string',
            required: false,
            description: '股票名称',
        },
        {
            name: 'exchange',
            type: 'string',
            required: false,
            description: '交易所代码 SSE上交所 SZSE深交所',
        },
        {
            name: 'market',
            type: 'string',
            required: false,
            description: '市场类型',
        },
        {
            name: 'list_status',
            type: 'string',
            required: false,
            default: 'L',
            description: '上市状态 L上市 D退市 P暂停上市',
            validator: (value: string) => ['L', 'D', 'P'].includes(value),
        },
        {
            name: 'is_hs',
            type: 'string',
            required: false,
            description: '是否沪深港通标的',
            validator: (value: string) => ['N', 'H', 'S'].includes(value),
        },
        {
            name: 'fields',
            type: 'array',
            required: false,
            description: '需要返回的字段列表',
        }
    ];

    readonly defaultFields = [
        'ts_code',
        'symbol',
        'name',
        'area',
        'industry',
        'list_date'
    ];

    /**
     * 获取股票基本信息
     * @param options 请求参数
     * @returns 股票基本信息列表
     */
    async getData(options: StockBasicParams): Promise<StockBasicData[]> {
        // 验证参数
        this.validateParams(options);

        // 提取fields参数
        const { fields, ...params } = options;

        // 发送请求
        const response = await getHttpClient().post<{
            fields: string[];
            items: any[][];
        }>(this.apiName, params, fields || this.defaultFields);

        // 将数组数据转换为对象数组
        return response.items.map(item => {
            const result: any = {};
            response.fields.forEach((field, index) => {
                result[field] = item[index];
            });
            return result as StockBasicData;
        });
    }
}

// 导出单例实例
export const stockBasicAPI = new StockBasicAPI();
