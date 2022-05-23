const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

class Database {
    db = null;

    connect = async () => {
        this.db = await open({
            filename: './database.db',
            driver: sqlite3.Database
        })
    }

    createTable = () => {
        this.db.exec(`CREATE TABLE IF NOT EXISTS RECORDS
                      (
                          id       integer PRIMARY KEY AUTOINCREMENT,
                          fileHash text unique not null,
                          length   integer default 0,
                          emotion  text
                      )`)
    }

    insertUnprocessedEntry = async (filehash, length) => {
        this.db.run(`
            INSERT INTO RECORDS
            VALUES (NULL, '${filehash}', '${length}', NULL)
        `)
    }
    updateEmotion = async (filehash, emotion) => {
        this.db.run(`
            UPDATE  RECORDS
            SET emotion = '${emotion}'
            WHERE fileHash = '${filehash}';
        `)
    }
}

module.exports = Database;

