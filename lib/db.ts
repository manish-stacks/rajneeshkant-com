import mysql from "mysql2/promise";

/**
 * Shared MySQL connection pool. Reused across hot-reloads in dev via globalThis
 * so we don't exhaust connections. Reads standard MYSQL_* env vars.
 */
const globalForDb = globalThis as unknown as { _mysqlPool?: mysql.Pool };

export const pool =
  globalForDb._mysqlPool ||
  mysql.createPool({
    host: process.env.MYSQL_HOST || "127.0.0.1",
    port: Number(process.env.MYSQL_PORT || 3306),
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "",
    database: process.env.MYSQL_DATABASE || "drrajneeshkant",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    charset: "utf8mb4_unicode_ci",
    dateStrings: true,
  });

if (process.env.NODE_ENV !== "production") globalForDb._mysqlPool = pool;

/** Run a SELECT and return typed rows. */
export async function query<T = any>(
  sql: string,
  params: any[] = []
): Promise<T[]> {
  const [rows] = await pool.query(sql, params);
  return rows as T[];
}

/** Run a SELECT and return the first row or null. */
export async function queryOne<T = any>(
  sql: string,
  params: any[] = []
): Promise<T | null> {
  const rows = await query<T>(sql, params);
  return rows[0] ?? null;
}

/** Run an INSERT/UPDATE/DELETE and return the OkPacket (insertId, affectedRows). */
export async function execute(
  sql: string,
  params: any[] = []
): Promise<mysql.ResultSetHeader> {
  const [result] = await pool.execute(sql, params);
  return result as mysql.ResultSetHeader;
}
