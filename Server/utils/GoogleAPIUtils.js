import { Storage } from '@google-cloud/storage';
import { SpeechClient } from '@google-cloud/speech';

const storage = new Storage({
    keyFilename: "C:\\Users\\Rohit Sinha\\Desktop\\techEthos\\Server\\speesy-430611-088b524dad3e.json"
});

const speechCli = new SpeechClient({
    keyFilename: "C:\\Users\\Rohit Sinha\\Desktop\\techEthos\\Server\\speesy-430611-088b524dad3e.json"
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

export { stt };

