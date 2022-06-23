import { User } from '../models';
import { SentMessageInfo } from 'nodemailer';
export declare class EmailService {
    /**
     * If using gmail see https://nodemailer.com/usage/using-gmail/
     */
    private static setupTransporter;
    sendResetPasswordMail(user: User): Promise<SentMessageInfo>;
}
