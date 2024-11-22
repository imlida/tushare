// API请求参数类型定义
export interface BaseParams {
    ts_code?: string;         // 股票代码（可选）
    start_date?: string;      // 开始日期（可选）
    end_date?: string;        // 结束日期（可选）
    trade_date?: string;      // 交易日期（可选，每周最后一个交易日期，YYYYMMDD格式）
    fields?: string;          // 返回字段（可选）
    limit?: number;           // 单次返回数据长度（可选）
    offset?: number;          // 请求数据的开始位置（可选）
}

export interface MinuteParams extends BaseParams {
    freq: string;             // 频率（必选）
}

// 股票列表请求参数
export interface StockBasicParams {
    ts_code?: string;         // TS代码
    name?: string;            // 股票名称
    exchange?: string;        // 交易所
    market?: string;          // 市场类别
    is_hs?: string;          // 是否沪深港通标的
    list_status?: string;     // 上市状态
    limit?: number;           // 单次返回数据长度
    offset?: number;          // 请求数据的开始位置
}
