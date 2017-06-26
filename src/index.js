import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import App from './App';
import './index.css';

const div = document.createElement('div');
const id = document.createAttribute('id');
id.value = 'dictionary-container';
div.setAttributeNode(id);
document.getElementsByTagName('html')[0].appendChild(div);

document.getElementsByTagName('body')[0].addEventListener('dblclick', function(evt){
    const wordSelected = window.getSelection().toString().trim();
    if(wordSelected){
        fetch('http://api.urbandictionary.com/v0/define?term=word')
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            document.getElementById('dictionary-container').style.padding = '5px';
            render(<App word={wordSelected} wordInfo={null} />, document.getElementById('dictionary-container'));
        });
        
    }
});

document.querySelectorAll('body:not(#dictionary-container)')[0].addEventListener('click', function(evt){
    document.getElementById('dictionary-container').style.padding = '0px';    
    unmountComponentAtNode(document.getElementById('dictionary-container'));
});


