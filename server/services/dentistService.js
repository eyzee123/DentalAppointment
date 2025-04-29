const dentistRepository = require('../repositories/dentistRepository');


const getDentists = async () => {
  const dentists = await dentistRepository.getAllDentist();
  return dentists;
};

module.exports = {
    getDentists,
};
  