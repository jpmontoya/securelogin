exports.statusServer = async (req, res) => {
    return res.status(200).send({
        error: false,
        message: 'PONG'
    })
}