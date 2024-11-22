import KLINE_CONFIG from './kline.config';
import { API_NAME, DEFAULT_FIELDS } from './stock.config';

export {
    KLINE_CONFIG,
    API_NAME,
    DEFAULT_FIELDS
};

// 为了保持向后兼容，默认导出K线配置
export default KLINE_CONFIG;
