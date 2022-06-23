import { ValueOrPromise } from '@loopback/core';
import { juggler, AnyObject } from '@loopback/repository';
export declare class RedisDataSource extends juggler.DataSource {
    static readonly dataSourceName: string;
    static readonly defaultConfig: {
        name: string;
        connector: string;
        host: string;
        port: number;
        password: string;
        db: number;
    };
    constructor(dsConfig?: AnyObject);
    /**
     * Disconnect the datasource when application is stopped. This allows the
     * application to be shut down gracefully.
     */
    stop(): ValueOrPromise<void>;
}
