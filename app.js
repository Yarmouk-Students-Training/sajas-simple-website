const {sequelize} = require('./models');
const user =require('./models');
const express = require('express');
const jwt = require('jsonwebtoken');
const userRoute =('./route/userRoute');
const postRoute =('./route/postRoute');
const commentRoute =('./route/commentRoute');
const reactionRoute =('./route/reactionRoute');

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
//verify Acess Token 
async function verifyAcessToken (req,res,next){
    try{
        const UserToken= req.headers.authorization;
        if(!UserToken) 
        return res.send({message:'no token provide'});
        const accessToken = authToken.split('')[1];
        if (!accessToken) 
        return res.send({message:'no token'});
        jwt.verifyAccessToken(accessToken);
       
        next();}
        catch (err){
            next(err);
        }
//verify refresh Token 
async function verifyRefreshToken (refreshToken){
    UserToken.find({user:userId}).sort({createdAt:-1}).limit(1);
    userToken= userToken [0];
    if(!userToken)
        return res.send({message:'User token does not exist'});
        if(UserToken.refreshToken !==refreshToken)
        return res.send({message:'not valid'});
        UserToken.findOne ({_id:userToken._id},{refr:{refreshToken:refToken}});
        return {accessToken:accessToken,refreshToken:refToken};
}

    }
    async function checkIfAllowed(userId){
        const userToken = await userToken.find({user:userId}).sort({createdAt:-1}).limit(1);
        if (!userToken[0]) throw{isError:true,message:'User token does not exist'}
    }

app.listen(5000,()=>console.log('Server started on port 5000'));


