import React, {Component} from 'react';
import ReactDom from 'react-dom';
import EditorTest from  './editortest/EditorTest';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


const App = () => (
    <MuiThemeProvider>
      <EditorTest />
    </MuiThemeProvider>
  );

ReactDom.render(<App />, document.getElementById('app'), null);