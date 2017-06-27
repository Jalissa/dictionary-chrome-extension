import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import App from './App';
import './index.css';

const elementId = '__793589eb_dictionary-container';

const div = document.createElement('div');
const id = document.createAttribute('id');
id.value = elementId;
div.setAttributeNode(id);
document.getElementsByTagName('html')[0].appendChild(div);

document.getElementsByTagName('body')[0].addEventListener('dblclick', function(evt){
    const wordSelected = window.getSelection().toString().trim();
    if(wordSelected){
        const headers = new Headers({
            "Accept": "application/json",
            "X-Mashape-Key": "SECRET_KEY",
        });
        fetch(`https://wordsapiv1.p.mashape.com/words/${wordSelected}`, { headers })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            console.log(data.results.slice(0,1));
            document.getElementById(elementId).style.padding = '5px';
            render(<App word={wordSelected} wordInfo={data || {}} />, 
                document.getElementById(elementId));
        }, () => {
            document.getElementById(elementId).style.padding = '0px';
        });
    }
});

document.querySelectorAll(`body:not(#${elementId})`)[0].addEventListener('click', 
    function(evt){
        document.getElementById(elementId).style.padding = '0px';    
        unmountComponentAtNode(document.getElementById(elementId));
    }
);


