import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyBhd62zz9CGBqnuMuw6gNKwGnfL01k5-bw");

async function geminiUtils(context,message){
    try{
          const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
        
        const prompt = `You are an AI language model tasked with paraphrasing messages while considering their context. Given the following:
Context: ${context}
Original message: ${message}
Please paraphrase the original message, taking into account the provided context. Your paraphrased version should:
Maintain the core meaning and intent of the original message,
Be adapted to fit the given context appropriately,
Use different wording and sentence structure where possible,
Retain any key terms or proper nouns that are essential to the message,
Be approximately the same length as the original message,
Sound natural and fluent.
Provide your paraphrased version as a single, cohesive message.`;
        
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

export {geminiUtils}