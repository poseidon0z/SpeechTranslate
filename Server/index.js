import {CAIConfig, GetResponse} from "./utils/CAIUtils.js"

import express from"express";
import "dotenv/config.js";


const CAI_AUTH_TOKEN = process.env.CAI_AUTH_TOKEN;
const CHAR_ID = "psWB8sQ4EamN8SAUaWjvYayIfujUd9kDvSFDmw94yfE";

const app = express();

app.post("/getResponse",async(req,res) =>{
    const message = req.body;

    const configStatus = await CAIConfig(CAI_AUTH_TOKEN,CHAR_ID);

    console.log(configStatus);

    let rawResponse  = await GetResponse(message);
    let response = rawResponse.turn.candidates[0].raw_content

    console.log(response);

    return res.json({"response": response});
});


app.listen(5000, () => {
    console.log(`Express server running on http://localhost:${5000}`);
});