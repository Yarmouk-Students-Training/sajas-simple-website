'use strict';

const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class router extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  router.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'router',
  });
  return router;
};
server.get('/echo', (req, res) => {
  res.jsonp(req.query)
})
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})
