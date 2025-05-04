const userService = require('../services/userService');
const Response = require('../models/ResponseModel');

const updateUser = async(req, res) => {
    const { name, email, phone_number } = req.body;
    const { userId } = req.params;

    try {
        const resp = await userService.updateUser({ name, email, phone_number },userId);
            console.log("resp",resp);
        const response1 = new Response({
            statusCode: 200,
            result: {
                success: true, 
                message: 'User updated successfully!',
                data: resp
            }
        });
        console.log("response",response1);
        return res.status(200).json(response1);
    } catch (err) {
        console.error(err);
        return res.status(400).json({ error: err.message });
    }
}

module.exports = {
    updateUser
};