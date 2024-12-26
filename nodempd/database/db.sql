DROP TABLE IF EXISTS mpd.users;

CREATE TABLE mpd.users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(40),
    email TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO mpd.users (name, email)
    VALUES ('joe', 'joe@ibm.com'),
    ('ryan', 'ryan@faztweb.com');

select * from mpd.users;

CREATE TABLE mpd.ttdu (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(40),
    descripcion TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP NOT NULL,
    update_at TIMESTAMP NOT NULL
);

