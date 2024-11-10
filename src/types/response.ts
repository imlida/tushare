// API响应类型定义
export interface APIResponse<T = any> {
    code: number;
    msg: string;
    data: {
        fields: string[];
        items: T[];
    };
}
