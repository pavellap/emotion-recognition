import React, {useState, useEffect} from 'react';
import Record from "./Recorder";
import styled from "styled-components";
import './App.css';

const Button = styled.button``

function App() {
    return (
        <>
            <header>
                <h1>Voice emotion recognition</h1>
                <p>Application, built on neural network, will recognize your emotion</p>
            </header>
            <Record/>
        </>
    );
}

export default App;
