module.exports = (sequelize, DataTypes) => {
    const UserFlow = sequelize.define(
      'UserFlow',
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
        },
        phone_no: {
            type: DataTypes.STRING,
        },
        hashed_password: {
            type: DataTypes.STRING,
            get() {
                let buff = Buffer.from(this.getDataValue("hashed_password"), 'base64');
                return buff.toString('ascii');
            }
        },
        enable: {
            type: DataTypes.BOOLEAN
        },
        max_session: {
            type: DataTypes.INTEGER,
        },
        customer_id: {
            type: DataTypes.INTEGER,
        },
        contact_id: {
            type: DataTypes.INTEGER,
        }
      },
      {
        underscored: true,
        freezeTableName: true,
        tableName: 'user_flow',
        timestamps: false,
      }
    );
  
    UserFlow.associate = (Model) => {
        Model.UserFlow.belongsTo(Model.Customer, {
          foreignKey: 'customer_id',
          as: 'customer',
        });
        Model.UserFlow.belongsTo(Model.Contact, {
            foreignKey: 'contact_id',
            as: 'contact',
          });
    };

    return UserFlow;
  };
  