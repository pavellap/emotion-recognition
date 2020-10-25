import React, {useState} from 'react';
import Record from "./Components/Recorder";
import styled from "styled-components";
import './Styles/App.scss';
import Footer from "./Components/Footer";
import './Styles/normalize.scss'

let Wrapper = styled.section`
  height: 100vh;
  width: 100%;
`




function App() {
    // eslint-disable-next-line no-unused-vars
    const [receivedAnswer, changeStatus] = useState(false);
    const handleHeightOfMainSection = (val) => {
        console.log("Executing code")
        if (val) {
            Wrapper = styled.section`width: 100%`;
            changeStatus(true)
        }
    }
    return (
        <>
            <Wrapper>
                <header>
                    <h1>Voice emotion recognition</h1>
                    <p>Application, built on neural network, will recognize your emotion</p>
                </header>
                <Record status={(val) => handleHeightOfMainSection(val)}/>
            </Wrapper>
            <Footer/>
        </>
    );
}

export default App;
