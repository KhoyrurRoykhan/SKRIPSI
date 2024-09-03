import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataType} = Sequelize;

const Users = db.define('user',{
    ame:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },
    refresh_token:{
        type: DataTypes.TEXT
    },
},{
},{
    freezeTableName:true
})

export default Users;

(async()=>{
    await db.sync();
})