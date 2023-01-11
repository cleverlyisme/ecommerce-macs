import { useRef, useId } from 'react';
import { Button } from 'reactstrap';

import formatFileUrl from '../../../utils/formatFileUrl';

const ImageItem = ({ image, onRemove }) => (
  <div
    key={image}
    className="d-flex align-items-center justify-content-between"
    style={{ gap: 16 }}
  >
    <div style={{ width: 100 }}>
      <img
        src={image.id ? URL.createObjectURL(image.file) : formatFileUrl(image)}
        alt="product"
        style={{ width: 100, width: 100, borderRadius: 8, objectFit: 'cover' }}
      />
    </div>
    <Button color="danger" size="sm" onClick={onRemove}>
      Delete
    </Button>
  </div>
);

const Images = ({ images, setImages, files, setFiles }) => {
  const inputId = useId();
  const labelRef = useRef();

  console.log({ files });

  const handleInputChange = (e) => {
    setFiles([
      ...files,
      ...Array.from(e.target.files).map((file) => ({
        id: crypto.randomUUID(),
        file,
      })),
    ]);
    e.target.value = '';
  };

  const render = () => {
    return (
      <div className="d-flex flex-column" style={{ gap: 8 }}>
        <Button
          color="primary"
          size="sm"
          onClick={() => labelRef.current?.click()}
        >
          Add images
        </Button>
        <div
          className="d-flex flex-column"
          style={{ gap: 8, maxHeight: '80vh', overflowY: 'auto' }}
        >
          {images.map((image) => (
            <ImageItem
              key={image}
              image={image}
              onRemove={() => setImages(images.filter((i) => i !== image))}
            />
          ))}
          {files.map((file) => (
            <ImageItem
              key={file.id}
              image={file}
              onRemove={() => setFiles(files.filter((f) => f.id !== file.id))}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      <label htmlFor={inputId} ref={labelRef} className="d-none" />
      <input
        id={inputId}
        className="d-none"
        type="file"
        multiple
        accept="image/*"
        onChange={handleInputChange}
      />
      {render()}
    </div>
  );
};

export default Images;
