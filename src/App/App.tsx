import React from 'react'
import { useAppData } from './hooks';
import { useAppDataHandlers } from './hooks';

import './app.scss';

export const App = () => {
  const { localState, localActions } = useAppData();
  
  const handlers = useAppDataHandlers({
    localState,
    localActions
  })
  
  return (
    <div className="app">
      <button
        className="app__download-button"
        disabled={!localState.fileData}
        onClick={handlers.handleFileDownload}>
        Download
      </button>
      <input type="file" onChange={handlers.handleFileChange} />
      {localState.fileData && (
        <img src={localState.fileData.dataUrl} alt="#"/>
      )}
    </div>
  );
};
