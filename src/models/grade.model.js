import mongoose, {Schema,model} from "mongoose";

const gradeSchema = new Schema(
    {
        grade: {
            type: Number, 
            required: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        subject: {
            type: String,
            required: true
        },
        attendancePercentage: {
            type: Number,
            required: true
        },
        assignedAt: {
            type: Date,
            default: Date.now
        }
    }
    ,{timestamps:true})

export const Grade = model('Grade', gradeSchema)
