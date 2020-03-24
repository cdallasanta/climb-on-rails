import React from 'react';
import './stylesheets/global.scss'
import Alert from './components/alert'


function App() {
  return (
    <div className="App">
      <Alert type="alert-success" messages={["test1", "test2"]}/>
    </div>
  );
}

export default App;
