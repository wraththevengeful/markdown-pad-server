# markdown-pad-server documentation:

## Database Schema

### users table where user details are stored:
```
CREATE TABLE IF NOT EXISTS users(
    id SERIAL, 
    username VARCHAR(20) UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    isAdmin BOOLEAN default false,
    PRIMARY KEY(id)
);

-- Example inserts
INSERT INTO users (username, full_name, password_hash) VALUES ('wraththevengeful', 'Elanchezhiyan E', 'poornashreethirumalai');
```

### posts table where posts are stored
```
CREATE TABLE IF NOT EXISTS posts(
    id SERIAL, 
    username VARCHAR(20) NOT NULL, 
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL, 
    created_at TIMESTAMPTZ DEFAULT NOW(),
    published_state BOOLEAN DEFAULT FALSE,
    PRIMARY KEY(id),
    FOREIGN KEY (username) REFERENCES users(username) ON UPDATE CASCADE
);

-- Example inserts;
INSERT INTO posts (username, title, content, category, description) VALUES
('wraththevengeful', 'A Test post', 'This is a test post so if youre reading this, congrats youre probably one of the alpha testers', 'Humour', 'Again, a test post!');
```

### comments table to store comments for every post
```
CREATE TABLE IF NOT EXISTS comments(
    id SERIAL,
    post_id INT REFERENCES posts(id) ON DELETE CASCADE, 
    full_name TEXT NOT NULL, 
    comment_body TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (id)
);
```

## Queries:

### Users queries:

- post a new user (sign up)
- login (receives a token)

### Posts Queries:

Typical queries on `posts` table include:

- get all posts
- get a single post based on ID
- write a new post (requires authorization using JWT)
- publish a post to be visible (requires admin level authorization)


## Authorization and Authentication

### Passport JS

- Passport JS is used with local strategy to verify user presence in the DB.
- passport.authenticate() is later used as middleware to verify and issue JWT tokens

### jsonwebtoken

- Issues JSON Web Tokens