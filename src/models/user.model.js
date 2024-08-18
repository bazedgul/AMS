import mongoose, {Schema,model} from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new Schema(
    {
        FullName:{
            type: String,
            required: true,
            trim: true,
        },
        email:{
            type:String,
            required: true,
            trim:true,
            lowercase: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role:{
            type:String,
            enum: ['user', 'admin'],
            default: 'user',
            },
        
    }
    ,{timestamps: true})

    userSchema.pre("save", async function(next){
        if(!this.isModified("password")) return next();
        this.password = bcrypt.hash(this.password, 10);
        next()
    })
    
    userSchema.methods.isPasswordCorrect = async function(password){
        return await bcrypt.compare(password,this.password)
    }

    userSchema.methods.generatedAccessToken = function (){
        return jwt.sign(
            {
                _id : this._id,
                email: this.email,
                username: this.username,
                fullName: this.fullName,
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRY
            }
        )
    }
    userSchema.methods.generatedRefreshToken = function (){
        return jwt.sign(
            {
                _id : this._id,
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: process.env.REFRESH_TOKEN_EXPIRY
            }
        )
    }
    

    export const User = model('User',userSchema)