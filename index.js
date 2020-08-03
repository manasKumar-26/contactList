// const express=require('express');
// const port=8000;
// const db=require('./config/mongoose');
// const Contact=require('./models/contact');
// const app=express();
// const path=require('path');

// app.listen(port,(err)=>{
//     if(err)
//     {
//         return;
//     }
//     console.log('express server up at port ',port);
//     return;
// });
// // MiddleWares
// app.use(express.urlencoded());
// app.use(express.static('asset'));
// //Custom MiddleWare 1 By default will have 3
// // app.use((request,response,next)=>{
// //   //console.log('middleWare 1 has been called');
// //   request.myName="manas";
// //   next();
// // });
// // app.use((request,response,next)=>{
// //     console.log(request.myName);
// //     request.myName="Manas";
// //     next();
// // });
// let contactList=[
//     {
//         name:'Manas',
//         phone:'96292022992'
//     },
//     {
//         name:'Adi',
//         phone:'23456789'
//     },
//     {
//         name:'Bishal',
//         phone:'09876543456789',
//     }
// ];

// app.set('view engine','ejs');
// app.set('views',path.join(__dirname,'views'));
// app.get('/delete',(req,res)=>{
//    // console.log(req.params);
//     // let phone=req.params.phone;
//     let phone=req.query.phone;
//    let index=contactList.findIndex(contact=>contact.phone === phone);
//    if(index !== -1)
//    {
//        contactList.splice(index,1);
//    }
//    return res.redirect('back');
// });
// app.get('/',(req,res)=>{
//   //  console.log(req.myName);
//     return res.render('home',{
//         contact:contactList,
//     });
// });
// app.post('/save',(req,res)=>{
//     // contactList.push({
//     //     name:req.body.name,
//     //     phone:req.body.phone,
//     // });
//     contactList.push(req.body);
//     return res.redirect('back');
// });
//***************************************************************************************
const express=require('express');
const port =8000;
const path=require('path');
const app=express();
const db=require('./config/mongoose');
const contact=require('./models/contact');
app.use(express.urlencoded());
app.use(express.static('asset'));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.get('/',(req,res)=>{
   contact.find({},(err,contacts)=>{
       if(err){return;}
       return res.render('home',{
           contact:contacts,
       });

   });
});
app.post('/save',(req,res)=>{
    contact.create({
        name:req.body.name,
        phone:req.body.phone,
    },(err,newContact)=>{
        if(err){
            return console.log(err);
        }
        console.log(newContact);
        return res.redirect('back');
    })
});
app.get('/delete',(req,res)=>{
    let id=req.query.id;
    contact.findByIdAndDelete(id,(err)=>{
        if(err){
            return;
        }
        return res.redirect('back');
    });

});
app.listen(port,(err)=>{
    if(err){
        return;
    }
    return console.log('success');
})