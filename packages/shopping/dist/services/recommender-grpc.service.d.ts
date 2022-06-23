import { Provider } from '@loopback/core';
import { RecommenderGrpcDataSource } from '../datasources';
import { Product } from '../models';
import { RecommenderService } from './recommender.service';
export interface RecommenderGrpc {
    recommend(req: {
        userId: string;
    }): Promise<{
        products: Product[];
    }>;
}
/**
 * gRPC based recommender service
 */
export declare class RecommenderGrpcServiceProvider implements Provider<RecommenderService> {
    protected dataSource: RecommenderGrpcDataSource;
    constructor(dataSource?: RecommenderGrpcDataSource);
    value(): Promise<RecommenderService>;
}
