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
            "X-Mashape-Key": process.env.REACT_APP_KEY
        });
        fetch(`https://wordsapiv1.p.mashape.com/words/${wordSelected.toLowerCase()}`, { headers })
        .then((response) => response.json())
        .then((data) => {
            if(data.results){
                const position = getElementPosition(window.getSelection());
                const maxWidth = parseInt(window.getComputedStyle(container).getPropertyValue('max-width'));
                const top = position.top + position.height;
                const left = position.left - Math.abs(maxWidth/2 - position.width);
                
                container.style.padding = '5px';                                
                container.style.top = `${top < 0 ? 0 : top}px`;
                container.style.left = `${left < 0 ? 0 : left}px`;

                render(<App 
                        word={wordSelected} 
                        wordInfo={data}  
                        attrLimit={process.env.REACT_APP_ATTR_LIMIT} 
                        definitionLimit={process.env.REACT_APP_DEF_LIMIT}/>
                    , container);
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

const getElementPosition = (sel) => {
    let range;
    if (sel.getRangeAt) {
        range = sel.getRangeAt(0).cloneRange();
    } else {
        // Older WebKit doesn't have getRangeAt
        range = document.createRange();
        range.setStart(sel.anchorNode, sel.anchorOffset);
        range.setEnd(sel.focusNode, sel.focusOffset);

        if (range.collapsed !== sel.isCollapsed) {
            range.setStart(sel.focusNode, sel.focusOffset);
            range.setEnd(sel.anchorNode, sel.anchorOffset);
        }
    }

    range.collapse(false);

    return range.getBoundingClientRect();
}
