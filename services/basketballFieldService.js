//const request = require("request")

allBasketballFields: async() => {
    request.get("https://basketball-fields.herokuapp.com/api/basketball-fields", (err, res, body) => {
    if (err) {
        return console.log(err)
    }
    return body
    })
}