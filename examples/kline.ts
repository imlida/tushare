import TushareClient from '../src';
import { APIResponse, MinuteKLineData, DailyKLineData } from '../src/types';

// 创建客户端实例
const client = new TushareClient({
    token: '你的token'
});

// 获取贵州茅台(600519.SH)的各级别K线数据
async function getKlineData() {
    try {
        // 获取分钟级别数据（通过trade_date指定交易日）
        console.log('获取1分钟K线数据...');
        const min1Data: APIResponse<MinuteKLineData> = await client.min1({
            trade_date: '20240101'  // 只传入交易日期
        });
        console.log('1分钟K线数据:', min1Data);

        // 获取分钟级别数据（通过时间区间）
        console.log('\n获取5分钟K线数据...');
        const min5Data: APIResponse<MinuteKLineData> = await client.min5({
            ts_code: '600519.SH',
            start_date: '2024-01-01 09:30:00',
            end_date: '2024-01-01 15:00:00'
        });
        console.log('5分钟K线数据:', min5Data);

        // 获取日线数据（只传入股票代码）
        console.log('\n获取日线数据...');
        const dailyData: APIResponse<DailyKLineData> = await client.daily({
            ts_code: '600519.SH'
        });
        console.log('日线数据:', dailyData);

        // 获取周线数据（指定时间区间）
        console.log('\n获取周线数据...');
        const weeklyData: APIResponse<DailyKLineData> = await client.weekly({
            start_date: '20240101',
            end_date: '20240331'
        });
        console.log('周线数据:', weeklyData);

        // 获取月线数据（指定字段）
        console.log('\n获取月线数据...');
        const monthlyData: APIResponse<DailyKLineData> = await client.monthly({
            ts_code: '600519.SH',
            fields: 'ts_code,trade_date,close,vol'
        });
        console.log('月线数据:', monthlyData);

        // 获取年线数据（组合使用多个可选参数）
        console.log('\n获取年线数据...');
        const yearlyData: APIResponse<DailyKLineData> = await client.yearly({
            ts_code: '600519.SH',
            start_date: '20200101',
            end_date: '20241231',
            fields: 'ts_code,trade_date,open,close,high,low'
        });
        console.log('年线数据:', yearlyData);

    } catch (error) {
        console.error('获取数据失败:', (error as Error).message);
    }
}

// 运行示例
getKlineData();
