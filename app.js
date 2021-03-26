const express = require('express')
const { sequelize , User , Post} = require('./models')
const app = express()
app.use(express.json())

app.post('/users',async(req,res)=>{
    const {name, email ,role} = req.body
    try{
        const user = await User.create ({name,email,role})
        return res.json(user)
    } catch(err){
        console.log(err)
        return res.status(500).json (err)
    }
})
app.delete('/users/:uuid', async (req,res) =>{
    const uuid =req.params.uuid
    try{
        const user = await User.findOne({ where:{uuid}})
        await user.destroy()
            return res.json({message:'User deleted!'})
    }catch(err){
        console.log(err)
        return res.status(500).json(err)
    }
    })
    app.put('/users/uuid',async (req,res)=>{
        const uuid = req.params.uuid
        const{name, email,role}= req.body
        try{
            const user = await User.findOne({where:{uuid}})
            return res.json(user)
            user.name = name
            user.email=email
            user.role = role
            await user.save()
            return res.json(user)
        }catch(err){
            console.log(err)
            return res.status(500).json(err)
        }
        })

app.get('/users', async (req,ers)=>{
    try{
        const users = await User.findAll({include:[{model:User,as:'user'}]})
        return res.json(users)
    } catch (err){
        console.log(err)
        return res.status(500).json({ error:'Something went wrong'})
    }
})
app.post('/posts', async (req,res) =>{
const {UserUuid ,body} =req.body
try{
    const user = await User.findOne(
        {where:{uuid},
    include:('posts')
})
const post = await Post.create({ body, userId:user.id})
return res.json(post)
} catch(err){
    console.log(err)
    return res.status(500).json(err)
}
})

app.listen({port:5000}, async()=>{
    console.log('Server up on http://localhost:5000')
    await sequelize.authenticate()
    console.log('Database Connected!')
})

