# Tushare API TypeScript 客户端

这是一个使用 TypeScript 实现的 Tushare API 客户端，用于获取股票市场数据。支持分钟、日、周、月、年等多个级别的K线数据获取。

## 安装

```bash
npm install tushare-api-client
```

## 使用方法

```typescript
import TushareClient from 'tushare-api-client';
import { APIResponse, MinuteKLineData, DailyKLineData } from 'tushare-api-client/types';

// 创建客户端实例
const client = new TushareClient({
    token: '你的token'
});

// 获取分钟级别K线数据
async function getMinuteData() {
    try {
        const data: APIResponse<MinuteKLineData> = await client.min1({
            ts_code: '600519.SH',    // 股票代码
            start_date: '2024-01-01 09:30:00',  // 开始时间
            end_date: '2024-01-01 15:00:00'     // 结束时间
        });
        console.log('1分钟K线数据:', data);
    } catch (error) {
        console.error('获取数据失败:', error);
    }
}

// 获取日线数据
async function getDailyData() {
    try {
        const data: APIResponse<DailyKLineData> = await client.daily({
            ts_code: '600519.SH',    // 股票代码
            start_date: '20240101',  // 开始日期
            end_date: '20241010'     // 结束日期
        });
        console.log('日线数据:', data);
    } catch (error) {
        console.error('获取数据失败:', error);
    }
}
```

## API 方法

### 分钟级别数据

#### min1(options)
获取1分钟K线数据
#### min5(options)
获取5分钟K线数据
#### min15(options)
获取15分钟K线数据
#### min30(options)
获取30分钟K线数据
#### min60(options)
获取60分钟K线数据

参数类型:
```typescript
interface MinuteParams {
    ts_code: string;      // 股票代码
    start_date?: string;  // 开始时间 (YYYY-MM-DD HH:mm:ss)
    end_date?: string;    // 结束时间 (YYYY-MM-DD HH:mm:ss)
    fields?: string;      // 需要的字段，可选
}
```

返回数据类型:
```typescript
interface MinuteKLineData {
    ts_code: string;    // 股票代码
    trade_time: string; // 交易时间
    open: number;       // 开盘价
    high: number;       // 最高价
    low: number;        // 最低价
    close: number;      // 收盘价
    vol: number;        // 成交量
    amount: number;     // 成交额
}
```

### 日线及以上级别数据

#### daily(options)
获取日线数据
#### weekly(options)
获取周线数据
#### monthly(options)
获取月线数据
#### yearly(options)
获取年线数据

参数类型:
```typescript
interface BaseParams {
    ts_code: string;      // 股票代码
    start_date?: string;  // 开始日期 (YYYYMMDD)
    end_date?: string;    // 结束日期 (YYYYMMDD)
    fields?: string;      // 需要的字段，可选
}
```

返回数据类型:
```typescript
interface DailyKLineData {
    ts_code: string;    // 股票代码
    trade_date: string; // 交易日期
    open: number;       // 开盘价
    high: number;       // 最高价
    low: number;        // 最低价
    close: number;      // 收盘价
    pre_close: number;  // 昨收价
    change: number;     // 涨跌额
    pct_chg: number;    // 涨跌幅
    vol: number;        // 成交量
    amount: number;     // 成交额
}
```

### 股票因子数据

#### getStkFactor(options)
获取股票因子数据，包括复权因子、技术指标等数据。

参数类型:
```typescript
interface BaseParams {
    ts_code?: string;     // 股票代码
    trade_date?: string;  // 交易日期 (YYYYMMDD)
    start_date?: string;  // 开始日期 (YYYYMMDD)
    end_date?: string;    // 结束日期 (YYYYMMDD)
    limit?: number;       // 单次返回数据长度
    offset?: number;      // 请求数据的开始位置
    fields?: string;      // 需要的字段，可选
}
```

返回数据类型:
```typescript
interface StkFactorData {
    ts_code: string;       // 股票代码
    trade_date: string;    // 交易日期
    close: number;         // 收盘价
    open: number;          // 开盘价
    high: number;          // 最高价
    low: number;           // 最低价
    pre_close: number;     // 昨收价
    change: number;        // 涨跌额
    pct_change: number;    // 涨跌幅
    vol: number;           // 成交量（手）
    amount: number;        // 成交额（千元）
    adj_factor: number;    // 复权因子
    open_hfq: number;      // 开盘价后复权
    open_qfq: number;      // 开盘价前复权
    close_hfq: number;     // 收盘价后复权
    close_qfq: number;     // 收盘价前复权
    high_hfq: number;      // 最高价后复权
    high_qfq: number;      // 最高价前复权
    low_hfq: number;       // 最低价后复权
    low_qfq: number;       // 最低价前复权
    pre_close_hfq: number; // 昨收价后复权
    pre_close_qfq: number; // 昨收价前复权
    macd_dif: number;      // MACD DIF
    macd_dea: number;      // MACD DEA
    macd: number;          // MACD
    kdj_k: number;         // KDJ_K
    kdj_d: number;         // KDJ_D
    kdj_j: number;         // KDJ_J
    rsi_6: number;         // RSI_6
    rsi_12: number;        // RSI_12
    rsi_24: number;        // RSI_24
    boll_upper: number;    // BOLL上轨
    boll_mid: number;      // BOLL中轨
    boll_lower: number;    // BOLL下轨
    cci: number;           // CCI指标
}
```

使用示例:
```typescript
// 获取股票因子数据
async function getStkFactorData() {
    try {
        const data: APIResponse<StkFactorData> = await client.getStkFactor({
            ts_code: '600519.SH',    // 股票代码
            start_date: '20240101',  // 开始日期
            end_date: '20240110',    // 结束日期
            fields: 'ts_code,trade_date,close,adj_factor,macd,kdj_k,rsi_6,boll_upper'  // 指定需要的字段
        });
        console.log('股票因子数据:', data);
    } catch (error) {
        console.error('获取数据失败:', error);
    }
}
```

## 开发

```bash
# 安装依赖
npm install

# 构建
npm run build

# 运行示例
npm run example
```

## 注意事项

1. 使用前需要先在 Tushare 官网注册并获取 token
2. 接口调用频率需要遵循 Tushare 的限制规则
3. 本模块使用了 Node.js 原生的 fetch API，需要 Node.js 18.0.0 或更高版本
4. 分钟级别的数据获取使用 pro_bar 接口，可能需要更高级别的会员权限
5. 不同级别的K线数据在时间格式上有所不同：
   - 分钟级别使用 YYYY-MM-DD HH:mm:ss 格式
   - 日线及以上级别使用 YYYYMMDD 格式

## TypeScript 支持

本模块使用 TypeScript 编写，提供完整的类型定义，支持代码补全和类型检查。
