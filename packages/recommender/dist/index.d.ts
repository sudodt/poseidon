export * from '@loopback/http-server';
export * from './recommendation-grpc';
export * from './recommendation-rest';
export declare function main(config?: {
    rest?: {
        host?: string;
        port?: number;
    };
    grpc?: {
        port?: string;
    };
}): Promise<void>;
