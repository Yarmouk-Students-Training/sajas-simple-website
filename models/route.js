const express = require('express');

const { sequelize , users , post , comments , reaction } = require ('./models');


const app=express()
app.use(express.json())

app.post('/create',async(req,res)=>{
    const {phone,name,email,gender, Birthdate,password}= req.body;
    try{
        const user= await users.create({ phone,name,email,Birthdate,gender, password})
        return res.json(user)
    }
    catch(err){
        console.log(err)
    }
})

app.post('/post/create',async(req,res)=>{
    const {user_id ,post_id,content} = req.body;
    try{
        const posts= await posts.create({user_id , post, content })
        return res.json(posts)
    }
    catch(err){
        console.log(err)
    }
})

app.post('/comments/post/post_id',async(req,res)=>{
    const {user_id,post_id,comments_id,content}= req.body;
    try{
        const comment= await comments.create({ user_id , post_id , comments_id,content})
        return res.json(comment)
    }
    catch(err){
        console.log(err)
    }
})

app.post('/reaction/post/post_id',async(req,res)=>{
    const {user_id,post_id,reaction_id,type_Of_reaction}= req.body;
    try{
        const react= await reaction.create({ user_id ,post_id,reaction_id,type_Of_reaction })
        return res.json(react)
    }
    catch(err){
        console.log(err)
    }
})
app.put('/comments/comment_id',async(req,res)=>{
    const {comment,comment_id}= req.body;
    try{
        const comments= await comment.create({ user_id , comment,comment_id,content })
        return res.json(comment)
    }
    catch(err){
        console.log(err)
    }
})
app.delete('/comments/comment_id',async(req,res)=>{
    const {comment,comment_id}= req.body;
    try{
        const comments= await comment.create({ user_id , comment,comment_id,content })
        return res.json(comment)
    }
    catch(err){
        console.log(err)
    }
})
app.put('reaction/reaction_id',async(req,res)=>{
    const {reaction,reaction_id}= req.body;
    try{
        const react= await reactuin.create({ user_id , reaction,reaction_id,content })
        return res.json(react)
    }
    catch(err){
        console.log(err)
    }
})
app.delete('reaction/reaction_id',async(req,res)=>{
    const {reaction,reaction_id}= req.body;
    try{
        const react= await reactuin.create({ user_id , reaction,reaction_id,content })
        return res.json(react)
    }
    catch(err){
        console.log(err)
    }
})


//specific user

app.get('/users/:email',async(req,res)=>{
    const email=req.params.email
    try{
        const user= await users.findOne({
            where:{email}
        })
        return res.json(user)
    }
    catch(err){
        console.log(err)
    }
})

//all post 

app.get('/post',async(req,res)=>{
    const email=req.params.email
    try{
        const post= await posts.findAll()
        return res.json(post)
    }
    catch(err){
        console.log(err)
    }
})


//all post for specific user

app.get('/users/:user_id/post',async(req,res)=>{
    const user_id =req.params.user_id
    try{
        const emails= await post.findAll({
            where:{user_id}

        })
        
        return res.json(emails)
    }
    catch(err){
        console.log(err)
    }
})

//specific post 
app.get('/post/:post_id',async(req,res)=>{
    const post_id =req.params.post_id
    try{
        const posts= await post.findOne({
            where:{post_id}

        })
        
        return res.json(posts)
    }
    catch(err){
        console.log(err)
    }
})

//a specific comment for a specific post 

app.get('/comments/:comments_id/post/:post_id',async(req,res)=>{
    const post_id =req.params.post_id
    const comments_id=req.params.comments_id
    try{
        const posts= await post.findOne({
            where:{post_id}

        })
        return res.json(comments_id)
    }
    catch(err){
        console.log(err)
    }
})

//a specific post for a specific reaction 

app.get('/post/:post_id/reaction/:reaction_id',async(req,res)=>{
    const post_id =req.params.post_id
    const reaction_id=req.params.reaction_id
    try{
        const posts= await post.findOne({
            where:{post_id}

        })
        return res.json(reaction_id)
    }
    catch(err){
        console.log(err)
    }
})











