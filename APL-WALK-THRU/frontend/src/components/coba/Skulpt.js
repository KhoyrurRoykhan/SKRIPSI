import React, { useState } from 'react';
import './asset_skulpt/SkulptTurtleRunner.css';

const Skulpt = () => {
    const [pythonCode, setPythonCode] = useState(`# Write your turtle commands here`);
  const [output, setOutput] = useState('');

  const outf = (text) => {
    setOutput((prev) => prev + text);
  };

  const builtinRead = (x) => {
    if (window.Sk.builtinFiles === undefined || window.Sk.builtinFiles['files'][x] === undefined) {
      throw `File not found: '${x}'`;
    }
    return window.Sk.builtinFiles['files'][x];
  };

  const runit = () => {
    setOutput('');
    const imports = "from turtle import *\n";
    const prog = imports + pythonCode;
    
    window.Sk.pre = "output";
    window.Sk.configure({ output: outf, read: builtinRead });
    (window.Sk.TurtleGraphics || (window.Sk.TurtleGraphics = {})).target = 'mycanvas';

    const myPromise = window.Sk.misceval.asyncToPromise(() => 
      window.Sk.importMainWithBody('<stdin>', false, prog, true)
    );

    myPromise.then(
      () => console.log('success'),
      (err) => setOutput((prev) => prev + err.toString())
    );
  };

  return (
    <div className="skulpt-container">
      <div className="editor-section">
        <h3>Python Turtle Code Editor</h3>
        <textarea
          value={pythonCode}
          onChange={(e) => setPythonCode(e.target.value)}
          rows="20"
          placeholder="Write your Python Turtle commands here..."
        />
        <button onClick={runit}>Run Code</button>
        <pre className="output">{output}</pre>
      </div>
      <div className="canvas-section">
        <div id="mycanvas"></div>
      </div>
    </div>
  );
}

export default Skulpt
