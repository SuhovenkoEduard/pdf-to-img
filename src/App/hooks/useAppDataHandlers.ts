import type { AppData } from './useAppData.types';
import type { AppDataHandlers } from './useAppDataHandlers.types';

import { downloadFileFromDataUrl, getImageFileDataFromFile } from '../App.helpers';

export const useAppDataHandlers = ({
  localState,
  localActions
}: {
  localState: AppData['localState'];
  localActions: AppData['localActions'];
}) => {
  const handleFileChange: AppDataHandlers['handleFileChange'] = async (event) => {
    const { files } = event.target;
    if (!files || !files.length) {
      return;
    }
    
    localActions.setFileData(await getImageFileDataFromFile(files[0]));
  };
  
  const handleFileDownload: AppDataHandlers['handleFileDownload'] = () => {
    if (!localState.fileData) {
      return;
    }
    
    downloadFileFromDataUrl(localState.fileData.name, localState.fileData.dataUrl);
  };
  
  return {
    handleFileChange,
    handleFileDownload
  };
};
