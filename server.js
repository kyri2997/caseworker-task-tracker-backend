import dotenv from 'dotenv'
dotenv.config()
import pkg from '@prisma/client';
const { PrismaClient } = pkg;

import express from "express"
import { validateTask } from "./src/utils/validateTask.js"; 

const app = express();
const port = 3000;
const prisma = new PrismaClient();

app.use(express.json())

app.post('/tasks', async (req,res)=>{
    
   const validationResult = validateTask(req.body)
   if (!validationResult.valid){
        return res.status(400).send({ error: validationResult.message })
   }

   const savedTask = await prisma.task.create({
    data: {
       title: req.body.title,
        status: req.body.status,
        dueDate: req.body.dueDate,
        description: req.body.description,
    }
   })
   return res.status(201).send(savedTask)
    

})

// app.use('/',contactsRouter)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

