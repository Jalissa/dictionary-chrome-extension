import React, { Component } from 'react';

class App extends Component {

  componentDidMount(){
    console.log(this.props);

  }

  render() {
   /* const results = this.state.wordInfo.results.map((result, index) => {
      const pronunciation = this.state.pronunciation;
      const partOfSpeech = result.pronunciation;
      const pron = pronunciation[partOfSpeech] ? pronunciation[partOfSpeech] : '';
      return (
        <ul key={index}>
          <li>{result.definition}</li>
          <li>{partOfSpeech} { pron }</li>
          {result.synonyms ? <li>{result.synonyms.join(', ')}</li> : '' }
          {result.antonyms ? <li>{result.antonyms.join(', ')}</li> : '' }
          {result.examples ? <li>{result.examples.join('\n')}</li> : '' }
        </ul>
      );
    });
*/
    return (
      <div>
        <h6>{this.props.word}</h6>
      </div>
    );
  }
}

export default App;
