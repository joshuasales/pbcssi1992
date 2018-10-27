module.exports = {
  database: 'mongodb://pbc:pbcssi1992@ds127362.mlab.com:27362/pbc',
  //database: 'mongodb://localhost/pbc',
  port: (process.env.PORT, process.env.IP || 3000),
  secretKey: '143KIM',
};
// "mongodb://localhost/pbc"
// "mongodb://pbc:pbc@ds139072.mlab.com:39072/pbc"
