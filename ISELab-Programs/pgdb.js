
const { Pool } = require('pg');
const pool = new Pool({
user: 'postgres',
password: 'admin',
host: 'localhost',
port: '5432',
database: 'MyDB',
});
module.exports=pool;

/*  PgAdmin - Query-Tool

drop table users;

create table users( id serial primary key, name varchar(50) not null,email varchar(50) not null unique );

*/