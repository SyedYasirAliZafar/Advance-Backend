import { Queue, Worker } from "bullmq";
import { redis } from "./redis.js";
import sendEmail from "./lib/sendEmail.js";


const emailQueue = new Queue("emailQueue", {connection:redis})

const worker =  new Worker ("emailQueue", async (job)=>{
    console.log("Job Started");
    const email = job.data.email
    await sendEmail(email)
    console.log("Job Completed");
    
}, {connection:redis})