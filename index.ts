
import { Client } from 'pg'

export default class PaynetDB {
    _client: any

    constructor() {
        this.openSession(Client)
    }

    async openSession(pgClient: any) {
        let dbClientOptions = {
            host: "database-1-raycon.crxfdpkicxxy.sa-east-1.rds.amazonaws.com",
            port: 5432,
            user: "postgres",
            password: "65anNObg5hcMexOfsPUq",
            database: "postgres",
            ssl: false,
        }
        if (!pgClient) throw 'You need to define an pgClient'
        else {
            try {
                console.log(dbClientOptions);
                this._client = new Client(dbClientOptions)
                await this._client.connect()

                for (let index = 0; index < 10; index++) {
                    const query = {
                        text: 'INSERT INTO users(name, pass) VALUES($1, $2)',
                        values: ['insert ' + index, '123456'],
                    }

                    console.log(query);
                    // callback
                    this._client.query(query, (err: any, res:any) => {
                        if (err) {
                            console.log(err.stack)
                        } else {
                            console.log(res.rows[0])
                        }
                    })
                }

                const resDB = await this._client.query('SELECT * from users')
                console.log(resDB.rows);

                this._client.end();
            } catch (error) {
                console.log(error);
            }
        }
    }
}

new PaynetDB();
