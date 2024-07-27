import { Storage } from '@google-cloud/storage';
import { SpeechClient } from '@google-cloud/speech';
import { Translate } from '@google-cloud/translate/build/src/v2/index.js';


const KEY_PATH = "C:\\Users\\Rohit Sinha\\Desktop\\techEthos\\Server\\speesy-430611-088b524dad3e.json";

const storage = new Storage({
    keyFilename: KEY_PATH
});

const speechCli = new SpeechClient({
    keyFilename: KEY_PATH
});


const translate = new Translate({
  keyFilename: KEY_PATH
});

const bucketName = 'audio-bucket-speesy';

async function uploadToGCS(filePath, destination) {
    try {
        await storage.bucket(bucketName).upload(filePath, {
            destination: destination,
        });
        console.log(`${filePath} uploaded to ${bucketName}.`);
        return `gs://${bucketName}/${destination}`;
    } catch (err) {
        console.error('Error uploading file:', err);
        throw err;
    }
}

async function stt(audioPath, languageCode) {
    const destination = audioPath.split('/').pop();
    const gcsUri = await uploadToGCS(audioPath, destination);

    const request = {
        audio: {
            uri: gcsUri,
        },
        config: {
            encoding: 'MP3',
            sampleRateHertz: 16000,
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

export { stt, translateText };

