import { juggler, AnyObject } from '@loopback/repository';
export declare class RecommenderDataSource extends juggler.DataSource {
    static readonly dataSourceName: string;
    static readonly defaultConfig: {
        name: string;
        connector: string;
        crud: boolean;
        options: {
            headers: {
                accept: string;
                contentType: string;
            };
        };
        operations: {
            template: {
                method: string;
                url: string;
            };
            functions: {
                getProductRecommendations: string[];
            };
        }[];
    };
    constructor(dsConfig?: AnyObject);
}
