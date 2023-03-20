import mysql from 'mysql'


export const db = mysql.createPool({
    connectionLimit: 10,
    acquireTimeout: 10000,
    host: "89.117.169.15",
    user: "u457975983_Omar",
    password: "Omar1234$",
    database: "u457975983_4xfrenchies"
})

// export const db = mysql.createPool({
//     connectionLimit: 10,
//     acquireTimeout: 10000,
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "4xfrenchies"
// })
db.on('connection', function (connection) {
    console.log('db connected')
    connection.on('error', function (err) {
        console.log(new Date(), 'MySQL Error', err.code);
    });
    connection.on('close', function (err) {
        console.error(new Date(), 'MySQL Closse', err);
    });
});

