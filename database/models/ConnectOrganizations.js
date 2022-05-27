module.exports = (sequelize, DataTypes) => {
    const ConnectOrganizations = sequelize.define(
        "ConnectOrganizations",
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
          phone_no: {
            type: DataTypes.STRING,
            field: "phone_no",
          },
          business_type_id: {
            type: DataTypes.INTEGER,
            field: "business_type_id",
          },
          registered_number: {
            type: DataTypes.STRING,
            field: "registered_number",
          },
          address_detail: {
            type: DataTypes.STRING,
            field: "address_detail",
          },
          address_id: {
            type: DataTypes.INTEGER,
            field: "address_id",
          },
          document_business_file: {
            type: DataTypes.STRING,
            field: "document_business_file",
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
          tableName: "connect_organizations",
          timestamps: false,
        }
      );
      ConnectOrganizations.associate = (Model) => {
        Model.ConnectOrganizations.belongsTo(Model.Address, {
          foreignKey: "address_id",
          as: "address",
        });
      };
    
      return ConnectOrganizations;
}