const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/api',(req,res) => {
    res.json({
        message:'welcome to the API'
    });
});

app.post ('/api/posts',verifyToken,(req,res)=>{
    jwt.verify(req.token,'secretkey',(err,authData)=>{
        if (err){
            res.sendStatus(403);
        }else{
              res.json({
        message:'Post created....',
        authData
    });
        }

    });
  
});

app.post ('/api/login',(req,res)=>{
    //Mock user
    const user={
        id:1,
        username:'sajaalquran',
        email:'sajaalquran@gmail.com'
    }
    jwt.sign({user},'secretkey',{expiresIn:'30s'},(err,token )=>{
        res.json({
            token
        });
    });

});

//verify Token 
function verifyToken (req,res,next){
    //Get auth header value
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !=='undefined'){
        const bearer = bearerHeader.split('');
        console.log(bearer);
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }
        else{
            res.endStatus(403);
        }
    
}

app.listen(5000,()=>console.log('Server started on port 5000'));


