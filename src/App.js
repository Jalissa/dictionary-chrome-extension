import React, { Component } from 'react';
import attrs from './attrs';
class App extends Component {

  render() {
    const results = this.props.wordInfo.results.slice(0,1);
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
              {result.partOfSpeech ? `.${result.partOfSpeech}.` : '' }
              {this.props.wordInfo.pronunciation ? 
                this.props.wordInfo.pronunciation[result.partOfSpeech] : ''}
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
        <div>{this.props.word} <span>{this.props.wordInfo.pronunciation ? `| ${this.props.wordInfo.pronunciation.all} |` : '' }</span></div>
        <div>{this.props.wordInfo.syllables.count > 1 ? ` syl. ${this.props.wordInfo.syllables.list.join('.')}` : ''}</div>
        {info}
      </div>
    );
  }
}

export default App;
