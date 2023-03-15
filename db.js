import mysql from 'mysql'

export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "4xfrenchies"
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

