import React from 'react';

export type AppDataHandlers = {
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleFileDownload: () => void;
}
