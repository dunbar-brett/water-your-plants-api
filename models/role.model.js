module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define('roles', {
    id: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    }
  });

  return Role;
}