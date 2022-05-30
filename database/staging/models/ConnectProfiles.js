module.exports = (sequelize, DataTypes) => {
    const ConnectProfiles = sequelize.define(
        "ConnectProfiles",
        {
          id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: "id",
          },
          title: {
            type: DataTypes.STRING,
            field: "title",
          },
          first_name: {
            type: DataTypes.STRING,
            field: "first_name",
          },
          last_name: {
              type: DataTypes.STRING,
              field: "last_name"
          },
          facebook: {
              type: DataTypes.STRING,
              field: "facebook"
          },
          email: {
              type: DataTypes.STRING,
              field: "email"
          },
          phone_no: {
              type: DataTypes.STRING,
              field: "phone_no"
          },
          address_id: {
            type: DataTypes.INTEGER,
            field: "address_id"
          },
          address_detail: {
            type: DataTypes.STRING,
            field: "address_detail"
          },
          user_id: {
            type: DataTypes.INTEGER,
            field: "user_id",
            allowNull: false,
          },
          createdBy: {
            type: DataTypes.INTEGER,
            field: "created_by",
          },
          createdAt: {
            type: DataTypes.DATE,
            field: "created_at"
          },
          updatedBy: {
            type: DataTypes.INTEGER,
            field: "updated_by"
          },
          updatedAt: {
            type: DataTypes.INTEGER,
            field: "updated_at"
          },
          deletedBy: {
            type: DataTypes.INTEGER,
            field: "deleted_by"
          },
          deletedAt: {
            type: DataTypes.INTEGER,
            field: "deleted_at"
          }
        },
        {
          underscored: false,
          freezeTableName: true,
          tableName: "connect_profiles",
          timestamps: false,
        }
      );
      ConnectProfiles.associate = (Model) => {
        Model.ConnectProfiles.belongsTo(Model.ConnectUsers, {
          foreignKey: "user_id",
          as: "user",
        });
        Model.ConnectProfiles.belongsTo(Model.Address, {
          foreignKey: "address_id",
          as: "address",
        });
      };
    
      return ConnectProfiles;
}