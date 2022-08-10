const { Client } = require('pg');
const CONNECTION_STRING =
    process.env.DATABASE_URL ||
    // 'postgres://localhost:5432/user-tests'
    'postgres://localhost:5444/user-tests'
const client = new Client(CONNECTION_STRING);

const users = [
    { name: 'Zanzibar Buck' },
    { name: 'Chris P. Bacon' },
    { name: 'Lord Voldemort' }
];

const createTable = async () => {
    await client.query(`
        DROP TABLE IF EXISTS users;
    `)

    await client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL
        );
    `);
}

const createUser = async (user) => {
    // { name: 'Zanzibar Buck' }

    const data = await client.query(`
        INSERT INTO users(name)
        VALUES ($1)
        RETURNING *;
    `, [user.name])

    const createdUser = data.rows[0];
    return createdUser;
};

const getUserById = async (userId) => {
    const data = await client.query(`
        SELECT *
        FROM users
        WHERE id=$1;
    `, [userId]);

    const user = data.rows[0];
    return user
}

module.exports = {
    client,
    users,
    createTable,
    createUser,
    getUserById
};