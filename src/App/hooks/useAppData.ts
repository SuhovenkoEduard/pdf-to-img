import type { FileData } from '../App.types';
import type { AppData } from './useAppData.types';

import { useState } from 'react';

export const useAppData = (): AppData => {
  const [fileData, setFileData] = useState<FileData | null>(null)
  
  const localState: AppData['localState'] = {
    fileData
  };
  
  const localActions: AppData['localActions'] = {
    setFileData
  };
  
  return {
    localState,
    localActions
  };
};
