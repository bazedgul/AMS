import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiError} from '../utils/ApiError.js'
import {User} from '../models/user.model.js'
import {uploadOnCloudinary} from '../utils/fileUpload.js'
import { ApiResponse } from '../utils/ApiResponse.js'

const registerUser = asyncHandler(async (req,res) => {
  // get user from frontend
  // validation - not empty
  // check if user already exists : email, username
  // check for images, check for avatar
  // upload them cloudinary, avatar
  // create user object - creation entry in DB
  // remove password and refresh token field from response
  // check for user creation 
  // return response

   const {username, email,fullName,password} = req.body
   console.log("email", email)

   // check all individual field validation are empty 
//    if(fullName === ""){ 
//     throw new ApiError(400, "fullName is required")
//    }
    if(
        [username,email,password,fullName].some((field)=> field?.trim() === "")
    ){
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = User.findOne({
        $or: [{username },{email }]
    })

    console.log("Existed User : ", existedUser)

    if(existedUser){
        throw new ApiError(409, "Username or Email already exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path
    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar is required")
    }
    console.log("Avatar Local Path" ,avatarLocalPath)

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400, "Avatar upload failed")
    }

    const user = await User.create({
        username: username.toLowerCase(), 
        email, 
        fullName, 
        password, 
        avatar: avatar.url, 
        coverImage: coverImage?.url || "",
    })

   const createdUser = await User.findById(user._id).select(
    "-password  -refreshToken"
   )

   if(!createdUser){
    throw new ApiError(500, "Something went wrong while the registering the user")
   }

   return res.status(201).json(
    new ApiResponse(200, createdUser, "User registered Successfully!!!")
   )
})



export {registerUser}
