import React, {useEffect, useState} from 'react';
import axios from 'axios';

import {urlData} from '../../config';

import Content from '../content';

import preloader from '../../assets/img/preloader.gif';

import './style.scss'

function App() {

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios(urlData);
                setData(result.data);
            } catch (e) {
                console.warn(e);
                setData(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="app">
            {data.length > 0 ? (
                <Content data={data}/>
            ) : data === false ? (
                <h2 className="app__error">Ошибка, данные не получены!</h2>
            ) : (
                <img src={preloader} alt="" className="app__preloader"/>
            )}
        </div>
    );
}

export default App;
