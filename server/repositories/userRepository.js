const pool = require('../config/db');
const User = require('../models/UserModel');

const findUserByEmail = async (email) => {
  const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  const user = rows[0];
  return user ? new User(user) : null;
};

const createUser = async ({ name, email, password_hash, phone_number }) => {
  const query = `
    INSERT INTO users (name, email, password_hash, phone_number)
    VALUES ($1, $2, $3, $4)
    RETURNING id, name, email, phone_number, created_at;
  `;
  const values = [name, email, password_hash, phone_number];

  const { rows } = await pool.query(query, values);
  return new User(rows[0]);
};

const editUser = async ({name,email,phone_number},userId) => {
  const query = `
    UPDATE users set name=$2, email=$3, phone_number=$4 WHERE id=$1
    RETURNING id, name, email, phone_number, created_at;
  `;
  const values = [userId, name, email, phone_number];

  const { rows } = await pool.query(query, values);
  return new User(rows[0]);
};


module.exports = {
  findUserByEmail,
  createUser,
  editUser,
};
