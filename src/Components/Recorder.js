import React, {Fragment, useCallback, useState} from "react";
import Axios from "axios";
import {Button, CircularProgress, Typography, withStyles} from '@material-ui/core'
import Recorder from "recorder-js/src";
import configuration from "../config/config";
import { Link } from 'react-router-dom'

import './Recorder.css'

/*
* переменные вынесены наружу в связи с тем, что useState
* выполняет тело функционального компонента полностью, а не блок return отдельно
* */
let recorder;
let audioContext;

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

export default function Record() {
    const [isFetching, setFetching] = React.useState(false);
    const [isRecording, setRecording] = React.useState(false);
    const [isFetched, setFetched] = React.useState(false);
    const [data, setData] = React.useState({});

    const startRecord = React.useCallback(() => {
        setRecording(true);
        audioContext = new window.AudioContext()
        recorder = new Recorder(audioContext, {
            onAnalysed: data => {
                // todo: implement this logic
                console.log('data: ', data);
            }
        });
        navigator.mediaDevices.getUserMedia({audio: true}).then(stream => {
            recorder.init(stream);
            recorder.start().then(() => {
                console.log("Recording has started")
            }).catch(err =>
                console.log("Initialization error:", err))
        })
            .catch(err =>
                console.log('Cannot get stream: ', err));
    }, [])


    const stopRecord = React.useCallback(() => {
        setRecording(false);
        recorder.stop().then(async ({blob}) => {
            const fd = new FormData();
            const filename = 'result.wav'
            fd.append("wavfile", blob, filename);
            const config = {
                headers: {'content-type': 'multipart/form-data'}
            }
            setFetching(true);
            try {
                const response = await Axios.post(configuration.endpointURL, fd, config)
                setFetched(true);
                setFetching(false);
                setData(response.data);
            } catch (e) {

            }
        })
    }, [])

    const handleRecordClick = useCallback(() => {
        if (isFetching) {
            return;
        }
        if (isRecording) {
            stopRecord();
        } else {
            startRecord()
        }
    }, [isRecording, stopRecord, isFetching])

    return (
        <div className="recorder">
            <div className="container">
                <h2 className="title">Нажмите кнопку для того, чтобы начать запись голоса</h2>
                <ColorButton className="button button__long" onClick={handleRecordClick}>
                    {isRecording ? "стоп" : "старт"}
                </ColorButton>
            </div>

            <div className="result">
                {isFetching && <CircularProgress/>}
                {isFetched && !isFetching && (
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

