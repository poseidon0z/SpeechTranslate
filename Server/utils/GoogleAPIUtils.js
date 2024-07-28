import { Storage } from '@google-cloud/storage';
import { SpeechClient } from '@google-cloud/speech';
import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import { Translate } from '@google-cloud/translate/build/src/v2/index.js';

import util from 'util';
import fs from 'fs';



const KEY_PATH = "C:\\Users\\Rohit Sinha\\Desktop\\techEthos\\Server\\speesy-430611-088b524dad3e.json";

const storage = new Storage({
    keyFilename: KEY_PATH
});

const speechCli = new SpeechClient({
    keyFilename: KEY_PATH
});

const  textCli = new TextToSpeechClient({
  keyFile: KEY_PATH
})


const translate = new Translate({
  keyFilename: KEY_PATH
});

const bucketName = 'audio-bucket-speesy';

async function stt(audioBuffer, languageCode) {
  console.log(audioBuffer);
  const request = {
      audio: {
          content: audioBuffer,
      },
      config: {
          encoding: 'WEBM_OPUS',
          sampleRateHertz: 48000,
          languageCode: languageCode,
      }
  };

  try {
      const [operation] = await speechCli.longRunningRecognize(request);
      console.log('Waiting for operation to complete...');
      const [response] = await operation.promise();
      console.log('Transcription:');
      response.results.forEach(result => {
          console.log(result.alternatives[0].transcript);
      });
      return response.results.map(result => result.alternatives[0].transcript).join('\n');
  } catch (error) {
      console.error('Error transcribing audio:', error);
      throw error;
  }
}

async function tts(text, languageCode, audioFileName) {
  const request = {
      input: { text: text },
      voice: { languageCode: languageCode, ssmlGender: 'NEUTRAL' },
      audioConfig: { audioEncoding: 'MP3' }
  };

  try {
      const [response] = await textCli.synthesizeSpeech(request);
      
      const writeFile = util.promisify(fs.writeFile);
      await writeFile(audioFileName, response.audioContent, 'binary');
      console.log(`Audio content written to file: ${audioFileName}`);
      
      const file = storage.bucket(bucketName).file(audioFileName);
      await file.save(response.audioContent);
      
      await file.makePublic();

      const publicUrl = `https://storage.googleapis.com/${bucketName}/${audioFileName}`;
      console.log(`File uploaded to ${publicUrl}`);
      
      return publicUrl;
  } catch (error) {
      console.error('Error synthesizing or uploading speech:', error);
      throw error;
  }
}

async function translateText(content, source, target){
  try{
    const [translation] = await translate.translate(content,{
      from: source,
      to: target
    });
    console.log(`Translation: ${translation}`);
    return translation;

  }catch(error){
    console.error('Error translating text:', error);
    throw error;
  }
}

export { stt, tts, translateText };

