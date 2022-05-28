import React, {Fragment } from "react";
import Axios from "axios";
import { Button, Typography, withStyles } from '@material-ui/core'
import Recorder from "recorder-js";
import { Link } from 'react-router-dom';
import { API_URLS} from "../config/config";
import { Emotions, Genders } from "../types";


import './Recorder.css'

// todo: move to utils
const wait = (ms: number) => new Promise<void>((res) => setTimeout(() => res(), ms));

// todo: refactor Button
const ColorButton = withStyles(() => ({
    root: {
        backgroundColor: "#a85d5c",
        color: '#fff',
        height: 56,
        fontSize: 16,
        "&:hover": {
            backgroundColor: "#a85d5c",
            color: '#fff'
        }
    },
}))(Button);

const DEFAULT_UPLOAD_FILENAME = 'audio.wav'

type ApiResponseType = {
    emotion: Emotions,
    gender: Genders,
    success: 'true' | 'false',
    error: boolean;
    reason?: 'silence'
}

const INITIAL_STATE: ApiResponseType = {
    emotion: Emotions.angry,
    gender: null,
    success: null,
    error: null,
    reason: null
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


    const startRecord = React.useCallback(async (recorder: Recorder) => {
        try {
            if (!recorder) {
                console.log('no recorder start')
                return;
            }
            setRecording(true);
            await recorder.start();
        }
        catch (e) {
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
        }
        catch (e) {
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
        }
        catch (e) {
            console.log('caught error on record stop: ', e);
        }
    }, [])

    const handleRecordClick = React.useCallback(async() => {
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
        }
        else {
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
        <div className="recorder">
            <div className="container">
                <h2 className="title">Нажмите кнопку для того, чтобы начать запись голоса</h2>
                <ColorButton className="button button__long" onClick={startLiveRecord}>
                    Live record
                </ColorButton>
                <ColorButton className="button button__long" onClick={handleRecordClick}>
                    {isRecording ? "стоп" : "старт"}
                </ColorButton>
            </div>

            <div className="result">
                {/*{isFetching && <CircularProgress/>}*/}
                {isFetched/* && !isFetching */&& (
                    <Fragment>
                        <Typography variant='h4'>Результат обработки вашего голоса</Typography>
                        <Typography variant='h6'>Эмоция: {data.emotion}</Typography>
                        <Typography variant='h6'>Гендер: {data.gender}</Typography>
                        <h2 className="home-page_title">
                            Хотите узнать, как это работает?
                        </h2>
                        <Link to='/info'>
                            <ColorButton className="button button__long">
                                Узнать
                            </ColorButton>
                        </Link>
                    </Fragment>
                )}
            </div>
            {data.error && <div>Произошла ошибка, возможно вы записали тишину или слишком длинный фрагмент</div>}
        </div>
    )
}

export default React.memo(Record);
