import { Model } from '@loopback/repository';
export declare class KeyAndPassword extends Model {
    resetKey: string;
    password: string;
    confirmPassword: string;
    constructor(data?: Partial<KeyAndPassword>);
}
export interface KeyAndPasswordRelations {
}
export declare type KeyAndPasswordWithRelations = KeyAndPassword & KeyAndPasswordRelations;
