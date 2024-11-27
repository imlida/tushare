import { BaseAPI } from './base';
import { RequestParamSpec } from '../types/api';
import { getHttpClient } from '../utils/http';

/**
 * 股票技术面因子请求参数(专业版)
 */
export interface StkFactorProParams {
    ts_code?: string;      // 股票代码
    trade_date?: string;   // 交易日期
    start_date?: string;   // 开始日期
    end_date?: string;     // 结束日期
    fields?: string;       // 需要返回的字段列表
}

/**
 * 股票技术面因子返回数据(专业版)
 */
export interface StkFactorProData {
    ts_code: string;           // 股票代码
    trade_date: string;        // 交易日期
    open: number;             // 开盘价
    open_hfq: number;         // 开盘价（后复权）
    open_qfq: number;         // 开盘价（前复权）
    high: number;             // 最高价
    high_hfq: number;         // 最高价（后复权）
    high_qfq: number;         // 最高价（前复权）
    low: number;              // 最低价
    low_hfq: number;          // 最低价（后复权）
    low_qfq: number;          // 最低价（前复权）
    close: number;            // 收盘价
    close_hfq: number;        // 收盘价（后复权）
    close_qfq: number;        // 收盘价（前复权）
    pre_close: number;        // 昨收价(前复权)
    change: number;           // 涨跌额
    pct_chg: number;          // 涨跌幅
    vol: number;              // 成交量（手）
    amount: number;           // 成交额（千元）
    turnover_rate: number;    // 换手率（%）
    turnover_rate_f: number;  // 换手率（自由流通股）
    volume_ratio: number;     // 量比
    pe: number;               // 市盈率
    pe_ttm: number;           // 市盈率（TTM）
    pb: number;               // 市净率
    ps: number;               // 市销率
    ps_ttm: number;           // 市销率（TTM）
    dv_ratio: number;         // 股息率（%）
    dv_ttm: number;           // 股息率（TTM）（%）
    total_share: number;      // 总股本（万股）
    float_share: number;      // 流通股本（万股）
    free_share: number;       // 自由流通股本（万）
    total_mv: number;         // 总市值（万元）
    circ_mv: number;          // 流通市值（万元）
    adj_factor: number;       // 复权因子
    // 技术指标
    asi_bfq: number;          // 振动升降指标
    asi_hfq: number;
    asi_qfq: number;
    asit_bfq: number;
    asit_hfq: number;
    asit_qfq: number;
    atr_bfq: number;         // 真实波动N日平均值
    atr_hfq: number;
    atr_qfq: number;
    bbi_bfq: number;         // BBI多空指标
    bbi_hfq: number;
    bbi_qfq: number;
    bias1_bfq: number;       // BIAS乖离率
    bias1_hfq: number;
    bias1_qfq: number;
    bias2_bfq: number;
    bias2_hfq: number;
    bias2_qfq: number;
    bias3_bfq: number;
    bias3_hfq: number;
    bias3_qfq: number;
    boll_lower_bfq: number;  // BOLL指标
    boll_lower_hfq: number;
    boll_lower_qfq: number;
    boll_mid_bfq: number;
    boll_mid_hfq: number;
    boll_mid_qfq: number;
    boll_upper_bfq: number;
    boll_upper_hfq: number;
    boll_upper_qfq: number;
    brar_ar_bfq: number;     // BRAR情绪指标
    brar_ar_hfq: number;
    brar_ar_qfq: number;
    brar_br_bfq: number;
    brar_br_hfq: number;
    brar_br_qfq: number;
    cci_bfq: number;         // CCI顺势指标
    cci_hfq: number;
    cci_qfq: number;
    cr_bfq: number;          // CR价格动量指标
    cr_hfq: number;
    cr_qfq: number;
    dfma_dif_bfq: number;    // 平行线差指标
    dfma_dif_hfq: number;
    dfma_dif_qfq: number;
    dfma_difma_bfq: number;
    dfma_difma_hfq: number;
    dfma_difma_qfq: number;
    dmi_adx_bfq: number;     // 动向指标
    dmi_adx_hfq: number;
    dmi_adx_qfq: number;
    dmi_adxr_bfq: number;
    dmi_adxr_hfq: number;
    dmi_adxr_qfq: number;
    dmi_mdi_bfq: number;
    dmi_mdi_hfq: number;
    dmi_mdi_qfq: number;
    dmi_pdi_bfq: number;
    dmi_pdi_hfq: number;
    dmi_pdi_qfq: number;
    downdays: number;        // 连跌天数
    updays: number;          // 连涨天数
    dpo_bfq: number;         // 区间震荡线
    dpo_hfq: number;
    dpo_qfq: number;
    madpo_bfq: number;
    madpo_hfq: number;
    madpo_qfq: number;
    ema_bfq_5: number;       // 指数移动平均
    ema_bfq_10: number;
    ema_bfq_20: number;
    ema_bfq_30: number;
    ema_bfq_60: number;
    ema_bfq_90: number;
    ema_bfq_250: number;
    ema_hfq_5: number;
    ema_hfq_10: number;
    ema_hfq_20: number;
    ema_hfq_30: number;
    ema_hfq_60: number;
    ema_hfq_90: number;
    ema_hfq_250: number;
    ema_qfq_5: number;
    ema_qfq_10: number;
    ema_qfq_20: number;
    ema_qfq_30: number;
    ema_qfq_60: number;
    ema_qfq_90: number;
    ema_qfq_250: number;
    emv_bfq: number;         // 简易波动指标
    emv_hfq: number;
    emv_qfq: number;
    maemv_bfq: number;
    maemv_hfq: number;
    maemv_qfq: number;
    expma_12_bfq: number;    // EMA指数平均数指标
    expma_12_hfq: number;
    expma_12_qfq: number;
    expma_50_bfq: number;
    expma_50_hfq: number;
    expma_50_qfq: number;
    kdj_bfq: number;         // KDJ指标
    kdj_hfq: number;
    kdj_qfq: number;
    kdj_d_bfq: number;
    kdj_d_hfq: number;
    kdj_d_qfq: number;
    kdj_k_bfq: number;
    kdj_k_hfq: number;
    kdj_k_qfq: number;
    ktn_down_bfq: number;    // 肯特纳交易通道
    ktn_down_hfq: number;
    ktn_down_qfq: number;
    ktn_mid_bfq: number;
    ktn_mid_hfq: number;
    ktn_mid_qfq: number;
    ktn_upper_bfq: number;
    ktn_upper_hfq: number;
    ktn_upper_qfq: number;
    lowdays: number;         // 最低价天数
    topdays: number;         // 最高价天数
    ma_bfq_5: number;        // 简单移动平均
    ma_bfq_10: number;
    ma_bfq_20: number;
    ma_bfq_30: number;
    ma_bfq_60: number;
    ma_bfq_90: number;
    ma_bfq_250: number;
    ma_hfq_5: number;
    ma_hfq_10: number;
    ma_hfq_20: number;
    ma_hfq_30: number;
    ma_hfq_60: number;
    ma_hfq_90: number;
    ma_hfq_250: number;
    ma_qfq_5: number;
    ma_qfq_10: number;
    ma_qfq_20: number;
    ma_qfq_30: number;
    ma_qfq_60: number;
    ma_qfq_90: number;
    ma_qfq_250: number;
    macd_bfq: number;        // MACD指标
    macd_hfq: number;
    macd_qfq: number;
    macd_dea_bfq: number;
    macd_dea_hfq: number;
    macd_dea_qfq: number;
    macd_dif_bfq: number;
    macd_dif_hfq: number;
    macd_dif_qfq: number;
    mass_bfq: number;        // 梅斯线
    mass_hfq: number;
    mass_qfq: number;
    ma_mass_bfq: number;
    ma_mass_hfq: number;
    ma_mass_qfq: number;
    mfi_bfq: number;         // MFI指标
    mfi_hfq: number;
    mfi_qfq: number;
    mtm_bfq: number;         // 动量指标
    mtm_hfq: number;
    mtm_qfq: number;
    mtmma_bfq: number;
    mtmma_hfq: number;
    mtmma_qfq: number;
    obv_bfq: number;         // 能量潮指标
    obv_hfq: number;
    obv_qfq: number;
    psy_bfq: number;         // PSY心理线指标
    psy_hfq: number;
    psy_qfq: number;
    psyma_bfq: number;
    psyma_hfq: number;
    psyma_qfq: number;
    roc_bfq: number;         // ROC变动率指标
    roc_hfq: number;
    roc_qfq: number;
    maroc_bfq: number;
    maroc_hfq: number;
    maroc_qfq: number;
    rsi_bfq_6: number;       // RSI指标
    rsi_bfq_12: number;
    rsi_bfq_24: number;
    rsi_hfq_6: number;
    rsi_hfq_12: number;
    rsi_hfq_24: number;
    rsi_qfq_6: number;
    rsi_qfq_12: number;
    rsi_qfq_24: number;
    taq_down_bfq: number;    // 唐安奇通道指标
    taq_down_hfq: number;
    taq_down_qfq: number;
    taq_mid_bfq: number;
    taq_mid_hfq: number;
    taq_mid_qfq: number;
    taq_up_bfq: number;
    taq_up_hfq: number;
    taq_up_qfq: number;
    trix_bfq: number;        // TRIX三重指数平滑平均线
    trix_hfq: number;
    trix_qfq: number;
    trma_bfq: number;
    trma_hfq: number;
    trma_qfq: number;
    vr_bfq: number;          // VR容量比率
    vr_hfq: number;
    vr_qfq: number;
    wr_bfq: number;          // W&R威廉指标
    wr_hfq: number;
    wr_qfq: number;
    wr1_bfq: number;
    wr1_hfq: number;
    wr1_qfq: number;
    xsii_td1_bfq: number;    // 薛斯通道II
    xsii_td1_hfq: number;
    xsii_td1_qfq: number;
    xsii_td2_bfq: number;
    xsii_td2_hfq: number;
    xsii_td2_qfq: number;
    xsii_td3_bfq: number;
    xsii_td3_hfq: number;
    xsii_td3_qfq: number;
    xsii_td4_bfq: number;
    xsii_td4_hfq: number;
    xsii_td4_qfq: number;
}

