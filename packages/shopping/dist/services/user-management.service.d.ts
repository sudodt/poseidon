import { UserService } from '@loopback/authentication';
import { UserProfile } from '@loopback/security';
import { User, UserWithPassword } from '../models';
import { Credentials, UserRepository } from '../repositories';
import { PasswordHasher } from './hash.password.bcryptjs';
import { EmailService } from './email.service';
import { SentMessageInfo } from 'nodemailer';
export declare class UserManagementService implements UserService<User, Credentials> {
    userRepository: UserRepository;
    passwordHasher: PasswordHasher;
    emailService: EmailService;
    constructor(userRepository: UserRepository, passwordHasher: PasswordHasher, emailService: EmailService);
    verifyCredentials(credentials: Credentials): Promise<User>;
    convertToUserProfile(user: User): UserProfile;
    createUser(userWithPassword: UserWithPassword): Promise<User>;
    requestPasswordReset(email: string): Promise<SentMessageInfo>;
    /**
     * Checks user reset timestamp if its same day increase count
     * otherwise set current date as timestamp and start counting
     * For first time reset request set reset count to 1 and assign same day timestamp
     * @param user
     */
    updateResetRequestLimit(user: User): Promise<User>;
    /**
     * Ensures reset key is only valid for a day
     * @param user
     */
    validateResetKeyLifeSpan(user: User): Promise<User>;
}
