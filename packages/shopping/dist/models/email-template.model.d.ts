import { Model } from '@loopback/repository';
export declare class EmailTemplate extends Model {
    from: string;
    to: string;
    subject: string;
    text: string;
    html: string;
    constructor(data?: Partial<EmailTemplate>);
}
export interface EmailTemplateRelations {
}
export declare type EmailTemplateWithRelations = EmailTemplate & EmailTemplateRelations;