/**
 * 股票技术面因子API实现(专业版)
 */
export class StkFactorProAPI extends BaseAPI<StkFactorProParams, StkFactorProData[]> {
    readonly apiName = 'stk_factor_pro';

    readonly requestParams: RequestParamSpec[] = [
        {
            name: 'ts_code',
            type: 'string',
            required: false,
            description: '股票代码'
        },
        {
            name: 'trade_date',
            type: 'string',
            required: false,
            description: '交易日期'
        },
        {
            name: 'start_date',
            type: 'string',
            required: false,
            description: '开始日期'
        },
        {
            name: 'end_date',
            type: 'string',
            required: false,
            description: '结束日期'
        },
        {
            name: 'fields',
            type: 'string',
            required: false,
            description: '需要返回的字段列表'
        }
    ];

    readonly defaultFields = [
        'ts_code',
        'trade_date',
        'open',
        'high',
        'low',
        'close',
        'pre_close',
        'change',
        'pct_chg',
        'vol',
        'amount'
    ];

    /**
     * 获取股票技术面因子数据
     * @param options 请求参数
     * @returns 股票技术面因子数据列表
     */
    async getData(options: StkFactorProParams): Promise<StkFactorProData[]> {
        // 验证参数
        this.validateParams(options);

        // 提取fields参数
        const { fields, ...params } = options;

        // 使用fields字符串或默认字段字符串
        const fieldsStr = fields || this.defaultFields.join(',');

        // 发送请求
        const response = await getHttpClient().post<{
            fields: string[];
            items: any[][];
        }>(this.apiName, params, fieldsStr);

        // 将数组数据转换为对象数组
        return response.items.map(item => {
            const result: any = {};
            response.fields.forEach((field, index) => {
                result[field] = item[index];
            });
            return result as StkFactorProData;
        });
    }
}

// 导出API类型
export type StkFactorProAPIType = (params: StkFactorProParams) => Promise<StkFactorProData[]>;
