
const helper = {};

helper.auth = async(req, res) => {
    return req.session.data;
}

module.exports = helper;