import React, { useState } from 'react'
import './App.css';
import * as pdfjsLib from 'pdfjs-dist';

import PDFJSWorker from 'pdfjs-dist/legacy/build/pdf.worker.entry'

pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJSWorker

function App() {
  const [pngUrl, setPngUrl] = useState('')

  const onChange = async (event) => {
    const { files } = event.target
    const [file] = files
    const fileReader = new FileReader()

    const url = URL.createObjectURL(file)
    console.log({ file: file, url })

    fileReader.readAsDataURL(file)
    fileReader.onload = async () => {
      const fileType = fileReader.result.split(',')[0]
      console.log({ fileType })

      if (fileType.includes('application/pdf')) {
        console.log('PDF FILE')
      }

      const pdf = await (await pdfjsLib.getDocument(url).promise)
      const firstPage = await pdf.getPage(1)

      const scale = 1;
      const outputScale = 1;
      const viewport = firstPage.getViewport({ scale: scale, });

      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d');

      canvas.width = Math.floor(viewport.width * outputScale);
      canvas.height = Math.floor(viewport.height * outputScale);
      canvas.style.width = Math.floor(viewport.width) + "px";
      canvas.style.height =  Math.floor(viewport.height) + "px";

      const transform = outputScale !== 1
        ? [outputScale, 0, 0, outputScale, 0, 0]
        : null;

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
        transform
      };

      await (await firstPage.render(renderContext).promise);

      const img = canvas.toDataURL('image/png')
      console.log(img)
      setPngUrl(img)
    }
  }

  return (
    <div className="App">
      <input type="file" onChange={onChange} />
      <img src={pngUrl} alt="#"/>
    </div>
  );
}

export default App;
