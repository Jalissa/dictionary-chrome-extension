import React, { Component } from 'react';
import attrs from './attrs';

const App = (props) => {
  const results = props.wordInfo.results.slice(0, props.definitionLimit);
  const syllables = props.wordInfo.syllables;
  const pronunciation = props.wordInfo.pronunciation;
    
    const info = results.map((result, index) => {
    
      const attributes = attrs.map( attr => {
        const value = result[attr.name];
        return (
          <div key={attr.code} className="separation-attrs indentation">
            <span className="color reduced-font">
              { value ? `${attr.code} ` : ''} 
            </span>
            <span className="italic reduced-font">
              {value ? value.slice(0, props.attrLimit).join(', ') : ''}
            </span> 
          </div>
        );
      });

      const partOfSpeech = result.partOfSpeech;
      return (
        <div key={index} className="separation-definition">
          <span>
            <span className="italic color reduced-font">
              {partOfSpeech ? `.${partOfSpeech}. ` : '' }
              {pronunciation && pronunciation[partOfSpeech]? `| ${pronunciation[partOfSpeech]} | `: ''}
            </span>
            <span>
              {result.definition}.
            </span>
          </span>
          {attributes}
        </div>
      );
    });

    return (
      <div>
        <div><span className="bold">{props.word} </span> <span className="reduced-font italic">{pronunciation ? pronunciation.all ? `| ${pronunciation.all} |` : `| ${pronunciation} |` : '' }</span></div>
        <div className="main-space color italic reduced-font">{syllables ? syllables.count > 1 ? ` syl. ${props.wordInfo.syllables.list.join('-')}` : '' : ''}</div>
        {info}
      </div>
    );
}

export default App;
