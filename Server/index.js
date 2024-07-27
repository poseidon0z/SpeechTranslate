import { CAIConfig, GetResponse } from "./utils/CAIUtils.js"
import { stt } from "./utils/GoogleAPIUtils.js";
import cors from 'cors';

import express from"express";
import "dotenv/config.js";


const CAI_AUTH_TOKEN = process.env.CAI_AUTH_TOKEN;
const CHAR_ID = "psWB8sQ4EamN8SAUaWjvYayIfujUd9kDvSFDmw94yfE";

const app = express();

app.use(cors());
app.use(express.json());

const configStatus = await CAIConfig(CAI_AUTH_TOKEN,CHAR_ID);
console.log(configStatus);

app.post("/getResponse",async(req,res) =>{
    const message = req.body;
    try{
        var rawResponse  = await GetResponse(message);
    var response = rawResponse.turn.candidates[0].raw_content

    console.log(response);

    return res.status(200).json({"response": response});
    }catch(error){
        console.error('Error processing speech input:', error);
        res.status(500).json({ error: 'Error Generating Response' });
    }
    
});


app.post("/speechInput", async (req, res) => {
    const { audio, language } = req.body;
    
    try {
        const transcription = await stt(audio, language);
        res.json({ result: transcription });
    } catch (error) {
        console.error('Error processing speech input:', error);
        res.status(500).json({ error: 'Error processing speech input' });
    }
});

app.listen(5000, () => {
    console.log(`Express server running on http://localhost:${5000}`);
});