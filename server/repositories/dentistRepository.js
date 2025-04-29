const pool = require('../config/db');
const Dentist = require('../models/DentistModel');

const getAllDentist = async () => {
  const { rows } = await pool.query('SELECT * FROM dentists');
  const dentists = rows.map(row => new Dentist(row));
  return dentists;
};


module.exports = {
    getAllDentist,
};