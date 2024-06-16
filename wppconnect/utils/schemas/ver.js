import { DataTypes } from 'sequelize';

export const schemaVer = {
    id : false,
    ver_codigo : {
        type: DataTypes.INTEGER(11).UNSIGNED,
		autoIncrement : true,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    ver_referencia : {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    ver_texto : {
        type: DataTypes.TEXT(),
        allowNull: false
    }
}
