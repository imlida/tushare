import { createProBarAPI } from '../src/api/pro_bar';
import { AssetType, AdjustType, FreqType } from '../src/types/params';

// 设置token和baseURL
const token = 'your_token_here';
const baseURL = 'https://api.tushare.pro';

// 创建API实例
const proBar = createProBarAPI(token, baseURL);

async function examples() {
    try {
        // 示例1：获取股票的前复权日线数据
        const stockDaily = await proBar.getProBar({
            ts_code: '000001.SZ',
            start_date: '20180101',
            end_date: '20181011',
            adj: AdjustType.FORWARD
        });
        console.log('股票前复权日线数据:', stockDaily);

        // 示例2：获取上证指数行情数据
        const indexDaily = await proBar.getProBar({
            ts_code: '000001.SH',
            asset: AssetType.INDEX,
            start_date: '20180101',
            end_date: '20181011'
        });
        console.log('上证指数行情数据:', indexDaily);

        // 示例3：获取带均线的股票数据
        const stockWithMA = await proBar.getProBar({
            ts_code: '000001.SZ',
            start_date: '20180101',
            end_date: '20181011',
            ma: [5, 20, 50]
        });
        console.log('带均线的股票数据:', stockWithMA);

        // 示例4：获取带换手率和量比的股票数据
        const stockWithFactors = await proBar.getProBar({
            ts_code: '000001.SZ',
            start_date: '20180101',
            end_date: '20181011',
            factors: ['tor', 'vr']
        });
        console.log('带因子的股票数据:', stockWithFactors);

        // 示例5：获取分钟级别数据
        const minuteData = await proBar.getProBar({
            ts_code: '000001.SZ',
            start_date: '20190901 09:00:00',
            end_date: '20190901 15:00:00',
            freq: FreqType.MIN_1
        });
        console.log('分钟级别数据:', minuteData);

        // 示例6：使用自定义字段获取数据
        const customFields = await proBar.getProBar({
            ts_code: '000001.SZ',
            start_date: '20180101',
            end_date: '20181011',
            fields: ['ts_code', 'trade_date', 'close', 'vol']
        });
        console.log('自定义字段数据:', customFields);

        // 示例7：组合使用自定义字段和其他参数
        const combinedData = await proBar.getProBar({
            ts_code: '000001.SZ',
            start_date: '20180101',
            end_date: '20181011',
            adj: AdjustType.FORWARD,
            fields: ['ts_code', 'trade_date', 'close', 'vol'],
            adjfactor: true  // 由于设置了adjfactor为true，返回结果会自动包含adj_factor字段
        });
        console.log('组合参数数据:', combinedData);

    } catch (error) {
        console.error('请求失败:', error);
    }
}

// 运行示例
examples();
