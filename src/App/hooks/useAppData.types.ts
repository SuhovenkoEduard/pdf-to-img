import type { FileData } from "../App.types";

import React from "react";

export type AppDataLocalState = {
  fileData: FileData | null;
};

export type AppDataLocalActions = {
  setFileData:  React.Dispatch<React.SetStateAction<FileData | null>>;
};

export type AppData = {
  localState: AppDataLocalState;
  localActions: AppDataLocalActions;
};
