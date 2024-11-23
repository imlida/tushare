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
    ts_code: string;          // 证券代码
    trade_date: string;       // 交易日期
    open: number;             // 开盘价
    high: number;             // 最高价
    low: number;              // 最低价
    close: number;            // 收盘价
    pre_close: number;        // 昨收价
    change: number;           // 涨跌额
    pct_chg: number;          // 涨跌幅
    vol: number;              // 成交量
    amount: number;           // 成交额
}

// 分钟K线数据
export interface MinuteKLineData extends BaseKLineData {
    trade_time: string;       // 交易时间
}

// 日线K线数据
export interface DailyKLineData extends BaseKLineData {
    adj_factor?: number;      // 复权因子
}

// 股票因子数据返回类型
export interface StkFactorData {
    ts_code: string;          // 股票代码
    trade_date: string;       // 交易日期
    close: number;            // 收盘价
    open: number;             // 开盘价
    high: number;             // 最高价
    low: number;              // 最低价
    pre_close: number;        // 昨收价
    change: number;           // 涨跌额
    pct_change: number;       // 涨跌幅
    vol: number;              // 成交量（手）
    amount: number;           // 成交额（千元）
    adj_factor: number;       // 复权因子
    open_hfq: number;         // 开盘价后复权
    open_qfq: number;         // 开盘价前复权
    close_hfq: number;        // 收盘价后复权
    close_qfq: number;        // 收盘价前复权
    high_hfq: number;         // 最高价后复权
    high_qfq: number;         // 最高价前复权
    low_hfq: number;          // 最低价后复权
    low_qfq: number;         // 最低价前复权
    pre_close_hfq: number;    // 昨收价后复权
    pre_close_qfq: number;    // 昨收价前复权
    macd_dif: number;         // MCAD_DIF
    macd_dea: number;         // MCAD_DEA
    macd: number;             // MCAD
    kdj_k: number;            // KDJ_K
    kdj_d: number;            // KDJ_D
    kdj_j: number;            // KDJ_J
    rsi_6: number;            // RSI_6
    rsi_12: number;           // RSI_12
    rsi_24: number;           // RSI_24
    boll_upper: number;       // BOLL_UPPER
    boll_mid: number;         // BOLL_MID
    boll_lower: number;       // BOLL_LOWER
    cci: number;              // CCI
}

// Pro Bar返回数据类型
export interface ProBarData extends BaseKLineData {
    // 均线数据
    ma_5?: number;            // 5日均线
    ma_10?: number;           // 10日均线
    ma_20?: number;           // 20日均线
    ma_30?: number;           // 30日均线
    ma_60?: number;           // 60日均线
    
    // 成交量均线
    ma_v_5?: number;          // 5日成交量均线
    ma_v_10?: number;         // 10日成交量均线
    ma_v_20?: number;         // 20日成交量均线
    ma_v_30?: number;         // 30日成交量均线
    ma_v_60?: number;         // 60日成交量均线
    
    // 因子数据
    tor?: number;             // 换手率
    vr?: number;              // 量比
    
    // 复权因子
    adj_factor?: number;      // 复权因子
}
