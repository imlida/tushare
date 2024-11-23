/**
 * 资产类别枚举
 */
export enum AssetType {
    STOCK = 'E',        // 股票
    INDEX = 'I',        // 沪深指数
    CRYPTO = 'C',       // 数字货币
    FUTURE = 'FT',      // 期货
    FUND = 'FD',        // 基金
    OPTION = 'O',       // 期权
    CONVERTIBLE = 'CB'  // 可转债
}

/**
 * 复权类型枚举
 */
export enum AdjustType {
    NONE = 'None',      // 不复权
    FORWARD = 'qfq',    // 前复权
    BACKWARD = 'hfq'    // 后复权
}

/**
 * 数据频度枚举
 */
export enum FreqType {
    MIN_1 = '1min',     // 1分钟
    MIN_5 = '5min',     // 5分钟
    MIN_15 = '15min',   // 15分钟
    MIN_30 = '30min',   // 30分钟
    MIN_60 = '60min',   // 60分钟
    DAILY = 'D',        // 日线
    WEEKLY = 'W',       // 周线
    MONTHLY = 'M'       // 月线
}

/**
 * Pro Bar接口参数
 */
export interface ProBarParams {
    ts_code: string;           // 证券代码
    start_date?: string;       // 开始日期
    end_date?: string;         // 结束日期
    asset?: AssetType;         // 资产类别
    adj?: AdjustType;         // 复权类型
    freq?: FreqType;          // 数据频度
    ma?: number[];            // 均线周期
    factors?: string[];       // 股票因子
    adjfactor?: boolean;      // 是否返回复权因子
    fields?: string[];        // 自定义字段列表
}
