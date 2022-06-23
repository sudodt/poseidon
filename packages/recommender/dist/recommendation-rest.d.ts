import { HttpServer } from '@loopback/http-server';
export declare function createRecommendationServer(port?: number, host?: string | undefined): HttpServer;
export declare function restMain(port?: number, host?: string | undefined): Promise<HttpServer>;
