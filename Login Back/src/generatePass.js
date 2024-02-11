const bcrypt = require("bcrypt");

exports.genpass = async (req, res) => {
    const salt = await bcrypt.genSalt(15);
    res.send(await bcrypt.hash("12345678",salt));
}