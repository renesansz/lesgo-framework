export interface QueryOptions {
    secretArn?: string;
    resourceArn?: string;
    databaseName?: string;
    singletonConn?: string;
    region?: string;
}
export interface QueryServiceOptions {
    sql: string;
    secretArn?: string;
    resourceArn?: string;
    databaseName?: string;
    singletonConn: string;
    region: string;
}
declare const query: (sql: string, opts?: QueryOptions) => Promise<import("@aws-sdk/client-rds-data").ExecuteStatementCommandOutput>;
export default query;
