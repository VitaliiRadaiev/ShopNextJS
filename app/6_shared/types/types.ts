export interface IDefaultResponse<T> {
    resultCode: number;
    data?: T;
    message?: string;
}
