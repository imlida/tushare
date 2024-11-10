import TushareClient from '../src';

async function main() {
    // 创建客户端实例
    const client = new TushareClient({
        token: 'YOUR_TOKEN_HERE'
    });

    try {
        // 获取所有股票列表
        const allStocks = await client.stock_basic();
        console.log('所有股票列表:', allStocks);

        // 获取上海主板股票
        const shStocks = await client.stock_basic({
            market: 'MAIN',
            exchange: 'SSE'
        });
        console.log('上海主板股票:', shStocks);

        // 获取深圳创业板股票
        const cybStocks = await client.stock_basic({
            market: 'GEM',
            exchange: 'SZSE'
        });
        console.log('创业板股票:', cybStocks);

        // 分页获取股票列表
        const pagedStocks = await client.stock_basic({
            limit: 10,
            offset: 0
        });
        console.log('分页获取股票(前10条):', pagedStocks);

    } catch (error) {
        console.error('获取股票列表失败:', error);
    }
}

main();
