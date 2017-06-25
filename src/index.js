import React from 'react';
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
        });
    }
    
});


