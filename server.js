import express from 'express';
import cors from 'cors';
import fs from 'fs';

const app = express();
app.use(cors());
app.use(express.json());

let stock = [];
try {
  stock = JSON.parse(fs.readFileSync('./data.json','utf8'));
} catch(e) {
  stock = [{name:"Seringues 10ml",ref:"SER310",qty:0,arrivage:0,seuil:50}];
}

app.get('/health', (req,res)=> res.json({status:'ok'}));
app.post('/auth', (req,res)=> req.body.code==='2025' ? res.json({success:true}) : res.status(403).json({error:'Invalid'}));
app.get('/stock', (req,res)=> res.json(stock));

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=>console.log('Server:',PORT));
