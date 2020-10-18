const request = require("request");

let bFields = request.get("https://basketball-fields.herokuapp.com/api/basketball-fields", {json: true}, (err, res, body) => {
    if (err) {
        return console.log(err);
    }
    return body;
})

const findById = (id) => {
    return bFields.response.body.find(b => b.id === id);
}

module.exports = {
    BasketballFields: bFields,
    findById
}
