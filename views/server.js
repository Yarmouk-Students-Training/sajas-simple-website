const http = require('http');
const fs = require('fs');
const_ =require ('loadash');



const server = http.createServer((req,res)=> {
    //lodash
    const num = _.random(0,20);
console.log(num);

const greet = _.once(() =>{
    console.log('hello');

});
greet();
greet();
//set header content type
res.setHeader('content-Type','text/html');
let ='./views/';
switch(req.url){
    case '/':
        path += 'index.html';
        res.statusCode =200;
        break;
        case'/about':
        path +='about.html';
        res.statusCode =200;
        break;
        case '/about-us':
            res.statuscode=301;
            res.setHeader('Location','/about')
            res.end();
            break;
        default:
            path +='404.html';
            res.statusCode =404;
            break;





}

//send an html file
fs.readFile(path,(err,data) => {
    if(err){
    console.log(err);
    res.end();
}

else{
   // res.write(data);
   res.statusCode =200;
    res.end(data);
}
})
});
server.listen(8081,'localhost', ()=>{
    console.log('listening for requests on port 3000')
})

