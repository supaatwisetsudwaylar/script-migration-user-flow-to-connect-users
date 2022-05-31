module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define(
    "Customer",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      contact_id: {
        type: DataTypes.INTEGER,
      },
      tax_id: {
        type: DataTypes.STRING,
      },
      id_card: {
        type: DataTypes.STRING,
      },
      biling_address: {
        type: DataTypes.STRING,
      },
    },
    {
      underscored: true,
      freezeTableName: true,
      tableName: "customer",
      timestamps: false,
    }
  );
  Customer.associate = (Model) => {
    Model.Customer.belongsTo(Model.Contact, {
      foreignKey: "contact_id",
      as: "contact",
    });
  };
  return Customer;
};
