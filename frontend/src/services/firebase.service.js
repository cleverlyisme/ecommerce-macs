import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import {storage} from "../configs/firebase.config"

export const uploadFile = file => {
  const storageRef = `products/${crypto.randomUUID()}-${file.name}`
  const fileRef = ref(storage, storageRef);

  const metadata = {contentType: file?.type}
  await uploadBytes(fileRef, file, metadata);

  const url = await getDownloadURL(fileRef);
  return {
    url,
    type: file.type,
    name: file.name,
    size: file.size,
    storageRef,
  };
}