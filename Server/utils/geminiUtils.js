import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyBhd62zz9CGBqnuMuw6gNKwGnfL01k5-bw");

async function geminiUtils(context,message){
    try{
          const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
        
        const prompt = `Context: ${context}\nMessage: ${message}\nParaphrase the above message in the given context and give me a single message.`;
        
          const result = await model.generateContent(prompt);
          const response = await result.response;
          const text = response.text();
          console.log(text);
          return text;
    }catch(err){
        console.log("Error while paraphrasing : " ,err);
        return null;
    }
}

let context = "Help me buy potatoes";
let message = "Give me 2 kilos for 180";

export {geminiUtils}