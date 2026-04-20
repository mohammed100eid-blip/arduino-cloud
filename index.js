const express = require("express")
const { exec } = require("child_process")
const fs = require("fs")

const app = express()

app.use(express.json())

app.post("/compile",(req,res)=>{

const code = req.body.code

fs.writeFileSync("sketch.ino",code)

exec("arduino-cli compile --fqbn arduino:avr:uno .",(err,stdout,stderr)=>{

if(err){
res.send(stderr)
return
}

const hex = fs.readFileSync("build/arduino.avr.uno/sketch.ino.hex")

res.send(hex)

})

})

app.listen(3000,()=>{
console.log("server running")
})
