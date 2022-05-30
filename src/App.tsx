import React, { useState } from 'react';

import FileUploadModal from './components/FileUploadModal';
import { UploadedFile } from './type';
import './App.scss';
import Sidebar from './layout/Sidebar';

function App() {
  const [showFileUploadModal, setShowFileUploadModal] = useState(false);
  const [uploadModalName, setUploadModalName] = useState('');
  const [photos, setPhotos] = useState<UploadedFile[]>([]);
  const [frames, setFrames] = useState<UploadedFile[]>([]);
  const [backgrounds, setBackgrounds] = useState<UploadedFile[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<UploadedFile | null>(null);
  const [selectedFrame, setSelectedFrame] = useState<UploadedFile | null>(null);
  const [selectedBackground, setSelectedBackground] =
    useState<UploadedFile | null>(null);

  const showModal = (name: string) => {
    setUploadModalName(name);
    setShowFileUploadModal(true);
  };

  const onSubmit = (result: UploadedFile[]) => {
    switch (uploadModalName) {
      case 'photos':
        setPhotos([...photos, ...result]);
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
        break;
      case 'frames':
        setPhotos([...frames.filter((item) => item.url !== url)]);
        break;
      case 'backgrounds':
        setPhotos([...backgrounds.filter((item) => item.url !== url)]);
        break;
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
      <div>
        <button>Main</button>
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
