module.exports = (sequelize, DataTypes) => {
  const ConnectPermissionsRoles = sequelize.define(
    "ConnectPermissionsRoles",
    {
      permission_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: "permission_id",
      },
      role_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: "role_id",
      },
    },
    {
      underscored: false,
      freezeTableName: true,
      tableName: "connect_permissions_roles",
      timestamps: false,
    }
  );
  ConnectPermissionsRoles.associate = (Model) => {
    Model.ConnectPermissionsRoles.belongsTo(Model.ConnectPermissions, {
      foreignKey: "permission_id",
      as: "permissions",
    });
  };

  return ConnectPermissionsRoles;
};
