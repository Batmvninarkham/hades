const express= require("express");
const app = express();
const streamapi = require("./stream");
const cors = require("cors");
const PORT=3000;
app.get("/api/stream/live",async (req,res)=>{
  const match= await streamapi.getlivematches();
  const url= await streamapi.getembedurl(match);
  res.json(url);
});
app.get("/api/stream/live/popular",async (req,res)=>{
  const match= await streamapi.getlivepopularmatches();
  const url = await streamapi.getembedurl(match);
  res.json(url);
});
//get categories and related
app.get("/api/stream",async(req,res)=>{
  const {category}=req.query;
  const {popular}= req.query;
  if (category){ 
    if(popular){
      const match= await streamapi.getmatchescategorypopular(category);
      const url= await streamapi.getembedurl(match);
      return res.json(url);
    }
  const match=await streamapi.getmatchespercategory(category);
  const url= await streamapi.getembedurl(match);
   return  res.json(url);
  }
  const categories = await streamapi.getcategory();
  res.json(categories);
});
app.get("/api/stream/today",async(req,res)=>{
  const match= await streamapi.gettodaymatches();
  const url= await streamapi.getembedurl(match);
  res.json(url);
});
app.get("/api/stream/today/popular",async(req,res)=>{
  const match = await streamapi.gettodayspopularmatches();
  const url= await streamapi.getembedurl(match);
  res.json(url);
});

app.use(cors({
    origin: [
        "https://hades-ashy.vercel.app"
    ]
}));
app.listen(PORT,async()=>{
console.log(`server running on  port ${PORT}`);
});
