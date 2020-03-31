var utils = require('../utils/writer.js');
var Topping = require('../service/ToppingService');

module.exports.addSandwich = function addTopping (req, res, next) {
    var body = req.swagger.params['body'].value;
    Topping.addTopping(body)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};