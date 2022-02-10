module.exports = (sequelize, DataTypes) => {
    const Costumer = sequelize.define('Costumer', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull:false
          },
          name: {
            type: DataTypes.STRING,
            allowNull: false
          },
          alamat: {
            type: DataTypes.STRING,
            allowNull: false
          },
          no_hp: {
            type: DataTypes.BIGINT(12),
            allowNull:false
          },
    }, {
        tableName: "costumers"
    });
    return Costumer;
}