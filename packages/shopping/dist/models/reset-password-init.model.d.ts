import { Model } from '@loopback/repository';
export declare class ResetPasswordInit extends Model {
    email: string;
    constructor(data?: Partial<ResetPasswordInit>);
}
export interface ResetPasswordInitRelations {
}
export declare type ResetPasswordInitWithRelations = ResetPasswordInit & ResetPasswordInitRelations;
