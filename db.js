import mysql from 'mysql'

export const db = mysql.createConnection({
    host: "89.117.169.15",
    user: "u457975983_Omar",
    password: "Omar1234$",
    database: "u457975983_4xfrenchies"
})

try{
    db.connect(function (err) {
        if (err) {
            console.log('Error occured in Database: ' + err);
        } else {
            console.log("Connected to Database");
        }
    });
}
catch(err){
    console.log(err)
}

