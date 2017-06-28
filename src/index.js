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

const container = document.getElementById(elementId);

document.getElementsByTagName('body')[0].addEventListener('dblclick', function(evt){
    const wordSelected = window.getSelection().toString().trim();
    if(wordSelected){
        const headers = new Headers({
            "Accept": "application/json",
        });
        fetch(`https://wordsapiv1.p.mashape.com/words/${wordSelected.toLowerCase()}`, { headers })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            console.log(evt);
            if(data.results){
                container.style.padding = '5px';
                container.style.top = `${evt.clientY + 10}px`;
                container.style.left = `${evt.clientX - (evt.offsetX/4)}px`;
                
                render(<App word={wordSelected} wordInfo={data || {}} />, container);
            }
        }, () => {
            container.style.padding = '0px';
        });
    }
});

const unmountComponent = (evt) => {
    container.style.padding = '0px';    
    unmountComponentAtNode(container);
}

document.querySelectorAll(`body:not(#${elementId})`)[0].addEventListener('click', unmountComponent);
window.addEventListener('scroll', unmountComponent);


