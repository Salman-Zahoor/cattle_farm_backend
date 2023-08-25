const express =require("express")
const bodyParser=require("body-parser")
const cors=require("cors")
const mongoose=require("mongoose")
const users=require("./routes/users");

const PORT=process.env.PORT || 5000;

mongoose.connect("mongodb://0.0.0.0:27017/cattle_farm", {}).
then((res)=>{
    console.log(`Server is running on ${PORT}`);
}).catch((error)=>{
    console.log(error,"error server==========>");
})

const app=express();
app.use(cors());
app.use(bodyParser.json());
app.use("/api", users);

app.listen(PORT, (req, res) => {
    console.log(`server is running on ${PORT}`);
  });
  