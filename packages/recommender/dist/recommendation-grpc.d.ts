import { GrpcObject, Server } from '@grpc/grpc-js';
export declare const PROTO_PATH: string;
export declare function loadRecommendationService(): GrpcObject;
/**
 * Get a new server with the handler functions in this file bound to the methods
 * it serves.
 * @return The new server object
 */
export declare function createGRPCRecommendationServer(port?: string): Promise<{
    server: Server;
    port: number;
}>;
export declare function grpcMain(port?: string): Promise<{
    server: Server;
    port: number;
}>;
