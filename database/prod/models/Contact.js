module.exports = (sequelize, DataTypes) => {
    const Contact = sequelize.define(
      'Contact',
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
        },
        phone_no: {
            type: DataTypes.STRING,
        },
        name: {
            type: DataTypes.STRING,
        },
        firstname: {
            type: DataTypes.STRING,
        },
        lastname: {
            type: DataTypes.STRING,
        },
        pre_phone_no: {
            type: DataTypes.STRING,
        },
        post_phone_no: {
            type: DataTypes.STRING,
        },
        title_name_id: {
            type: DataTypes.INTEGER,
        },
      },
      {
        underscored: true,
        freezeTableName: true,
        tableName: 'contact',
        timestamps: false,
      }
    );

    Contact.associate = (Model) => {
        Model.Contact.belongsTo(Model.TitleName, {
          foreignKey: 'title_name_id',
          as: 'title_name',
        });
    };
  
    return Contact;
  };
  