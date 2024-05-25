import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
const app = express()
app.use(cors())
app.use(express.json());
dotenv.config()
const PORT = process.env.port||3000;
const schemaData = mongoose.Schema({
    name : String,
    email : String,
    mobile : String,
},{
   timestamps : true 
});

const userModel = mongoose.model("user",schemaData);
//read
app.get('/',async(req,res)=>{
    const data = await userModel.find({});
    res.json({success : true , data : data});
});

//create data or save data
app.post("/create",async(req,res)=>{
    console.log(req.body)
    //await userModel(req.body).save();
    const data = new userModel(req.body);
    await data.save();
    res.send({success:true,message:"data saved successfully",data});
});

//update the data
app.put("/update",async(req,res)=>{
    console.log(req.body);
    const { _id, ...rest} = req.body;
    console.log(rest);
    const data = await userModel.updateOne({_id : _id},rest);
    res.send({success: true, message:"data updated successfully",data});
});

//delete the data
app.delete("/delete/:id",async(req,res)=>{
    const id = req.params.id;
    console.log(id);
    const data = await userModel.deleteOne({_id : id})
    res.send({success:true,message:"data deleted successfully",data});
});

mongoose.connect(process.env.Atlas_Url).then(()=>{
    console.log("Connected to database...");
    app.listen(PORT,()=>{
        console.log("Server is running on port 3000");
    });
})
.catch((err)=>console.log(err));
