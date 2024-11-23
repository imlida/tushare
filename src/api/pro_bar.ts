import { BaseAPI } from './base';
import { ValidationError } from '../utils/error';
import { APIResponse } from '../types';
import { ProBarParams, AssetType, AdjustType, FreqType } from '../types/params';
import { ProBarData } from '../types/data';

/**
 * 通用行情数据API
 */
export class ProBarAPI extends BaseAPI {
    /**
     * 获取通用行情数据
     * @param options Pro Bar接口参数
     * @returns Promise<APIResponse<ProBarData>>
     */
    async getProBar(options: ProBarParams): Promise<APIResponse<ProBarData>> {
        const {
            ts_code,
            start_date,
            end_date,
            asset = AssetType.STOCK,
            adj = AdjustType.NONE,
            freq = FreqType.DAILY,
            ma,
            factors,
            adjfactor,
            fields
        } = options;

        // 参数验证
        if (!ts_code) {
            throw new ValidationError('证券代码不能为空');
        }

        // 验证日期格式
        if (start_date && !this.validateDate(start_date)) {
            throw new ValidationError('无效的开始日期格式');
        }

        if (end_date && !this.validateDate(end_date)) {
            throw new ValidationError('无效的结束日期格式');
        }

        // 验证均线参数
        if (ma && (!Array.isArray(ma) || !ma.every(n => Number.isInteger(n) && n > 0))) {
            throw new ValidationError('均线参数必须是正整数数组');
        }

        // 验证因子参数
        const validFactors = ['tor', 'vr'];
        if (factors && (!Array.isArray(factors) || !factors.every(f => validFactors.includes(f)))) {
            throw new ValidationError('无效的因子参数');
        }

        // 构建请求参数
        const params = {
            ts_code,
            start_date,
            end_date,
            asset,
            adj,
            freq,
            ma: ma?.join(','),
            factors: factors?.join(','),
            adjfactor: adjfactor ? '1' : '0'
        };

        // 构建字段列表
        let finalFields: string[];
        
        if (fields && fields.length > 0) {
            // 使用用户自定义字段
            finalFields = [...fields];
        } else {
            // 使用默认字段列表
            finalFields = [
                'ts_code', 'trade_date', 'open', 'high', 'low', 'close',
                'pre_close', 'change', 'pct_chg', 'vol', 'amount'
            ];
        }

        // 如果需要复权因子且未包含在自定义字段中，添加到字段列表
        if (adjfactor && !finalFields.includes('adj_factor')) {
            finalFields.push('adj_factor');
        }

        // 如果有因子数据且未包含在自定义字段中，添加到字段列表
        if (factors?.includes('tor') && !finalFields.includes('turnover_rate')) {
            finalFields.push('turnover_rate');
        }
        if (factors?.includes('vr') && !finalFields.includes('volume_ratio')) {
            finalFields.push('volume_ratio');
        }

        // 根据资产类型选择不同的API名称
        let apiName = 'pro_bar';
        switch (asset) {
            case AssetType.STOCK:
                apiName = freq.includes('min') ? 'stk_mins' : 'daily';
                break;
            case AssetType.INDEX:
                apiName = freq.includes('min') ? 'idx_mins' : 'index_daily';
                break;
            case AssetType.FUND:
                apiName = 'fund_daily';
                break;
            case AssetType.FUTURE:
                apiName = 'fut_daily';
                break;
            case AssetType.OPTION:
                apiName = 'opt_daily';
                break;
            default:
                throw new ValidationError('不支持的资产类别');
        }

        // 发送请求
        return this.request(apiName, params, finalFields.join(','));
    }
}

// 创建ProBarAPI实例的工厂函数
export function createProBarAPI(token: string, baseURL: string = 'https://api.tushare.pro'): ProBarAPI {
    return new ProBarAPI(token, baseURL);
}
