export * from './types/api';
export * from './api/base';
export * from './api/stock_basic';

// 导出API实例
import { StockBasicAPI } from './api/stock_basic';

export const stockBasic = new StockBasicAPI();
