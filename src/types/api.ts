/**
 * 请求参数规范
 */
export interface RequestParamSpec {
    name: string;             // 参数名称
    type: string;             // 参数类型
    required: boolean;        // 是否必填
    default?: any;           // 默认值
    description: string;      // 参数描述
    validator?: (value: any) => boolean;  // 参数验证函数
}

/**
 * API接口规范
 */
export interface IDataAPI<RequestParams, ResponseData> {
    /**
     * API名称
     */
    readonly apiName: string;

    /**
     * 请求参数规范
     */
    readonly requestParams: RequestParamSpec[];

    /**
     * 默认返回字段列表
     */
    readonly defaultFields: string[];

    /**
     * 获取数据的通用方法
     * @param options 请求参数
     */
    getData(options: RequestParams): Promise<ResponseData>;

    /**
     * 验证请求参数
     * @param options 请求参数
     */
    validateParams(options: RequestParams): void;
}
