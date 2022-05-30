import React, { useState } from 'react';

import FileUploadModal from './Components/FileUploadModal';
import { UploadedFile } from './type';
import './App.scss';

function App() {
  const [showFileUploadModal, setShowFileUploadModal] = useState(false);
  const [uploadModalName, setUploadModalName] = useState('');
  const [photos, setPhotos] = useState<UploadedFile[]>([]);
  const [frames, setFrames] = useState<UploadedFile[]>([]);
  const [backgrounds, setBackgrounds] = useState<UploadedFile[]>([]);

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

  return (
    <div>
      <div className="flex text-white">
        <button
          className="mx-4 bg-blue-700"
          onClick={() => showModal('photos')}
        >
          Add Photos
        </button>
        <button
          className="mx-4 bg-blue-700"
          onClick={() => showModal('frames')}
        >
          Add Frames
        </button>
        <button
          className="mx-4 bg-blue-700"
          onClick={() => showModal('backgrounds')}
        >
          Add Backgrounds
        </button>
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
