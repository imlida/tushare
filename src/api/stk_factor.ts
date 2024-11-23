import { BaseAPI } from './base';
import { ValidationError } from '../utils/error';
import { BaseParams, APIResponse } from '../types';
import { StkFactorData } from '../types/data';
import { API_NAME, DEFAULT_FIELDS } from './config';

/**
 * 股票因子数据API
 */
export class StkFactorAPI extends BaseAPI {
    /**
     * 获取股票因子数据
     * @param options 请求参数
     * @returns Promise<APIResponse<StkFactorData>>
     */
    async getStkFactor(options: BaseParams = {}): Promise<APIResponse<StkFactorData>> {
        const {
            ts_code,
            trade_date,
            start_date,
            end_date,
            limit,
            offset,
            fields
        } = options;

        // 参数验证
        if (ts_code && !this.validateTsCode(ts_code)) {
            throw new ValidationError('无效的股票代码格式');
        }

        if (trade_date && !this.validateDate(trade_date)) {
            throw new ValidationError('无效的交易日期格式');
        }

        if (start_date && !this.validateDate(start_date)) {
            throw new ValidationError('无效的开始日期格式');
        }

        if (end_date && !this.validateDate(end_date)) {
            throw new ValidationError('无效的结束日期格式');
        }

        const params = {
            ts_code,
            trade_date,
            start_date,
            end_date,
            limit,
            offset
        };

        // 使用用户指定的字段列表或默认字段列表
        const requestFields = fields || DEFAULT_FIELDS.join(',');

        return this.request(API_NAME, params, requestFields);
    }
}
