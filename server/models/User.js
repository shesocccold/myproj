import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
    {
        username:
        {
            type:String,
            required:true,
            unique:true,
        },
     

        posts:[{
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Post',
        },
       
    ],
    email:
    {
        type:String,
        required:true,
        unique:true,
    },
    password:
    {
        type:String,
        required:true,
    },
},
{timestamps:true},
)
export default mongoose.model('User',UserSchema)
