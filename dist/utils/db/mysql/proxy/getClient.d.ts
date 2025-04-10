import { ConnectionOptions } from 'mysql2/promise';
import { RDSAuroraMySQLProxyClientOptions } from '../../../../types/aws';
declare const getClient: (connOptions?: ConnectionOptions, clientOpts?: RDSAuroraMySQLProxyClientOptions) => Promise<import("mysql2/promise").Pool>;
export default getClient;
