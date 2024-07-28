import express from 'express';
import cors from 'cors';
import 'dotenv/config.js';
import { CAIConfig, GetResponse } from './utils/CAIUtils.js';
import { stt, tts, translateText } from './utils/GoogleAPIUtils.js';
import { geminiUtils } from './utils/geminiUtils.js';

const CAI_AUTH_TOKEN = process.env.CAI_AUTH_TOKEN;
const CHAR_ID = 'psWB8sQ4EamN8SAUaWjvYayIfujUd9kDvSFDmw94yfE';

const app = express();

app.use(cors());
app.use(express.json());

const configStatus = await CAIConfig(CAI_AUTH_TOKEN, CHAR_ID);
console.log(configStatus);

app.post('/getResponse', async (req, res) => {
  const message = req.body;
  try {
    var rawResponse = await GetResponse(message);
    var response = rawResponse.turn.candidates[0].raw_content;
    console.log(response);

    return res.status(200).json({ response: response });
  } catch (error) {
    console.error('Error processing speech input:', error);
    res.status(500).json({ error: 'Error Generating Response' });
  }
});

app.post('/speechInput', async (req, res) => {
  const { audio, language } = req.body;

  try {
    const transcription = await stt(audio, language);
    res.json({ result: transcription });
  } catch (error) {
    console.error('Error processing speech input:', error);
    res.status(500).json({ error: 'Error processing speech input' });
  }
});

app.post('/translate', async (req, res) => {
  const { content, source, target } = req.body;

  try {
    const translation = await translateText(content, source, target);
    res.json({ result: translation });
  } catch (error) {
    console.error('Error translating text:', error);
    res.status(500).json({ error: 'Error translating text' });
  }
});

app.post('/speechOutput', async (req, res) => {
  const { text, languageCode, audioFileName } = req.body;

  try {
    var audio = await tts(text, languageCode, audioFileName);
    console.log(audio);
    res.json({ result: audio });
  } catch (error) {
    console.error('Error processing speech output:', error);
    res.status(500).json({ error: 'Error processing speech output' });
  }
});

app.post('/getContext', async (req,res) => {
    const { context, message } = req.body;
    try{
        const paraphrase = await geminiUtils(context,message);
        console.log("paraphrase: ",paraphrase);
        res.status(200).json({ result: paraphrase})
    }catch(error){
        console.error('Error getting context:', error);
        res.status(500).json({ error: 'Error getting context' });
    }
})

app.post('/getAll', async (req, res) => {
  const { audio, context, source, target } = req.body;

  var translation = "";
  var paraphrase = "";

  try {
    const transcription = await stt(audio, source);
    if(source === 'en-US'){
        paraphrase = await geminiUtils(context, transcription);
        translation = await translateText(paraphrase, source, target);
    }
    if(source === 'ta-IN'){
        translation = await translateText(transcription, source, target);
        paraphrase = await geminiUtils(context, translation);
        translation = paraphrase;
    }
    const url = await tts(translation, target, Date.now() + '.webm');

    res.status(200).json({ URL: url, Translation: translation, Lang: target });
  } catch (error) {
    console.error('Error processing speech:', error);
    res.status(500).json({ error: 'Error processing speech' });
  }
});

app.listen(5000, () => {
  console.log(`Express server running on http://localhost:5000`);
});
