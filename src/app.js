const { response } = require('express')
const express = require('express')
const app = express()
const port = 3000
app.set('view engine' , 'hbs')
const request = require('request')

/////////////////////////
const path = require('path')

const viewsPath = path.join(__dirname,'../templates/views')
app.set('views', viewsPath)

const hbs = require('hbs')
const pathPartiales = path.join(__dirname,'../templates/partials')
hbs.registerPartials(pathPartiales)
 
app.get('',(req,res)=>{
  const url = 'https://newsapi.org/v2/top-headlines?country=eg&category=entertainment&apiKey=8af4fe64fbd4495185ef8d2153d03fca'
  request({url,json:true} , (error , response)=>{
  
      if(error){
         return res.send('unable to connect to news service')
      }
  
      else if(response.body.message){
          return res.send('check your Api Key')
      }

      else if(response.body.totalResults == 0){
        return res.send('check country Name')
      }
      else{
          data=response.body.articles
          res.render('index',{
            titlePage :'News Page',
            name:'sabah',
            data:data
          })
      }
  })

})
  
/////

app.listen(port,()=>{
  console.log('server is running')
})