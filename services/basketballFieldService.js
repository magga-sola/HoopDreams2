var request = require('request');


var bbFields = request.get('herokulink-here', {json: true}, (err, res, body) => {
    if(err) { return console.log(err); }
    return body;
});

const findById = (id) => {
    return bbFields.response.body.find(s => s.id === id);
}

module.exports = {
    basketballFields: bbFields,
    findById
};