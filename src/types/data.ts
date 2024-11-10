// 股票列表返回数据
export interface StockBasicData {
    ts_code: string;          // TS代码
    symbol: string;           // 股票代码
    name: string;             // 股票名称
    area: string;             // 地域
    industry: string;         // 所属行业
    cnspell: string;          // 拼音缩写
    market: string;           // 市场类型
    list_date: string;        // 上市日期
    act_name: string;         // 实控人名称
    act_ent_type: string;     // 实控人企业性质
}

// K线数据类型定义
export interface BaseKLineData {
    ts_code: string;
    open: number;
    high: number;
    low: number;
    close: number;
    vol: number;
    amount: number;
}

export interface MinuteKLineData extends BaseKLineData {
    trade_time: string;
}

export interface DailyKLineData extends BaseKLineData {
    trade_date: string;
    pre_close: number;
    change: number;
    pct_chg: number;
}
