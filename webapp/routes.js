const route=require('express').Router();
const userOperation=require('./database');

route.post('/save',(req,res)=>{
    // console.log(req.body);
    userOperation.sendJSON(req,res);
});

route.get('/getJSON',(res)=>{
    userOperation.getJSON(res);
});

module.exports=route;