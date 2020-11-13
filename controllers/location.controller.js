const httpStatus = require('http-status');
const axios = require('axios');

const getData = (endpoint, callback) => {
  axios.get(`https://thongtindoanhnghiep.co/api/${endpoint}`).then((data) => {
    callback(data);
  });
};

module.exports.getCity = async (req, res) => {
  getData('city', (data) => {
    return res.json(data.data.LtsItem);
  });
};

module.exports.getDistrict = async (req, res) => {
  getData(`city/${req.params.id}/district`, (data) => {
    return res.json(data.data);
  });
};

module.exports.getWard = async (req, res) => {
  getData(`district/${req.params.id}/ward`, (data) => {
    return res.json(data.data);
  });
};
