import React, { Component } from 'react';
import attrs from './attrs';
class App extends Component {

  render() {
    const results = this.props.wordInfo.results.slice(0,1);
    const syllables = this.props.wordInfo.syllables;
    const pronunciation = this.props.wordInfo.pronunciation;
    
    const info = results.map((result, index) => {
    
      const attributes = attrs.map( attr => {
        const value = result[attr.name];
        return (
          <div key={index}>
            <span>
              {value ? attr.code : ''} 
            </span>
            <span>
              {value ? value.slice(0,4).join(', ') : ''}
            </span> 
          </div>
        );
      });

      return (
        <div key={index}>
          <span>
            <span>
              {result.partOfSpeech ? `.${result.partOfSpeech}.` : '' }
              {pronunciation ? pronunciation[result.partOfSpeech] : ''}
            </span>
            <span>
              {result.definition} 
            </span>
          </span>
          {attributes}
        </div>
      );
    });

    return (
      <div>
        <div><span>{this.props.word} </span> <span>{pronunciation ? pronunciation.all ? `| ${pronunciation.all} |` : `| ${pronunciation} |` : '' }</span></div>
        <div>{syllables ? syllables.count > 1 ? ` syl. ${this.props.wordInfo.syllables.list.join('.')}` : '' : ''}</div>
        {info}
      </div>
    );
  }
}

export default App;
