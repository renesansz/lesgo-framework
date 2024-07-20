import getClient from './getClient';
import query from './query';
export { getClient, query };
declare const _default: {
    getClient: ({ secretArn, resourceArn, databaseName, region, singletonConn, }: import("./getClient").GetClientOptions) => {
        client: import("@aws-sdk/client-rds-data").RDSDataClient;
        params: {
            secretArn: string | undefined;
            resourceArn: string | undefined;
            database: string | undefined;
        };
    };
    query: (sql: string, opts: import("./query").QueryOptions) => Promise<import("@aws-sdk/client-rds-data").ExecuteStatementCommandOutput>;
};
export default _default;
