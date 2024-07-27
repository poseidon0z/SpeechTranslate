import { useEffect, useState } from 'react';
import {ReactMediaRecorder, useReactMediaRecorder} from 'react-media-recorder';

function AudioRecorder () {
    const {status,startRecording,stopRecording,mediaBlobUrl} = useReactMediaRecorder({audio:true});

    return(
        <div>
            <p>{status}</p>
            <button onClick={startRecording}>Start Recording</button>
            <button onClick={stopRecording}>Stop Recording</button>
            <button onClick={startRecording}>Re-Record</button>
            <audio src={mediaBlobUrl} autoPlay controls></audio>
        </div>
    );
}
export default AudioRecorder;