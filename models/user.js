const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports =(sequelize,DataTypes)=>{
    const User =sequelize.define("user",{
        firstname: {
            type: DataTypes.STRING,
        },
        lastname: {
            type: DataTypes.STRING,
        },
        fathername:{
            type: DataTypes.STRING,
        },
        nationality:{
            type: DataTypes.STRING,
        },
        gender:{
            type: DataTypes.STRING,
        },
        placeofissue:{
            type: DataTypes.STRING,
        },
        Profile:{
            type: DataTypes.STRING,
        },
        serialno:{
            type: DataTypes.STRING,
        },
        password:{
            type: DataTypes.STRING,
        },
    });
    return User
}