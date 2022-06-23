import { juggler, AnyObject } from '@loopback/repository';
export declare class RecommenderGrpcDataSource extends juggler.DataSource {
    static readonly dataSourceName: string;
    static readonly defaultConfig: {
        name: string;
        connector: string;
        url: string;
        spec: string;
    };
    constructor(dsConfig?: AnyObject);
    private static getProtoFile;
}
