const pool = require('./pool');
const bcrypt = require("bcryptjs");

// POSTS:
async function getAllPosts(){
    const {rows} = await pool.query("SELECT * FROM posts");
    if(rows.length < 1){
        return null;
    }
    return rows;
}

async function getOnePost(id) {
    const {rows} = await pool.query('SELECT * FROM posts WHERE id = $1',[id]);
    if(rows.length < 1){
        return null;
    }
    return rows[0];
}


// USERS
async function addUserToDB(username, fullname, password) {
    const password_hash = await bcrypt.hash(password,10);
    try {
        await pool.query("INSERT INTO users (username, full_name, password_hash) VALUES ($1, $2, $3)",
            [username, fullname, password_hash]
        );
        console.log("Status: Success");
        return true;
    } catch (err) {
        console.error("Status: Failed", err.message);
        return false;
    }
};

async function checkUserExistence(username) {
    const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    return rows[0];
};


async function testDB() {
    const { rows } = await pool.query("SELECT * FROM users");
    console.log(rows);
    return rows;
}

module.exports = {
    getAllPosts,
    getOnePost,
    checkUserExistence,
    addUserToDB,
    testDB,
}