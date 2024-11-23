/**
 * 基础API实现类
 */
import { IDataAPI, RequestParamSpec } from '../types/api';

export abstract class BaseAPI<RequestParams, ResponseData> implements IDataAPI<RequestParams, ResponseData> {
    /**
     * API名称
     */
    abstract readonly apiName: string;

    /**
     * 请求参数规范
     */
    abstract readonly requestParams: RequestParamSpec[];

    /**
     * 默认返回字段列表
     */
    abstract readonly defaultFields: string[];

    /**
     * 验证请求参数
     * @param options 请求参数
     */
    validateParams(options: RequestParams): void {
        // 遍历所有参数规范进行验证
        this.requestParams.forEach(param => {
            const value = (options as any)[param.name];
            
            // 检查必填参数
            if (param.required && value === undefined) {
                throw new Error(`参数 ${param.name} 是必填项`);
            }

            // 如果有值且有验证函数，则进行验证
            if (value !== undefined && param.validator && !param.validator(value)) {
                throw new Error(`参数 ${param.name} 验证失败`);
            }
        });
    }

    /**
     * 获取数据的抽象方法，需要子类实现
     * @param options 请求参数
     */
    abstract getData(options: RequestParams): Promise<ResponseData>;
}
