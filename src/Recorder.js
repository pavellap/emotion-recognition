import React, {useState, useEffect} from "react";
import Axios from "axios";
import Loader from "./Loader";
import Recorder from "recorder-js/src";
import './Recorder.scss'

/*
* переменные вынесены наружу в связи с тем, что useState
* выполняет тело функционального компонента полностью, а не блок return отдельно
* */
let recorder;
let audioContext;

export default function Record(props) {
    const [handlingResponse, changeStatus] = useState(false);
    const [isRecording, switchRecording] = useState(false);

    const startRecord = () => {
        switchRecording(true);
        audioContext = new window.AudioContext()
        recorder = new Recorder(audioContext, {onAnalysed: data => {
            // здесь массив значений, потом через канвас сделать визуализатор
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
            console.log("Current location:", window.location.href + '/audio')
            const path = "http://localhost:3000/audio";
            changeStatus(true);
            Axios.post(path, fd, config
            ).then(res => {
                console.log(res);
                changeStatus(false)
            }).catch(err => {
                if (err)
                    console.log(err);
            })
        })
    }

    return (
        <div className="recorder">
            <div className="button">
                <div onClick={isRecording ? stopRecord : startRecord}>{isRecording ? "STOP" : "RECORD"}</div>
                <h3>Emotion: happy</h3>
                <h3>Gender: Male</h3>
            </div>
            <div className="meta">
                <h2>We have got some features of your voice. Look at them!</h2>
                <div className='pics-container'>
                    <div>
                        <div>
                            <h4>Spectrogram</h4>
                            <p>Visual representation of the spectrum of frequencies of a signal as it varies with time</p>
                        </div>
                        <img src="./chroma.png" alt="waveform"/>
                    </div>
                    <div>
                        <div>
                            <h4>Waveform</h4>
                            <p>The shape of its graph as a function of time, independent of its time
                                and magnitude scales and of any displacement in time.</p>
                        </div>
                        <img src="./wave.png" alt="waveform"/>
                    </div>
                </div>
            </div>
        </div>
    )
}



/*useEffect(() => {
    //changeStatus(true)
    console.log("Component did mount")
    Axios.get('http://localhost:9000/test').then((res) => {
        setTimeout(() => {
            console.log(res.data)
            changeStatus(false)
        }, 5000)
    })
}, [])

 */