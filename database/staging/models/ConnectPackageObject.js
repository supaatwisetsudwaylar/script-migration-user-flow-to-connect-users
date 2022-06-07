module.exports = (sequelize, DataTypes) => {
  const ConnectPackageObject = sequelize.define(
    "ConnectPackageObject",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: "id",
      },
      organization_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      purchase_order_no: {
        type: DataTypes.STRING,
      },
      ref_type: {
        type: DataTypes.STRING,
      },
      ref_id: {
        type: DataTypes.INTEGER,
      },
      no: {
        type: DataTypes.STRING,
      },
      package_id: {
        type: DataTypes.INTEGER,
      },
      iot_qt: {
        type: DataTypes.STRING,
      },
      type: {
        type: DataTypes.STRING,
      },
      contract_type: {
        type: DataTypes.STRING,
      },
      contract_term: {
        type: DataTypes.INTEGER,
      },
      price: {
        type: DataTypes.FLOAT,
      },
      agent: {
        type: DataTypes.STRING,
      },
      commission: {
        type: DataTypes.FLOAT,
      },
      payment_start_date: {
        type: DataTypes.DATE,
      },
      payment_end_date: {
        type: DataTypes.DATE,
      },
    },
    {
      underscored: false,
      freezeTableName: true,
      tableName: "connect_package_object",
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    }
  );
  ConnectPackageObject.associate = (Model) => {
    // Model.BookingWarehouse.belongsTo(Model.Address, {
    //   foreignKey: "address_id",
    //   as: "address",
    // });
  };

  return ConnectPackageObject;
};
