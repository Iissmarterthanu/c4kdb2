import { useState, useEffect } from 'react';
import { projectStorage, projectFirestore, timestamp } from '../config/firebaseConfig';
import Resizer from "react-image-file-resizer";
import "firebase/storage";

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(file, 300, 200, "JPG", 80, 0, (uri) => {
      resolve(uri);
    });
  });
  
  const afun = async (file) => {
    // console.log(file);

    // Create a root reference
    const storageRef = projectStorage.ref(file.name);

    try {
      const uri = await resizeFile(file);
      // console.log(1, uri);
      
      const fileName = `small_${file.name}`; //filename of thumbnail
      // console.log(11, fileName);
  
      // storageRef.putString(uri,  'data_url').then((snapshot) => {
      //   console.log('Uploaded a base64 string!');
      // });

      storageRef.putString(uri, "data_url").on('state_changed', (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
      }, (err) => {
        setError(err);
        // console.log(err);
      }, async () => {
        const url = await storageRef.getDownloadURL();
        const createdAt = timestamp();
        // await collectionRef.add({ url, createdAt });
        setUrl(url);
      });

    } catch (e) {
      //display an error if something went wrong during the upload
      setError(`Error uploading image: ${e.code}`);
    }

  };

  useEffect(() => {
    // references
    
    const uri = afun(file);

  }, [file]);

  return { progress, url, error };
}

export default useStorage;