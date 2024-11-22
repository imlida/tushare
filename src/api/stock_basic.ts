import { BaseAPI } from './base';
import { ValidationError } from '../utils/error';
import { StockBasicParams, StockBasicData, APIResponse } from '../types';

/**
 * 股票数据相关API
 */
export class StockAPI extends BaseAPI {
    /**
     * 获取股票基础信息
     */
    async getStockBasic(options: StockBasicParams = {}): Promise<APIResponse<StockBasicData>> {
        const {
            ts_code,
            name,
            exchange,
            market,
            is_hs,
            list_status,
            limit,
            offset,
            ...rest
        } = options;

        // 参数验证
        if (ts_code && !this.validateTsCode(ts_code)) {
            throw new ValidationError('无效的股票代码格式');
        }

        if (exchange && !['SSE', 'SZSE', 'BSE'].includes(exchange)) {
            throw new ValidationError('无效的交易所代码');
        }

        const params = {
            ts_code,
            name,
            exchange,
            market,
            is_hs,
            list_status,
            limit,
            offset,
            ...rest
        };

        return this.request<StockBasicData>('stock_basic', params);
    }

    /**
     * 获取上市公司基本信息
     * TODO: 实现更多股票相关的API方法
     */
    async getCompanyInfo() {
        // 待实现
    }

    /**
     * 获取上市公司管理层
     * TODO: 实现更多股票相关的API方法
     */
    async getManagers() {
        // 待实现
    }
}
