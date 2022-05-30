module.exports = (sequelize, DataTypes) => {
    const ConnectUsers = sequelize.define(
        "ConnectUsers",
        {
          id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: "id",
          },
          username: {
            type: DataTypes.STRING,
            field: "username",
          },
          hashed_password: {
            type: DataTypes.STRING,
            field: "hashed_password"
          },
          is_verify: {
            type: DataTypes.BOOLEAN,
            field: "is_verify"
          },
          is_kyc: {
            type: DataTypes.BOOLEAN,
            field: "is_kyc"
          },
          is_active: {
            type: DataTypes.BOOLEAN,
            field: "is_active"
          },
          metadata: {
            type: DataTypes.STRING,
            get() {
              try {
                const value = this.getDataValue("metadata");
                if (!value) {
                  return {};
                }
                return JSON.parse(value);
              } catch (err) {
                return {};
              }
            },
            set(value) {
              this.setDataValue("metadata", JSON.stringify(value));
            },
          },
          platform: {
            type: DataTypes.STRING,
          },
          max_session: {
            type: DataTypes.INTEGER,
            field: "max_session",
          },
          created_by: {
            type: DataTypes.INTEGER,
            field: "created_by",
          },
          created_at: {
            type: DataTypes.DATE,
            field: "created_at"
          },
          updated_by: {
            type: DataTypes.INTEGER,
            field: "updated_by"
          },
          updated_at: {
            type: DataTypes.INTEGER,
            field: "updated_at"
          },
          deleted_by: {
            type: DataTypes.INTEGER,
            field: "deleted_by"
          },
          deleted_at: {
            type: DataTypes.INTEGER,
            field: "deleted_at"
          }
        },
        {
          underscored: false,
          freezeTableName: true,
          tableName: "connect_users",
          timestamps: false,
        }
      );
      ConnectUsers.associate = (Model) => {

        Model.ConnectUsers.hasMany(Model.ConnectOrganizationsUsers, {
          foreignKey: 'user_id',
          as: 'organizations',
        });
        Model.ConnectUsers.hasOne(Model.ConnectProfiles, {
          foreignKey: 'user_id',
          as: 'profile',
        });
      };
    
      return ConnectUsers;
}