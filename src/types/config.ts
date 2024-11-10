// API配置类型定义
export interface MinuteConfig {
    api_name: string;
    freq: string;
    defaultFields: string;
}

export interface KLineConfig {
    api_name: string;
    defaultFields: string;
}

export interface APIConfig {
    kline: {
        minutes: {
            [key: string]: MinuteConfig;
        };
        daily: KLineConfig;
        weekly: KLineConfig;
        monthly: KLineConfig;
        yearly: KLineConfig;
    };
}

// 客户端配置类型定义
export interface ClientConfig {
    token: string;
    baseURL?: string;
}
