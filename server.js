import dotenv from 'dotenv'
dotenv.config()

import pkg from '@prisma/client';
const { PrismaClient } = pkg;

import express from "express"
import cors from "cors"
import { validateTask } from "./src/utils/validateTask.js"; 

const app = express();
const port = 3000;
const prisma = new PrismaClient();

const allowedOrigins = [
  "http://localhost:3001",
  "http://localhost:5173",
  "https://your-production-domain.service.gov.uk",
];

app.use(  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.some(o => origin.startsWith(o))) {
    return callback(null, true);
  }
       return callback(new Error("Not allowed by CORS"));
      
    },
    methods: ["POST"],               
    allowedHeaders: ["Content-Type"],
    maxAge: 86400,                  
  })); 


app.use(express.json())

app.get("/", (req, res) => {
  res.send("Task Tracker API is running" );
});

app.post('/tasks', async (req,res)=>{
    
   const validationResult = validateTask(req.body)
   if (!validationResult.valid){
        return res.status(400).send({ error: validationResult.message })
   }

   const savedTask = await prisma.task.create({
    data: {
       title: req.body.title,
        status: req.body.status,
        dueDate: req.body.dueDate ? new Date(req.body.dueDate):null,
        description: req.body.description,
    }
   })
   return res.status(201).send(savedTask)
    

})

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: "Internal server error" });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

