
const transporter=require("../config/mail");

module.exports = (({from,to,subject,text,html,path})=>{
   var message={
   from: from,

    to: to,

    subject: subject,

    text: text,

    html: html,

    attachments:[
         {
           filename: 'prospect.txt',
         path:path
        } 
    ]
  };
  
  transporter.sendMail(message);

});