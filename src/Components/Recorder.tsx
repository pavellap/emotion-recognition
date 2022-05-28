import React, {Fragment, useState} from "react";
import Axios from "axios";
import {Button, Typography, withStyles} from '@material-ui/core'
import Recorder from "recorder-js";
import {Link} from 'react-router-dom';
import {API_URLS} from "../config/config";
import {Emotions, Genders} from "../types";
import Recognise from '../Assets/Recognise'
import Play from '../Assets/Play'
import './Recorder.css'

// todo: move to utils
const wait = (ms: number) => new Promise<void>((res) => setTimeout(() => res(), ms));

// todo: refactor Button
const ColorButton = withStyles(() => ({
    root: {
        backgroundColor: "#130E12",
        color: '#E4E1E6',
        height: 65,
        width: 200,
        border: '2px solid',
        borderRadius: 35,
        borderColor: '#43E090',
        fontSize: 16,
        fontWeight: 600,
        "&:hover": {
            backgroundColor: '#43E090',
            color: "#130E12"
        }
    },
}))(Button);

const ColorTextHeader = withStyles(() => ({
    root: {
        color: '#E4E1E6',
        fontSize: 32,
        fontWeight: 500,
        alignSelf: 'center',
    },
}))(Typography);

const ColorText = withStyles(() => ({
    root: {
        color: '#E4E1E6',
        opacity: .7,
        fontFamily: 'monospace',
        fontSize: 22,
        fontWeight: 500,
        textTransform: 'capitalize',
        "&:hover": {
            color: "#FFF",
            opacity: 1,
        }
    },
}))(Typography);

const ColorTextSample = withStyles(() => ({
    root: {
        color: '#E4E1E6',
        opacity: .7,
        fontFamily: 'monospace',
        fontSize: 22,
        fontWeight: 500,
        textTransform: 'capitalize',
    },
}))(Typography);

const DEFAULT_UPLOAD_FILENAME = 'audio.wav'

type ApiResponseType = {
    emotion: Emotions,
    gender: Genders,
    success: 'true' | 'false',
    error: boolean;
    reason?: 'silence'
}

const INITIAL_STATE: ApiResponseType = {
    emotion: null,
    gender: null,
    success: null,
    error: null,
    reason: null
}

const colorWaveMapper = {
    'angry': '#FF5C5C',
    'happy': '#FDDD48',
    'neutral': '#FFF',
    'sad': '#5B8DEF',
}

/** Длина отрезка в секундах */
const RECORD_BASE_INTERVAL = 3 * 1000;

let instantRecorder: Recorder;


const Record: React.FC = () => {
    const [isFetching, setFetching] = React.useState<boolean>(false);
    const [isRecording, setRecording] = React.useState<boolean>(false);
    const [isFetched, setFetched] = React.useState<boolean>(false);
    const [data, setData] = React.useState<ApiResponseType>(INITIAL_STATE);
    const [interval, setIntervalInstance] = React.useState<NodeJS.Timer>();
    const [colorWave, setColorWave] = useState('#FFF')


    const startRecord = React.useCallback(async (recorder: Recorder) => {
        try {
            if (!recorder) {
                console.log('no recorder start')
                return;
            }
            setRecording(true);
            await recorder.start();
        } catch (e) {
            console.log('caught error on start record: ', e);
        }
    }, [])


    const uploadAudio = React.useCallback(async (blob: Blob): Promise<void> => {
        try {
            const fd = new FormData();
            fd.append("wavfile", blob, DEFAULT_UPLOAD_FILENAME);
            setFetching(true);
            const response = await Axios.post<ApiResponseType>(API_URLS.audio, fd, {headers: {'content-type': 'multipart/form-data'}})
            setFetched(true);
            setFetching(false);
            setData(response.data);
            response.data.emotion && setColorWave(colorWaveMapper[response.data.emotion])
        } catch (e) {
            console.log('error during upload occurred: ', e);
        }
    }, [])

    const stopRecord = React.useCallback(async (recorder: Recorder): Promise<Blob> => {
        try {
            if (!recorder) {
                console.log('no recorder stop')
                return;
            }
            setRecording(false);
            const {blob} = await recorder.stop();
            return blob;
        } catch (e) {
            console.log('caught error on record stop: ', e);
        }
    }, [])

    const handleRecordClick = React.useCallback(async () => {
        if (isFetching) {
            return;
        }
        if (isRecording) {
            const blob = await stopRecord(instantRecorder);
            await uploadAudio(blob);
        } else {
            instantRecorder = new Recorder(new AudioContext());
            const stream = await navigator.mediaDevices.getUserMedia({audio: true});
            await instantRecorder.init(stream)
            await startRecord(instantRecorder)
        }
    }, [isRecording, stopRecord, isFetching])

    const startLiveRecord = React.useCallback(() => {
        if (isRecording) {
            console.log('clearing');
            clearInterval(interval)
        } else {
            startIntervalRecord();
        }
    }, [isRecording, interval])

    const startIntervalRecord = React.useCallback(async (): Promise<void> => {
        setIntervalInstance(setInterval(async () => {
            const recorder = new Recorder(new AudioContext());
            const stream = await navigator.mediaDevices.getUserMedia({audio: true});
            await recorder.init(stream);
            await startRecord(recorder);
            await wait(RECORD_BASE_INTERVAL);
            const blob = await stopRecord(recorder);
            await uploadAudio(blob);
        }, RECORD_BASE_INTERVAL + 100))
    }, [])

    return (
        <div>
            <div className="container">
                <div className="containerButtons" onClick={startLiveRecord}>
                    <ColorButton variant={'outlined'} onClick={startLiveRecord}>
                        Live record
                    </ColorButton>
                    <ColorButton variant={'outlined'} onClick={handleRecordClick}>
                        {isRecording ? "Stop" : "Start"}
                    </ColorButton>
                </div>
                <div className="containerResults" onClick={startLiveRecord}>
                    <ColorTextHeader>Result</ColorTextHeader>
                    <div className='textContainer'>
                        <ColorText>Gender: </ColorText>
                        <ColorText>{data?.gender}</ColorText>
                    </div>
                    <div className='textContainer'>
                        <ColorText>Emotion: </ColorText>
                        <ColorText>{data?.emotion}</ColorText>
                    </div>
                </div>
                <div className="containerExamples" onClick={startLiveRecord}>
                    <div className='sampleContainer'>
                        <div className='sampleTextContainer'>
                            <ColorTextSample>Angry</ColorTextSample>
                            <div style={{width: 10}}/>
                            <ColorTextSample>Male</ColorTextSample>
                        </div>
                        <div className='sampleTextContainer'>
                            <Play/>
                            <div style={{width: 10}}/>
                            <Recognise/>
                        </div>
                    </div>
                </div>
            </div>
            {/*{data.error && <div>Произошла ошибка, возможно вы записали тишину или слишком длинный фрагмент</div>}*/}
            <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                 viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
                <defs>
                    <path id="gentle-wave"
                          d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"/>
                </defs>
                <g className="parallax">
                    <use className='wave' xlinkHref="#gentle-wave" x="48" y="0" opacity={0.7} fill={colorWave}/>
                    <use className='wave' xlinkHref="#gentle-wave" x="48" y="3" opacity={0.5} fill={colorWave}/>
                    <use className='wave' xlinkHref="#gentle-wave" x="48" y="5" opacity={0.3} fill={colorWave}/>
                    <use className='wave' xlinkHref="#gentle-wave" x="48" y="7" fill={colorWave}/>
                </g>
            </svg>
            <div className='coloredEndWave' style={{background: colorWave}}/>
        </div>
    )
}

export default React.memo(Record);
