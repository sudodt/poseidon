import { Provider } from '@loopback/core';
import { RecommenderDataSource } from '../datasources/recommender.datasource';
import { RecommenderService } from './recommender.service';
/**
 * Rest based recommender service
 */
export declare class RecommenderRestServiceProvider implements Provider<RecommenderService> {
    protected datasource: RecommenderDataSource;
    constructor(datasource: RecommenderDataSource);
    value(): Promise<RecommenderService>;
}
