const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const RefreshToken = sequelize.define('refresh_token', {

        refreshTokenId: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },

        token: {
            type: DataTypes.STRING
        },

        userEmail: {
            type: DataTypes.STRING
        },

        expires: {
            type: DataTypes.DATE
        }

    });

    RefreshToken.belongsTo(sequelize.models.user, { foreignKey: 'userId' });

    return RefreshToken;
};
