const dentistService = require('../services/dentistService');

const getDentists = async(req, res) => {
    try {
        const dentists = await dentistService.getDentists();
        return res.status(200).json(dentists);
    } catch (err) {
        console.error(err);
        return res.status(400).json({ error: err.message });
    }
}

module.exports = {
    getDentists,
  };
  