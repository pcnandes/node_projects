'use strict';
exports.list_all = function(req, res) {
    res.status(200).json(['item1', 'item2', 'item3', 'item4', 'item5']);
 };