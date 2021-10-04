import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const ImageGrid = ({ images, setImages }) => {
  let i = 1234;

  function removeImage(image) {
    // console.log(images);
    // console.log(image);
    const filteredImages = images.filter((img)=> image !== img );
    // console.log(filteredImages);
    setImages(filteredImages);
  }

  return (
    <div className="img-grid">
      {images && images.map(image => (
        <motion.div className="img-wrap" key={i++} 
          layout
          whileHover={{ opacity: 1 }}s
          onClick={() => {}}
        >
          <motion.img src={image} alt="uploaded pic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          />
          <Button onClick={() => removeImage(image)} endIcon={<DeleteIcon/>}/>
        </motion.div>
      ))}
    </div>
  )
}

export default ImageGrid;