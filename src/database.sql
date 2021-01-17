-- sudo psql -U postgres

CREATE DATABASE perntodo;

CREATE TABLE todo(
  todo_id SERIAL PRIMARY KEY,
  description varchar(255)
);

-- SELECT * FROM todo;
