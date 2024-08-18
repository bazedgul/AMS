import mongoose, {model, Schema} from "mongoose";

const attendanceSchema = new Schema({
    userId : {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
    },
    date: {
        type: Date, 
        required: true
    },
    status: {
        type: String,
        enum: ['Present', 'Absent', 'Leave'],
        required: true
    },
    markAt: {
        type: Date,
        default: Date.now
    }

})

export const Attendance = model('Attendance', attendanceSchema)