import mongoose from 'mongoose'

const productionSchema = new mongoose.Schema({
    url:String
},{
    timestamps:true,
    collection:"production"
})

export default mongoose?.models?.production || mongoose.model("production",productionSchema);