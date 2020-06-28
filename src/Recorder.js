import React, {useState, useEffect} from "react";
import Axios from "axios";
import Loader from "./Loader";
import Recorder from "recorder-js/src";
import './Recorder.scss'
import configuration from "./config";
import Visualization from "./Visualization";

/*
* переменные вынесены наружу в связи с тем, что useState
* выполняет тело функционального компонента полностью, а не блок return отдельно
* */
let recorder;
let audioContext;

export default function Record(props) {
    const result = {};
    const [handlingResponse, changeStatus] = useState(false);
    const [isRecording, switchRecording] = useState(false);
    const [dataIsReceived, switchReceive] = useState(false)
    console.log(Object.keys(result).length === 0)
    const startRecord = () => {
        switchRecording(true);
        audioContext = new window.AudioContext()
        recorder = new Recorder(audioContext, {onAnalysed: data => {
            // here comes an array of sound attitude, may be visualized with canvas later
                console.log(data)
        }});
        navigator.mediaDevices.getUserMedia({audio: true}).then(stream => {
                recorder.init(stream);
                recorder.start().then(() => {
                    console.log("Начали запись")
                }).catch(err =>
                    console.log("Ошибка инициализации:", err))
            })
            .catch(err =>
                console.log('Не смогли получить поток, браток', err));
    }


    const stopRecord = () => {
        switchRecording(false);
        recorder.stop().then(({blob}) => {
            const fd = new FormData();
            const filename = 'result.wav'
            fd.append("wavfile", blob, filename);
            const config = {
                headers: { 'content-type': 'multipart/form-data' }
            }
            changeStatus(true);

            Axios.post(configuration.endpointURL, fd, config
            ).then(res => {
                switchReceive(true);
                changeStatus(false);
            }).catch(err => {
                if (err)
                    console.log(err);
            })
        })
    }

    return (
        <div className="recorder">
            <div className="button">
                {(!handlingResponse && !dataIsReceived) && <>
                    <h2>Press the button to start recording your voice</h2>
                    <div onClick={isRecording ? stopRecord : startRecord}>{isRecording ? "STOP" : "RECORD"}</div>
                </>}
                {handlingResponse && <Loader/>}
            </div>
            {dataIsReceived && <Visualization/>}
        </div>
    )
}

