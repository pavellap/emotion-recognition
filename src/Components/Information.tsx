import React from 'react'
import '../Styles/Information.css'
import {Stepper, Step, StepLabel} from "@material-ui/core";


function Information() {
    return (
        <section className='info-container'>
            <div className='info-container-description'>
                <div>
                    <h3>Principle</h3>
                    <p>Neural network gets the recording of your voice extracts some key features of it
                        compares with earlier saved data and make a decision: what kind of emotion your voice contains.
                    </p>
                </div>
                <div>
                    <h3>Steps</h3>
                    <p>First, we record your voice and anonymously send binary file to our remote server,
                        where we transform it to wav-format and 'feed' to out neural network.</p>
                </div>
            </div>
            <div className='stepper-container'>
                <Stepper alternativeLabel activeStep={2}>
                    {['Recording your voice', 'Sending binary stream to server',
                    'Neural network detects emotion', 'Responding back, you get your request'].map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </div>
        </section>
    )
}

export default React.memo(Information);