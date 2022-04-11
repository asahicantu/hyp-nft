import { Console } from 'console';
import *  as Nano from 'nano';
class DBService {
  nano: Nano.ServerScope;
  db: Nano.DocumentScope<unknown>;
  constructor() {
    const port = process.env.SRV_DB_PORT as string;
    const host = process.env.SRV_DB_URL as string;
    const user = process.env.SRV_DB_USER_ID as string;
    const pw = process.env.SRV_DB_USER_PW as string;
    const url = `http://${user}:${pw}@${host}:${port}`;
    const dbname = process.env.SRV_DB_DBNAME as string;
    this.nano = Nano.default(url);
    //Build default database at runtime
    this.nano.db.list()
      .then((dbs: string[]) => {
        if (!dbs.includes(dbname)) {
          console.log(`Database ${dbname} not exists, creating....`);
          this.createDb(dbname)
        }
      }).finally(() => {
        this.db = this.nano.db.use(dbname);
        console.log(`Database ${dbname} connected!`);
      });
  }

  async createDb(dbName: string): Promise<Nano.DatabaseCreateResponse | string> {
    try {
      console.log(`Datavase ${dbName} created`);
      return await this.nano.db.create(dbName);
    }
    catch {
      const msg = `Database ${dbName} already exists`;
      console.log(msg)
      return msg;
    }
  }

  async dbInfo(): Promise<Nano.InfoResponse> {
    return await this.nano.info();
  }

  async registerOrg(connectionConfig: object): Promise<Nano.DocumentInsertResponse | unknown> {
    try {
      const response = await this.db.insert(connectionConfig);
      return response;
    }
    catch (error) {
      return error;
    }
  }

  async GetConnectionConfig(orgConfig: string): Promise<unknown> {
    {
      const val: Nano.DocumentGetResponse = await this.db.get(orgConfig);
      return val;
    }
  }

}
export default DBService;