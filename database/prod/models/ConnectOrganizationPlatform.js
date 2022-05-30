module.exports = (sequelize, DataTypes) => {
    const ConnectOrganizationPlatform = sequelize.define(
        "ConnectOrganizationPlatform",
        {
          organization_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
          },
          platform: {
            type: DataTypes.STRING,
            primaryKey: true,
          },
        },
        {
          underscored: false,
          freezeTableName: true,
          tableName: "connect_organizations_platform",
          timestamps: false,
        }
      );
      ConnectOrganizationPlatform.associate = (Model) => {

      };
    
      return ConnectOrganizationPlatform;
}