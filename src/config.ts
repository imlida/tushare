import { APIConfig } from './types';

/**
 * Tushare API 接口配置
 */
const API_CONFIG: APIConfig = {
    // K线数据接口
    kline: {
        // 分钟级别数据
        minutes: {
            // 1分钟线
            min1: {
                api_name: 'pro_bar',
                freq: '1min',
                defaultFields: 'ts_code,trade_time,open,high,low,close,vol,amount'
            },
            // 5分钟线
            min5: {
                api_name: 'pro_bar',
                freq: '5min',
                defaultFields: 'ts_code,trade_time,open,high,low,close,vol,amount'
            },
            // 15分钟线
            min15: {
                api_name: 'pro_bar',
                freq: '15min',
                defaultFields: 'ts_code,trade_time,open,high,low,close,vol,amount'
            },
            // 30分钟线
            min30: {
                api_name: 'pro_bar',
                freq: '30min',
                defaultFields: 'ts_code,trade_time,open,high,low,close,vol,amount'
            },
            // 60分钟线
            min60: {
                api_name: 'pro_bar',
                freq: '60min',
                defaultFields: 'ts_code,trade_time,open,high,low,close,vol,amount'
            }
        },
        // 日线数据
        daily: {
            api_name: 'daily',
            defaultFields: 'ts_code,trade_date,open,high,low,close,pre_close,change,pct_chg,vol,amount'
        },
        // 周线数据
        weekly: {
            api_name: 'weekly',
            defaultFields: 'ts_code,trade_date,open,high,low,close,pre_close,change,pct_chg,vol,amount'
        },
        // 月线数据
        monthly: {
            api_name: 'monthly',
            defaultFields: 'ts_code,trade_date,open,high,low,close,pre_close,change,pct_chg,vol,amount'
        },
        // 年线数据
        yearly: {
            api_name: 'yearly',
            defaultFields: 'ts_code,trade_date,open,high,low,close,pre_close,change,pct_chg,vol,amount'
        }
    }
};

export default API_CONFIG;
