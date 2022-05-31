import { useState } from 'react';
import Accordion from '../components/Accordion';
import ImageItem from '../components/ImageItem';
import { UploadedFile } from '../types';

interface Props {
  photos: UploadedFile[];
  frames: UploadedFile[];
  backgrounds: UploadedFile[];
  showModal: any;
  onRemoveImage: any;
  selectedPhoto: UploadedFile | null;
  selectedFrame: UploadedFile | null;
  selectedBackground: UploadedFile | null;
  onSelectImage: any;
}

const Sidebar = ({
  photos,
  frames,
  backgrounds,
  showModal,
  onRemoveImage,
  selectedPhoto,
  selectedFrame,
  selectedBackground,
  onSelectImage,
}: Props) => {
  const [opened, setOpened] = useState<string | null>(null);

  const onChangeOpened = (name: string) => {
    if (opened === name) setOpened(null);
    else setOpened(name);
  };

  return (
    <aside
      className="w-72 h-full bg-gray-50 overflow-y-auto"
      aria-label="Sidebar"
    >
      <Accordion
        title="Photos"
        opened={opened}
        handleOpen={onChangeOpened}
        length={photos.length}
      >
        <ul>
          <li className="text-center w-full p-2">
            <button
              className="w-full border border-dashed border-blue-300 rounded-lg hover:bg-gray-700 hover:text-white py-2"
              onClick={() => showModal('photos')}
            >
              +&nbsp;Add new photos
            </button>
          </li>
          {photos.map((item) => {
            return (
              <ImageItem
                key={item.url}
                file={item.file}
                fileSize={item.fileSize}
                url={item.url}
                selected={!!selectedPhoto && selectedPhoto.url === item.url}
                onRemove={() => onRemoveImage('photos', item.url)}
                onSelect={() => onSelectImage('photos', item.url)}
              />
            );
          })}
        </ul>
      </Accordion>
      <Accordion
        title="Frames"
        opened={opened}
        handleOpen={onChangeOpened}
        length={frames.length}
      >
        <ul>
          <li className="text-center w-full p-2">
            <button
              className="w-full border border-dashed border-blue-300 rounded-lg hover:bg-gray-700 hover:text-white py-2"
              onClick={() => showModal('frames')}
            >
              +&nbsp;Add new frames
            </button>
          </li>
          {frames.map((item) => {
            return (
              <ImageItem
                key={item.url}
                file={item.file}
                fileSize={item.fileSize}
                url={item.url}
                selected={!!selectedFrame && selectedFrame.url === item.url}
                onRemove={() => onRemoveImage('frames', item.url)}
                onSelect={() => onSelectImage('frames', item.url)}
              />
            );
          })}
        </ul>
      </Accordion>
      <Accordion
        title="Backgrounds"
        opened={opened}
        handleOpen={onChangeOpened}
        length={backgrounds.length}
      >
        <ul>
          <li className="text-center w-full p-2">
            <button
              className="w-full border border-dashed border-blue-300 rounded-lg hover:bg-gray-700 hover:text-white py-2"
              onClick={() => showModal('backgrounds')}
            >
              +&nbsp;Add new backgrounds
            </button>
          </li>
          {backgrounds.map((item) => {
            return (
              <ImageItem
                key={item.url}
                file={item.file}
                fileSize={item.fileSize}
                url={item.url}
                selected={
                  !!selectedBackground && selectedBackground.url === item.url
                }
                onRemove={() => onRemoveImage('backgrounds', item.url)}
                onSelect={() => onSelectImage('backgrounds', item.url)}
              />
            );
          })}
        </ul>
      </Accordion>
    </aside>
  );
};

export default Sidebar;
