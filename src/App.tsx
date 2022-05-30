import React, { useState, useRef, useEffect } from 'react';
import mergeImages from 'merge-images-v2';

import FileUploadModal from './components/FileUploadModal';
import { UploadedFile, Dimension } from './types';
import './App.scss';
import Sidebar from './layout/Sidebar';

function App() {
  const [showFileUploadModal, setShowFileUploadModal] = useState(false);
  const [uploadModalName, setUploadModalName] = useState('');
  const [photos, setPhotos] = useState<UploadedFile[]>([]);
  const [frames, setFrames] = useState<UploadedFile[]>([]);
  const [backgrounds, setBackgrounds] = useState<UploadedFile[]>([]);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [selectedPhoto, setSelectedPhoto] = useState<UploadedFile | null>(null);
  const [selectedFrame, setSelectedFrame] = useState<UploadedFile | null>(null);
  const [selectedBackground, setSelectedBackground] =
    useState<UploadedFile | null>(null);
  const [layoutDimension, setLayoutDimension] = useState<Dimension>({
    width: 0,
    height: 0,
  });
  const [frameDimension, setFrameDimension] = useState<Dimension>({
    width: 0,
    height: 0,
    thickness: 0,
  });
  const editorRef = useRef<HTMLDivElement>(null);
  const resultImageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setLayoutDimension({
      width: editorRef.current?.offsetWidth || 0,
      height: editorRef.current?.offsetHeight || 0,
    });
    setFrameDimension({
      width: editorRef.current?.offsetWidth || 0,
      height: editorRef.current?.offsetHeight || 0,
      thickness: 0,
    });
  }, []);

  const showModal = (name: string) => {
    setUploadModalName(name);
    setShowFileUploadModal(true);
  };

  const onSubmit = (result: UploadedFile[]) => {
    switch (uploadModalName) {
      case 'photos':
        setPhotos([...photos, ...result]);
        setFrames([...frames, ...result]);
        setBackgrounds([...backgrounds, ...result]);
        break;
      case 'frames':
        setFrames([...frames, ...result]);
        break;
      case 'backgrounds':
        setBackgrounds([...backgrounds, ...result]);
        break;
    }
  };

  const onRemoveImage = (name: string, url: string) => {
    switch (name) {
      case 'photos':
        setPhotos([...photos.filter((item) => item.url !== url)]);
        if (selectedPhoto?.url === url) setSelectedPhoto(null);
        break;
      case 'frames':
        setPhotos([...frames.filter((item) => item.url !== url)]);
        if (selectedFrame?.url === url) setSelectedFrame(null);
        break;
      case 'backgrounds':
        setPhotos([...backgrounds.filter((item) => item.url !== url)]);
        if (selectedBackground?.url === url) setSelectedBackground(null);
        break;
    }
  };

  const onChangeLayoutDimension = (type: string, e: any) => {
    if (type === 'width' && editorRef.current?.offsetWidth) {
      let width = e.target.value;
      if (width > editorRef.current?.offsetWidth)
        width = editorRef.current?.offsetWidth;
      setLayoutDimension({ ...layoutDimension, width });
    }

    if (type === 'height' && editorRef.current?.offsetHeight) {
      let height = e.target.value;
      if (height > editorRef.current?.offsetHeight)
        height = editorRef.current?.offsetHeight;
      setLayoutDimension({ ...layoutDimension, height });
    }
  };

  const onChangeFrameDimension = (type: string, e: any) => {
    if (type === 'width') {
      let width = e.target.value;
      if (width > layoutDimension.width) width = layoutDimension.width;
      setFrameDimension({ ...frameDimension, width });
    }

    if (type === 'height') {
      let height = e.target.value;
      if (height > layoutDimension.height) height = layoutDimension.height;
      setFrameDimension({ ...frameDimension, height });
    }

    if (type === 'thickness') {
      let thickness = e.target.value;
      if (
        thickness > frameDimension.height / 2 ||
        thickness >= frameDimension.width / 2
      )
        thickness = Math.min(frameDimension.height, frameDimension.width) / 2;
      setFrameDimension({ ...frameDimension, thickness });
    }
  };

  const onSelectImage = (name: string, url: string) => {
    switch (name) {
      case 'photos':
        setSelectedPhoto(photos.find((item) => item.url === url) || null);
        break;
      case 'frames':
        setSelectedFrame(frames.find((item) => item.url === url) || null);
        break;
      case 'backgrounds':
        setSelectedBackground(
          backgrounds.find((item) => item.url === url) || null,
        );
        break;
    }
  };

  const generateImage = () => {
    const framePosition = {
      x: (layoutDimension.width - frameDimension.width) / 2,
      y: (layoutDimension.height - frameDimension.height) / 2,
    };
    const photoPosition = {
      x:
        (layoutDimension.width -
          (frameDimension.width - 2 * (frameDimension.thickness || 0))) /
        2,
      y:
        (layoutDimension.height -
          (frameDimension.height - 2 * (frameDimension.thickness || 0))) /
        2,
      width: frameDimension.width - 2 * (frameDimension.thickness || 0),
      height: frameDimension.height - 2 * (frameDimension.thickness || 0),
    };
    if (selectedBackground && selectedFrame && selectedPhoto) {
      mergeImages(
        [
          {
            src: selectedBackground.url,
            ...layoutDimension,
          },
          {
            src: selectedFrame.url,
            ...frameDimension,
            ...framePosition,
          },
          {
            src: selectedPhoto.url,
            ...photoPosition,
          },
        ],
        {
          width: layoutDimension.width,
          height: layoutDimension.height,
        },
      ).then((data: any) => {
        resultImageRef.current?.setAttribute('src', data);
        setShowResult(true);
      });
    }
  };

  return (
    <div className="flex h-full">
      <Sidebar
        photos={photos}
        frames={frames}
        backgrounds={backgrounds}
        showModal={showModal}
        onRemoveImage={onRemoveImage}
        selectedPhoto={selectedPhoto}
        selectedFrame={selectedFrame}
        selectedBackground={selectedBackground}
        onSelectImage={onSelectImage}
      />
      <div className="grow h-full flex flex-col p-2">
        <div className="flex items-center justify-between bg-stone-500 p-3 rounded-xl">
          <div>
            <div className="flex items-center text-xl text-white">
              <h2 className="mr-4">Layout Dimensions</h2>
              <span className="mr-3">Width:</span>
              <input
                type="number"
                className="text-black text-center bg-gray-400 rounded-md outline-0 w-[60px]"
                onChange={(e) => onChangeLayoutDimension('width', e)}
                value={layoutDimension.width}
              />
              <span className="ml-1">px</span>
              <span className="ml-6 mr-3">Height</span>
              <input
                type="number"
                className="text-black text-center bg-gray-400 rounded-md outline-0 w-[60px]"
                onChange={(e) => onChangeLayoutDimension('height', e)}
                value={layoutDimension.height}
              />
              <span className="ml-1">px</span>
              <button className="bg-blue px-3 py-2" onClick={generateImage}>
                Generate Image
              </button>
            </div>
            <div className="flex items-center text-xl text-white py-2">
              <h2 className="mr-4">Frame Dimensions</h2>
              <span className="mr-3">Width:</span>
              <input
                type="number"
                className="text-black text-center bg-gray-400 rounded-md outline-0 w-[60px]"
                onChange={(e) => onChangeFrameDimension('width', e)}
                value={frameDimension.width}
              />
              <span className="ml-1">px</span>
              <span className="ml-6 mr-3">Height</span>
              <input
                type="number"
                className="text-black text-center bg-gray-400 rounded-md outline-0 w-[60px]"
                onChange={(e) => onChangeFrameDimension('height', e)}
                value={frameDimension.height}
              />
              <span className="ml-1">px</span>
              <span className="ml-6 mr-3">Thickness</span>
              <input
                type="number"
                className="text-black text-center bg-gray-400 rounded-md outline-0 w-[60px]"
                onChange={(e) => onChangeFrameDimension('thickness', e)}
                value={frameDimension.thickness}
              />
              <span className="ml-1">px</span>
            </div>
          </div>
          <div>
            <button
              className="text-white bg-blue-700 px-4 mx-2 py-2 rounded-md hover:bg-blue-600"
              onClick={generateImage}
            >
              Preview
            </button>
            <button className="text-white bg-blue-700 px-4 mx-2 py-2 rounded-md hover:bg-blue-600">
              Download
            </button>
          </div>
        </div>
        <div
          className="w-full h-full flex items-center justify-center"
          ref={editorRef}
        >
          <img
            src="/"
            alt="Result"
            ref={resultImageRef}
            className={showResult ? '' : 'hidden'}
          />
        </div>
      </div>
      {showFileUploadModal && (
        <FileUploadModal
          modalName={uploadModalName}
          setShowFileUploadModal={setShowFileUploadModal}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
}

export default App;
