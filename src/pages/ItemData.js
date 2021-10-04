import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import PageviewIcon from '@material-ui/icons/Pageview';
import { 
  Container, 
  Table, 
  TableContainer, 
  TableHead, 
  TableCell,
  TableBody, 
  TableRow, 
  TextField, 
  TextareaAutosize} from '@material-ui/core';
import { projectFirestore } from '../config/firebaseConfig';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import ProgressBar from './ProgressBar';
import ImageGrid from './ImageGrid';
import Resizer from "react-image-file-resizer";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  form1: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  inputICode: {width: '15ch', background: 'white'},
  inputIName: {width: '35ch', background: 'white'},
  inputIDesc: {width: '35ch', height: '4', background: 'white'},
  inputStock: {width: '10ch', background: 'white'},
  inputImage: {width: '35ch', background: 'white'},
  inputPC: {minwidth: '20ch', background: 'white'},
}));

export default function ItemData({ products, items, setItems }) {
  // console.log(products);

  const classes = useStyles();

  const [iCode, setICode] = useState('');
  const [iCodeError, setICodeError] = useState(false);
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [pCode, setPCode] = useState('');
  const [pCodeError, setPCodeError] = useState(false);
  const [desc, setDesc] = useState('');
  const [descError, setDescError] = useState(false);
  const [stock, setStock] = useState({s:"", m:"", l:"", xl:""});
  const [stockError, setStockError] = useState(false);
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState(null);  
  const [images, setImages] = useState([]);
  const [imagesError, setImagesError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");
  const [filterError, setFilterError] = useState(false);
  const [itemsFiltered, setItemsFiltered] = useState([]);


  const handleSubmit = (e) => {
    e.preventDefault();
    setICodeError(false);
    setNameError(false);
    setPCodeError(false);
    setDescError(false);
    setStockError(false);
    setImagesError(false);
    if (iCode == '' ) { setICodeError(true) }
    if (name == '' ) { setNameError(true) }
    if (pCode == '' ) { setPCodeError(true) }
    if (desc == '' ) { setDescError(true) }
    if (stock == {s:"", m:"", l:"", xl:""} ) { setStockError(true) }
    if (iCode && name && pCode && desc ) { 
      addItem({"id":iCode, name, pCode, desc, stock, images});
      setICode("");
      setName("");
      setPCode("");
      setDesc("");
      setStock({s:"", m:"", l:"", xl:""});
      setImages([]);
    }
  };

  const itemRef = projectFirestore.collection("items");
  // console.log(dataRef);
  
  // one time get function
  function getItems() {
    setLoading(true);
    itemRef.get().then((item) => {
      const items = item.docs.map((doc)=>doc.data());
      setItems(items);
      setLoading(false);
    });
  }

  // ADD FUNCTION
  function addItem(newItem) {
    itemRef
      .doc(newItem.id)
      .set(newItem)
      .then(() => {
        // setProducts((prev) => [newProduct, ...prev]);
        getItems();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  //DELETE FUNCTION
  function deleteItem(doc) {
    itemRef
      .doc(doc.id)
      .delete()
      .then(() => {
        setItems((prev) =>
          prev.filter((element) => element.id !== doc.id)
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }

  // EDIT FUNCTION
  function editItem(item) {
    setICode(item.id);
    setName(item.name);
    setPCode(item.pCode);
    setDesc(item.desc);
    setStock(item.stock);
    setImages(item.images);
  }

  const types = ['image/png', 'image/jpeg'];

  const handleAddPic = async (e) => {
    const selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setFileError('');
    } else {
      setFile(null);
      setFileError('Please select an image file (png or jpg)');
    }
  };
  
  
  function preview(item) {}
  
  let i=1;
  
  useEffect(() => {
    getItems();
  }, []);

  useEffect(() => {
    if ( filter === "" || filter === "None" ) {
      setItemsFiltered(items);
    } else {
      setItemsFiltered(items.filter((item)=>item.pCode === filter)); 
    } 
  }, [filter, items]);

  return (
    <Container className={classes.myRoot} >

      <Typography 
        variant="h6" 
        component="h2"
        color="textPrimary"
        gutterBottom
      >
        Create a new item
      </Typography>

      <form className={classes.form1} noValidate autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField 
          className={classes.inputICode} 
          value={iCode}
          onChange={(e) => setICode(e.target.value)}
          id="iCode" 
          label="Item" 
          variant="outlined" 
          required
          error={iCodeError}
        />
        <TextField 
          className={classes.inputIName} 
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="name" 
          label="Item Name" 
          variant="outlined" 
          required
          error={nameError}
        />

        <FormControl variant="outlined" className={classes.inputPC}>
          <InputLabel id="item-code">Product</InputLabel>
          <Select
            labelId="product-code"
            id="pCode"
            value={pCode}
            onChange={(e) => setPCode(e.target.value)}
            label="pCode"
            error={pCodeError}
          >
            {/* <MenuItem value=""><em>None</em></MenuItem> */}
            { 
              products.map( (product) => (
                <MenuItem key={product.id} value={product.id}>{product.name}</MenuItem>    
               ) )
            }
          </Select>
        </FormControl>

        <TextareaAutosize
          maxRows={3} 
          minRows={3} 
          className={classes.inputIDesc} 
          value={desc}
          placeholder="Item Description"
          onChange={(e) => setDesc(e.target.value)}
          id="desc" 
          label="Item Description" 
          variant="outlined" 
          required
          error={descError}
        />
        <br/>
        <TextField 
          className={classes.inputStock} 
          value={stock.s}
          onChange={(e) => setStock({...stock, s:e.target.value})}
          id="stock-s" 
          label="Stock S" 
          variant="outlined" 
          required
          error={stockError}
        />
        <TextField 
          className={classes.inputStock} 
          value={stock.m}
          onChange={(e) => setStock({...stock, m:e.target.value})}
          id="stock-m" 
          label="Stock M" 
          variant="outlined" 
          required
          error={stockError}
        />
        <TextField 
          className={classes.inputStock} 
          value={stock.l}
          onChange={(e) => setStock({...stock, l:e.target.value})}
          id="stock-l" 
          label="Stock L" 
          variant="outlined" 
          required
          error={stockError}
        />
        <TextField 
          className={classes.inputStock} 
          value={stock.xl}
          onChange={(e) => setStock({...stock, xl:e.target.value})}
          id="stock-xl" 
          label="Stock XL" 
          variant="outlined" 
          required
          error={stockError}
        />

        <label>
          <input type="file" onChange={handleAddPic} />
          <span><AddAPhotoIcon /></span>
        </label>

        <div className="output">
          { fileError && <div className="error">{ fileError }</div>}
          { file && <div>{ file.name }</div> }
          { file && <ProgressBar 
            file={file} setFile={setFile} 
            images={images} setImages={setImages}
          /> }
        </div>


        <div>
          <ImageGrid images={images} setImages={setImages} />
        </div>

        <br/>
        <Button 
          className={classes.button}
          type="submit" 
          variant="contained" 
          color="primary"
          endIcon={<SaveIcon/>}
        >
          Save
        </Button>

      </form>

      <section className="todo-list">

        <Typography 
          variant="h6" 
          component="h2"
          color="textPrimary"
          gutterBottom
        >
          Values in the database:
        </Typography>

        <FormControl variant="outlined" className={classes.inputPC}>
          <InputLabel id="filter">Filter</InputLabel>
          <Select
            labelId="filter"
            id="fCode"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            label="fCode"
            error={filterError}
          >
            <MenuItem value="None"><em>None</em></MenuItem>
            { 
              products.map( (product) => (
                <MenuItem key={product.id} value={product.id}>{product.name}</MenuItem>    
               ) )
            }
          </Select>
        </FormControl>


        <TableContainer component={Paper}>
          <Table className={classes.table} size="small">
            <TableHead>
              <TableRow>
                <TableCell>Item Code</TableCell>
                <TableCell>Item Name</TableCell>
                <TableCell>Product Code</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell align="center">Preview</TableCell>
                <TableCell align="center">Edit</TableCell>
                <TableCell align="center">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {itemsFiltered.map((item) => (
                <TableRow key={item.id}>
                  <TableCell scope="row">{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.pCode}</TableCell>
                  <TableCell>{item.desc}</TableCell>
                  <TableCell>
                    {item.stock.s},
                    {item.stock.m},
                    {item.stock.l},
                    {item.stock.xl}
                  </TableCell>
                  <TableCell align="center">
                    <Button onClick={() => preview(item)} endIcon={<PageviewIcon/>}/>
                  </TableCell>
                  <TableCell align="center">
                    <Button onClick={() => editItem(item)} endIcon={<EditIcon/>}/>
                  </TableCell>
                  <TableCell align="center">
                    <Button onClick={() => deleteItem(item)} endIcon={<DeleteIcon/>}/>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

      </section>

    </Container>
  )
}
