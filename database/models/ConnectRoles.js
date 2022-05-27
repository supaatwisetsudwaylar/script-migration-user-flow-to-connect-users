module.exports = (sequelize, DataTypes) => {
    const ConnectRoles = sequelize.define(
        "ConnectRoles",
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
          },
        },
        {
          underscored: false,
          freezeTableName: true,
          tableName: "connect_roles",
          timestamps: false,
          createdAt: false,
          updatedAt: false,
        }
      );
      ConnectRoles.associate = (Model) => {
        Model.ConnectRoles.belongsToMany(Model.ConnectPermissions, {
          through: "connect_permissions_roles",
          as: "permissions",
          foreignKey: "role_id",
          otherKey: "permission_id",
        });
      };
    
      return ConnectRoles;
}