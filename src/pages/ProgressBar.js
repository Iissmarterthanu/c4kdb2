import React, { useEffect } from 'react';
import useStorage from '../hooks/useStorage';
import { motion } from 'framer-motion';

const ProgressBar = ({ file, setFile, images, setImages }) => {
  console.log("images", images);
  
  const { progress, url } = useStorage(file);

  useEffect(() => {
    if (url) {
      setFile(null);
      setImages([...images, url]);
    }
  }, [url, setFile]);

  return (
    <motion.div className="progress-bar"
      initial={{ width: 0 }}
      animate={{ width: progress + '%' }}
    ></motion.div>
  );
} 

export default ProgressBar;