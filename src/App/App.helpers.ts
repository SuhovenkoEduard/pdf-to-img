import * as pdfjsLib from 'pdfjs-dist';
import { FileData } from './App.types';

export const IMAGE_FORMATS = {
  png: 'image/png',
  jpeg: 'image/jpeg'
};

export const IMAGE_EXTENSIONS = {
  [IMAGE_FORMATS.png]: 'png',
  [IMAGE_FORMATS.jpeg]: 'jpeg'
};

export const convertPDFtoImage = async (file: Blob, format = IMAGE_FORMATS.png) => {
  const url = URL.createObjectURL(file);
  const pdf = await pdfjsLib.getDocument(url).promise;
  const firstPage = await pdf.getPage(1);

  const scale = 1;
  const outputScale = 1;
  const viewport = firstPage.getViewport({ scale: scale, });

  const canvas = document.createElement('canvas');
  const context: CanvasRenderingContext2D = canvas.getContext('2d')!;

  canvas.width = Math.floor(viewport.width * outputScale);
  canvas.height = Math.floor(viewport.height * outputScale);
  canvas.style.width = Math.floor(viewport.width) + 'px';
  canvas.style.height =  Math.floor(viewport.height) + 'px';

  const transform = outputScale !== 1
    ? [outputScale, 0, 0, outputScale, 0, 0]
    : undefined;

  const renderContext = {
    canvasContext: context,
    viewport: viewport,
    transform
  };

  await firstPage.render(renderContext).promise;

  URL.revokeObjectURL(url);

  const blob: Blob = await new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject();
      }
    });
  });
  
  return {
    file: new File([blob], file.name.replace('pdf', IMAGE_EXTENSIONS[format]), {
      type: format
    }),
    dataUrl: canvas.toDataURL(format)
  };
};

export const fetchFileDataUrl = async (file: Blob): Promise<string> => {
  const fileReader = new FileReader();
  return await new Promise(resolve => {
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result as string);
    };
  });
};

export const downloadFileFromDataUrl = (fileName: string, dataUrl: string) => {
  const link = document.createElement('a');
  link.download = fileName;
  link.href = dataUrl;
  link.click();
};

export const getImageFileDataFromFile = async (file: Blob): Promise<FileData> => {
  if (file.type === 'application/pdf') {
    const { file: imageFile, dataUrl: imageDataUrl } = await convertPDFtoImage(file);
    return {
      name: imageFile.name,
      dataUrl: imageDataUrl
    };
  } else {
    const fileDataUrl = await fetchFileDataUrl(file);
    return {
      name: file.name,
      dataUrl: fileDataUrl
    };
  }
};
