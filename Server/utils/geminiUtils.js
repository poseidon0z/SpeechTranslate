const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyBhd62zz9CGBqnuMuw6gNKwGnfL01k5-bw");

function geminiUtils(context,message){
    async function run() {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
    
    const prompt = `Context: ${context}\nMessage: ${message}\nParaphrase the above message in the given context.`;
    
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
        return text;
    }
    
    return run();
}

module.exports = geminiUtils;
