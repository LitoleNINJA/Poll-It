CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    email TEXT UNIQUE,
    username TEXT UNIQUE,
    user_password TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (email, username, user_password) VALUES ('anonymous@gmail.com', 'Anonymous', 'anonymous123');
INSERT INTO users (email, username, user_password) VALUES ('john@gmail.com', 'John', 'john123');

CREATE TABLE IF NOT EXISTS poll (
    id SERIAL PRIMARY KEY,
    question TEXT,
    visibility TEXT,
    settings TEXT,
    username TEXT,
    voters TEXT [],
    total_votes INT,
    url TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (username) REFERENCES users(username)
);

INSERT INTO poll (question, visibility, settings, username, voters, total_votes, url) VALUES ('What is your favorite color?', 'public', '', 'John', '{}', 0, 'customUrl@123');

CREATE TABLE IF NOT EXISTS poll_options (
    id SERIAL PRIMARY KEY,
    option_text TEXT,
    votes INT,
    poll_id INT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (poll_id) REFERENCES poll(id)
);

INSERT INTO poll_options (option_text, votes, poll_id) VALUES ('Red', 0, 1);
INSERT INTO poll_options (option_text, votes, poll_id) VALUES ('Blue', 0, 1);
INSERT INTO poll_options (option_text, votes, poll_id) VALUES ('Green', 0, 1);
INSERT INTO poll_options (option_text, votes, poll_id) VALUES ('Yellow', 0, 1);

CREATE TABLE IF NOT EXISTS comments (
    id SERIAL PRIMARY KEY,
    comment_text TEXT,
    poll_id INT,
    username TEXT,
    FOREIGN KEY (poll_id) REFERENCES poll(id),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (username) REFERENCES users(username)
);
