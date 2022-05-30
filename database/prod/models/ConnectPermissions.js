module.exports = (sequelize, DataTypes) => {
    const ConnectPermissions = sequelize.define(
        "ConnectPermissions",
        {
          id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: "id",
          },
          name: {
            type: DataTypes.STRING,
            field: "name",
            allowNull: false,
            unique: true,
          },
        },
        {
          underscored: false,
          freezeTableName: true,
          tableName: "connect_permissions",
          timestamps: false,
          createdAt: false,
          updatedAt: false,
        }
      );
      ConnectPermissions.associate = (Model) => {
        // Model.BookingWarehouse.belongsTo(Model.Address, {
        //   foreignKey: "address_id",
        //   as: "address",
        // });
      };
    
      return ConnectPermissions;
}