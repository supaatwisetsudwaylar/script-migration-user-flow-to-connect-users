module.exports = (sequelize, DataTypes) => {
    const ConnectPackageInvoice = sequelize.define(
      "ConnectPackageInvoice",
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          field: "id",
        },
        package_billing_id: {
            type: DataTypes.INTEGER,
        },
        organization_id: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        ref_type: {
          type: DataTypes.STRING,
        },
        ref_id: {
          type: DataTypes.INTEGER,
        },
        payment_date: {
          type: DataTypes.DATE,
        },
        vat: {
          type: DataTypes.INTEGER,
        },
        price: {
          type: DataTypes.INTEGER,
        },
        discount: {
          type: DataTypes.INTEGER,
        },
        discount_type: {
          type: DataTypes.STRING,
        },
      },
      {
        underscored: false,
        freezeTableName: true,
        tableName: "connect_package_invoice",
        timestamps: false,
        createdAt: false,
        updatedAt: false,
      }
    );
    ConnectPackageInvoice.associate = (Model) => {
      // Model.BookingWarehouse.belongsTo(Model.Address, {
      //   foreignKey: "address_id",
      //   as: "address",
      // });
    };
  
    return ConnectPackageInvoice;
  };
  