import * as sqlite3 from "sqlite3";
import { open, Database } from "sqlite";


class DB {
    db: Database;

    connect = async (): Promise<void> => {
        this.db = await open({
            filename: './database.db',
            driver: sqlite3.Database
        })
    }

    createTable = async (): Promise<void> => {
        await this.db.exec(`CREATE TABLE IF NOT EXISTS RECORDS
                      (
                          id       integer PRIMARY KEY AUTOINCREMENT,
                          fileHash text unique not null,
                          length   integer default 0,
                          emotion  text,
                          gender text not null default 'male'
                      )`)
    }

    insertUnprocessedEntry = async (filehash, length): Promise<void> => {
        await this.db.run(`
            INSERT INTO RECORDS
            VALUES (NULL, '${filehash}', '${length}', NULL, NULL)
        `)
    }

    updateResult = async (filehash: string, {emotion, gender}: {emotion: string, gender: string}): Promise<void> => {
        await this.db.run(`
            UPDATE RECORDS
            SET emotion = '${emotion}',
            gender = '${gender}'
            WHERE fileHash = '${filehash}';
        `)
    }
}
export default DB;


