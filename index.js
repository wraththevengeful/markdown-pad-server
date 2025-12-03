const express = require('express');
const app = express();
const passport = require('passport');
require('./auth/passport');
require('dotenv').config();


const db = require('./db/queries');
const postsRouter = require('./routes/posts');
const userRouter = require('./routes/users');

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// 1. Initialize passportJS
app.use(passport.initialize());


// Routes
app.use('/posts', postsRouter);
app.use('/users', userRouter);

const PORT = process.env.PORT;
console.log(PORT);

app.listen(PORT, (error)=>{
    if(error){
        throw error;
    }
    console.log(`Server up and running at port: `,PORT);
})