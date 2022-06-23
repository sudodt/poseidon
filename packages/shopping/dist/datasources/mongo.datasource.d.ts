import { ValueOrPromise } from '@loopback/core';
import { juggler, AnyObject } from '@loopback/repository';
export declare class MongoDataSource extends juggler.DataSource {
    static readonly dataSourceName: string;
    static readonly defaultConfig: {
        name: string;
        connector: string;
        url: string;
        host: string;
        port: number;
        user: string;
        password: string;
        database: string;
        useNewUrlParser: boolean;
        useUnifiedTopology: boolean;
    };
    constructor(dsConfig?: AnyObject);
    /**
     * Disconnect the datasource when application is stopped. This allows the
     * application to be shut down gracefully.
     */
    stop(): ValueOrPromise<void>;
}
