const { Client } = require("pg");
require('dotenv').config();

const SQL = `
    DROP TABLE IF EXISTS users, messages, "session";
    
    CREATE TABLE IF NOT EXISTS users (
        user_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        username VARCHAR(50) NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL,
        member_status BOOLEAN DEFAULT false,
        admin_status BOOLEAN DEFAULT false
    );
    
    INSERT INTO users (first_name, last_name, username, email, password)
        VALUES (
            'TestFirst', 
            'TestLast', 
            'TestUsername', 
            'test@email.com', 
            'badpassword'
        );
    

    CREATE TABLE IF NOT EXISTS messages (
        message_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        message_title VARCHAR(50) NOT NULL,
        message_text TEXT NOT NULL,
        timestamp TEXT NOT NULL,
        user_id INTEGER NOT NULL REFERENCES users (user_id)
    );
    
    INSERT INTO messages (message_title, message_text, timestamp, user_id)
        VALUES (
            'Test Title',
            'This is test message text',
            '12/31/1999 at 11:59:59 PM',
            '1'
        );

    CREATE TABLE IF NOT EXISTS "session" (
        "sid" varchar NOT NULL COLLATE "default",
        "sess" json NOT NULL,
        "expire" timestamp(6) NOT NULL
    )
    WITH (OIDS=FALSE);

    ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

    CREATE INDEX "IDX_session_expire" ON "session" ("expire");
`;

async function main() {
    console.log("seeding...");
    const client = new Client({
      connectionString: process.env.CONNECTION_STRING,
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
  }
  
  main().catch(err => {
    console.error('Error: ', err);
});