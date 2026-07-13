export function getDbConfig(databaseName?: string) {
  const db = process.env.DB_SERVER ? {
    Server: process.env.DB_SERVER,
    User: process.env.DB_USER,
    Pass: process.env.DB_PASS,
    Name: [process.env.DB_NAME]
  } : null;

  if (!db) {
    throw new Error('Database configuration not found in runsettings.');
  }

  const envDatabaseName = `${databaseName}-${process.env.ENVIRONMENT?.toUpperCase()}`;
  const selectedDb = databaseName ? envDatabaseName : db.Name[0];

  return {
    user: db.User,
    password: db.Pass,
    server: db.Server,
    database: selectedDb,
    options: {
      encrypt: true,
      trustServerCertificate: true,
    },
  };
}
