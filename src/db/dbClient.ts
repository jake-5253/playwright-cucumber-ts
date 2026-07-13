import sql from 'mssql';
import { getDbConfig } from './dbConfig';

export class DbClient {
  private pool: sql.ConnectionPool | null = null;

  constructor(private databaseName?: string) {}

  async connect() {
    if (!this.pool) {
      const config = getDbConfig(this.databaseName);
      this.pool = await sql.connect(config);
    }
    return this.pool;
  }

  async query<T = any>(query: string, params?: Record<string, any>): Promise<T[]> {
    const pool = await this.connect();
    const request = pool.request();

    if (params) {
      for (const key in params) {
        request.input(key, params[key]);
      }
    }

    const result = await request.query(query);
    return result.recordset as T[];
  }

  async close() {
    if (this.pool) {
      await this.pool.close();
      this.pool = null;
    }
  }
}
