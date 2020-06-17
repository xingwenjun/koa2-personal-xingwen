const moment = require('moment');

module.exports = (squelize, DataTypes) => {
    return squelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'username'
        },
        realName: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'realname'
        },
        sex: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'sex'
        },
        birth: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'birth'
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'password'
        },
        role: { // 0是超级管理员 1是管理员 2是普通用户 3是游客
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'role'
        },
        createTime: {
            type: DataTypes.DATE,
            field: 'createTime',
            allowNull: false,
        },
    })
}