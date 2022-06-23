import { Product } from '../models';
import { Provider, BindingTemplate } from '@loopback/context';
/**
 * Interface for recommendation service
 */
export interface RecommenderService {
    getProductRecommendations(userId: string): Promise<Product[]>;
}
export declare const RECOMMENDER_SERVICE = "RecommenderService";
/**
 * A binding template for recommender service extensions
 */
export declare function recommender(protocol: string): BindingTemplate<unknown>;
/**
 * A facade recommender service that selects RESt or gRPC protocol based on
 * the value of `RECOMMENDER_PROTOCOL` environment variable
 */
export declare class RecommenderServiceProvider implements Provider<RecommenderService> {
    private recommenderServices;
    constructor(recommenderServices: RecommenderService[]);
    value(): RecommenderService;
}
