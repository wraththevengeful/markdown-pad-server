CREATE TABLE users(
    id SERIAL, 
    username VARCHAR(20) UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY(id)
);

CREATE TABLE posts(
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

CREATE TABLE comments(
    id SERIAL,
    post_id INT REFERENCES posts(id) ON DELETE CASCADE, 
    full_name TEXT NOT NULL, 
    comment_body TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (id)
);