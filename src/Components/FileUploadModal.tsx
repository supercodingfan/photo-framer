import { useRef, useState } from 'react';
import UploadedImageItem from './UploadedImageItem';
import { UploadedFile } from '../type';

interface Props {
  modalName: string;
  setShowFileUploadModal: any;
  onSubmit: any;
}

const FileUploadModal = ({
  modalName,
  setShowFileUploadModal,
  onSubmit,
}: Props) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const onUploadFileButtonClick = () => {
    inputRef.current?.click();
  };

  const onChangeFileInput = (e: any) => {
    const files = inputRef.current?.files;
    if (files) {
      const newUploadedFiles = [...uploadedFiles];
      for (let i = 0; i < files.length; i++) {
        const isImage = files[i].type.match('image.*'),
          url = URL.createObjectURL(files[i]);

        const fileSize =
          files[i].size > 1024
            ? files[i].size > 1048576
              ? Math.round(files[i].size / 1048576) + 'mb'
              : Math.round(files[i].size / 1024) + 'kb'
            : files[i].size + 'b';

        if (isImage) newUploadedFiles.push({ file: files[i], url, fileSize });
      }
      setUploadedFiles(newUploadedFiles);
    }
  };

  const removeImage = (url: string) => {
    setUploadedFiles([...uploadedFiles.filter((item) => item.url !== url)]);
  };

  const uploadImages = () => {
    onSubmit(uploadedFiles);
    setShowFileUploadModal(false);
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-full lg:w-[800px] my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">
                Upload your {modalName}
              </h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowFileUploadModal(false)}
              >
                <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                  &times;
                </span>
              </button>
            </div>
            <div className="relative p-8 flex-auto">
              <div
                aria-label="File Upload Modal"
                className="relative h-full flex flex-col bg-white rounded-md"
                // onDrop="dropHandler(event);"
                // onDragOver="dragOverHandler(event);"
                // onDragLeave="dragLeaveHandler(event);"
                // onDragEnter="dragEnterHandler(event);"
              >
                <section className="h-full overflow-auto p-8 w-full h-full flex flex-col">
                  <header className="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center">
                    <p className="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
                      <span>Drag and drop your</span>&nbsp;
                      <span>files anywhere or</span>
                    </p>
                    <input
                      type="file"
                      multiple
                      className="hidden"
                      ref={inputRef}
                      onChange={onChangeFileInput}
                    />
                    <button
                      className="mt-2 rounded-full text-white px-5 py-2 bg-blue-500 hover:bg-blue-600 focus:shadow-outline focus:outline-none"
                      onClick={onUploadFileButtonClick}
                    >
                      Browse Files
                    </button>
                  </header>

                  <h1 className="pt-8 pb-3 font-semibold sm:text-lg text-gray-900">
                    Preview
                  </h1>

                  <ul className="flex flex-1 flex-wrap -m-1">
                    {!uploadedFiles.length && (
                      <li className="h-full w-full text-center flex flex-col items-center justify-center items-center">
                        <img
                          className="mx-auto w-32"
                          src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png"
                          alt="No data"
                        />
                        <span className="text-small text-gray-500">
                          No files selected
                        </span>
                      </li>
                    )}
                    {uploadedFiles.map((item) => {
                      return (
                        <UploadedImageItem
                          key={item.url}
                          file={item.file}
                          fileSize={item.fileSize}
                          url={item.url}
                          onRemove={removeImage}
                        />
                      );
                    })}
                  </ul>
                </section>
              </div>
            </div>
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <footer className="flex justify-end px-8 pb-8 pt-4">
                <button
                  className="rounded-full px-4 py-1 bg-blue-700 hover:bg-blue-500 text-white focus:shadow-outline focus:outline-none"
                  onClick={uploadImages}
                >
                  Upload
                </button>
                <button
                  className="ml-3 rounded-full px-4 py-1 hover:bg-gray-300 focus:shadow-outline focus:outline-none"
                  onClick={() => setShowFileUploadModal(false)}
                >
                  Cancel
                </button>
              </footer>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default FileUploadModal;
