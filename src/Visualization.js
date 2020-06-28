import React from 'react'
import './Visualization.scss'

export default function Visualization() {
    return (
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
    )
}