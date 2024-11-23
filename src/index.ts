import { initHttpClient } from './utils/http';
export { stockBasicAPI } from './api/stock_basic';
export type { StockBasicParams, StockBasicData } from './api/stock_basic';

/**
 * 初始化Tushare API客户端
 * @param token API token
 * @param baseUrl 可选的基础URL
 */
export function init(token: string, baseUrl?: string) {
    initHttpClient(token, baseUrl);
}
