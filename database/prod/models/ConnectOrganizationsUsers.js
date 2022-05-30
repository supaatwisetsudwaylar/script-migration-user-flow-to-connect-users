module.exports = (sequelize, DataTypes) => {
  const ConnectOrganizationsUsers = sequelize.define(
    "ConnectOrganizationsUsers",
    {
      organization_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: "organization_id",
      },
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: "user_id",
      },
      role_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: "role_id",
      },
      platform: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
    },
    {
      underscored: false,
      freezeTableName: true,
      tableName: "connect_organizations_users",
      timestamps: false,
    }
  );
  ConnectOrganizationsUsers.associate = (Model) => {
    Model.ConnectOrganizationsUsers.belongsTo(Model.ConnectUsers, {
      foreignKey: "user_id",
      as: "user",
    });
    Model.ConnectOrganizationsUsers.belongsTo(Model.ConnectRoles, {
      foreignKey: "role_id",
      as: "role",
    });
    Model.ConnectOrganizationsUsers.belongsTo(Model.ConnectOrganizations, {
      foreignKey: "organization_id",
      as: "organization",
    });
  };

  return ConnectOrganizationsUsers;
};
