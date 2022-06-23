import { TokenService, UserService } from '@loopback/authentication';
import { UserProfile } from '@loopback/security';
import { Product, ResetPasswordInit, User, KeyAndPassword } from '../models';
import { Credentials, UserRepository } from '../repositories';
import { PasswordHasher, RecommenderService, UserManagementService } from '../services';
export declare class NewUserRequest extends User {
    password: string;
}
export declare class UserManagementController {
    userRepository: UserRepository;
    recommender: RecommenderService;
    passwordHasher: PasswordHasher;
    jwtService: TokenService;
    userService: UserService<User, Credentials>;
    userManagementService: UserManagementService;
    constructor(userRepository: UserRepository, recommender: RecommenderService, passwordHasher: PasswordHasher, jwtService: TokenService, userService: UserService<User, Credentials>, userManagementService: UserManagementService);
    create(newUserRequest: NewUserRequest): Promise<User>;
    set(currentUserProfile: UserProfile, userId: string, user: User): Promise<void>;
    findById(userId: string): Promise<User>;
    printCurrentUser(currentUserProfile: UserProfile): Promise<User>;
    productRecommendations(userId: string): Promise<Product[]>;
    login(credentials: Credentials): Promise<{
        token: string;
    }>;
    forgotPassword(currentUserProfile: UserProfile, credentials: Credentials): Promise<{
        token: string;
    }>;
    resetPasswordInit(resetPasswordInit: ResetPasswordInit): Promise<string>;
    resetPasswordFinish(keyAndPassword: KeyAndPassword): Promise<string>;
}
