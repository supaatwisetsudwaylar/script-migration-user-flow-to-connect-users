module.exports = (sequelize, DataTypes) => {
    const Customer = sequelize.define(
      'Customer',
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        tax_id: {
            type: DataTypes.STRING,
        },
        id_card: {
            type: DataTypes.STRING,
        },
        biling_address: {
            type: DataTypes.STRING,
        }
      },
      {
        underscored: true,
        freezeTableName: true,
        tableName: 'customer',
        timestamps: false,
      }
    );
  
    return Customer;
  };
  