// 股票数据接口配置

// 接口名称
export const API_NAME = 'stk_factor';

// 默认返回字段
export const DEFAULT_FIELDS = [
    'ts_code',           // 股票代码
    'trade_date',        // 交易日期
    'close',            // 收盘价
    'open',             // 开盘价
    'high',             // 最高价
    'low',              // 最低价
    'pre_close',        // 昨收价
    'change',           // 涨跌额
    'pct_change',       // 涨跌幅
    'vol',              // 成交量（手）
    'amount',           // 成交额（千元）
    'adj_factor',       // 复权因子
    'open_hfq',         // 开盘价后复权
    'open_qfq',         // 开盘价前复权
    'close_hfq',        // 收盘价后复权
    'close_qfq',        // 收盘价前复权
    'high_hfq',         // 最高价后复权
    'high_qfq',         // 最高价前复权
    'low_hfq',          // 最低价后复权
    'low_qfq',          // 最低价前复权
    'pre_close_hfq',    // 昨收价后复权
    'pre_close_qfq',    // 昨收价前复权
    'macd_dif',         // MACD DIF
    'macd_dea',         // MACD DEA
    'macd',             // MACD
    'kdj_k',            // KDJ_K
    'kdj_d',            // KDJ_D
    'kdj_j',            // KDJ_J
    'rsi_6',            // RSI_6
    'rsi_12',           // RSI_12
    'rsi_24',           // RSI_24
    'boll_upper',       // BOLL上轨
    'boll_mid',         // BOLL中轨
    'boll_lower',       // BOLL下轨
    'cci'               // CCI指标
];
