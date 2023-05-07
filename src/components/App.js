import React, {useState, useEffect} from "react";
import Editor from "./Editor";
import uselocalstorage from "../hooks/uselocalstorage";
function App() {
  const [html, setHtml ] = uselocalstorage('html', '');
  const [Css, setCss ] = useState('css', '');
  const [js, setJS ] = useState('js','');
  const [srcDoc, setSrcDoc] = useState('');

  useEffect(() => {
    const timeout = setTimeout(()=> {
      setSrcDoc('
        <html>
          <body>${html}</body>,
          <style>${Css}</style>,
          <script>${js}</script>
        </html>    
      ')
    },250)

    return () => clearTimeout(timeout)
  },[html, Css, js])
  return (
    <>
      <div className="pane top-pane">
        <Editor language="xml" 
        displayName="HTML" 
        value={html} 
        onChange={setHtml}/>
        <Editor language="css" 
        displayName="CSS" 
        value={Css} 
        onChange={setCss}/>
        <Editor language="javascript" 
        displayName="JavaScript" 
        value={js} 
        onChange={setJS}/>
      </div>
      <div className="pane">
        <iframe
        srcDoc="{srcDoc"
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </>
  )
}

export default App;
