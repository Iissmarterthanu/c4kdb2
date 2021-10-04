import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
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

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  form1: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  inputPC: {width: '15ch', background: 'white'},
  inputPN: {width: '35ch', background: 'white'},
  inputPD: {width: '35ch', height: '4', background: 'white'},
  inputPr: {width: '10ch', background: 'white'},
  inputGC: {minwidth: '20ch', background: 'white'},
}));

export default function ProductData({ groups, products, setProducts }) {
  // console.log(products);

  const classes = useStyles();

  const [pCode, setPCode] = useState('');
  const [pCodeError, setPCodeError] = useState(false);
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [gCode, setGCode] = useState('');
  const [gCodeError, setGCodeError] = useState(false);
  const [desc, setDesc] = useState('');
  const [descError, setDescError] = useState(false);
  const [prices, setPrices] = useState({s:"", m:"", l:"", xl:""});
  const [pricesError, setPricesError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPCodeError(false);
    setNameError(false);
    setGCodeError(false);
    setDescError(false);
    setPricesError(false);
    if (pCode == '' ) { setPCodeError(true) }
    if (name == '' ) { setNameError(true) }
    if (gCode == '' ) { setGCodeError(true) }
    if (desc == '' ) { setDescError(true) }
    if (prices == {s:"", m:"", l:"", xl:""} ) { setPricesError(true) }
    if (pCode && name && gCode && desc ) { 
      addProduct({"id":pCode, name, gCode, desc, prices});
      setPCode("");
      setName("");
      setGCode("");
      setDesc("");
      setPrices({s:"", m:"", l:"", xl:""});
    }
  };

  const productRef = projectFirestore.collection("products");
  // console.log(dataRef);
  
  // one time get function
  function getProducts() {
    setLoading(true);
    productRef.get().then((item) => {
      const items = item.docs.map((doc)=>doc.data());
      setProducts(items);
      setLoading(false);
    });
  }

  // ADD FUNCTION
  function addProduct(newProduct) {
    productRef
      .doc(newProduct.id)
      .set(newProduct)
      .then(() => {
        // setProducts((prev) => [newProduct, ...prev]);
        getProducts();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  //DELETE FUNCTION
  function deleteProduct(product) {
    productRef
      .doc(product.id)
      .delete()
      .then(() => {
        setProducts((prev) =>
          prev.filter((element) => element.id !== product.id)
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }

  // EDIT FUNCTION
  function editProduct(product) {
    setPCode(product.id);
    setName(product.name);
    setGCode(product.gCode);
    setDesc(product.desc);
    setPrices(product.prices);
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Container className={classes.myRoot} >

      <Typography 
        variant="h6" 
        component="h2"
        color="textPrimary"
        gutterBottom
      >
        Create a new product
      </Typography>

      <form className={classes.form1} noValidate autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField 
          className={classes.inputPC} 
          value={pCode}
          onChange={(e) => setPCode(e.target.value)}
          id="pCode" 
          label="Product" 
          variant="outlined" 
          required
          error={pCodeError}
        />
        <TextField 
          className={classes.inputPN} 
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="name" 
          label="Product Name" 
          variant="outlined" 
          required
          error={nameError}
        />

        <FormControl variant="outlined" className={classes.inputPC}>
          <InputLabel id="group-code">Group</InputLabel>
          <Select
            labelId="group-code"
            id="gCode"
            value={gCode}
            onChange={(e) => setGCode(e.target.value)}
            label="gCode"
            error={gCodeError}
          >
            {/* <MenuItem value=""><em>None</em></MenuItem> */}
            { 
              groups.map( (group) => (
                <MenuItem key={group.id} value={group.id}>{group.name}</MenuItem>    
               ) )
            }
          </Select>
        </FormControl>

        <TextareaAutosize
          maxRows={3} 
          minRows={3} 
          className={classes.inputPD} 
          value={desc}
          placeholder="Product Description"
          onChange={(e) => setDesc(e.target.value)}
          id="desc" 
          label="Product Description" 
          variant="outlined" 
          required
          error={descError}
        />
        <br/>
        <TextField 
          className={classes.inputPr} 
          value={prices.s}
          onChange={(e) => setPrices({...prices, s:e.target.value})}
          id="prices" 
          label="Price S" 
          variant="outlined" 
          required
          error={pricesError}
        />
        <TextField 
          className={classes.inputPr} 
          value={prices.m}
          onChange={(e) => setPrices({...prices, m:e.target.value})}
          id="prices" 
          label="Price M" 
          variant="outlined" 
          required
          error={pricesError}
        />
        <TextField 
          className={classes.inputPr} 
          value={prices.l}
          onChange={(e) => setPrices({...prices, l:e.target.value})}
          id="prices" 
          label="Price L" 
          variant="outlined" 
          required
          error={pricesError}
        />
        <TextField 
          className={classes.inputPr} 
          value={prices.xl}
          onChange={(e) => setPrices({...prices, xl:e.target.value})}
          id="prices" 
          label="Price XL" 
          variant="outlined" 
          required
          error={pricesError}
        />

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

        <TableContainer component={Paper}>
          <Table className={classes.table} size="small">
            <TableHead>
              <TableRow>
                <TableCell>Product Code</TableCell>
                <TableCell>Product Name</TableCell>
                <TableCell>Group Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Prices</TableCell>
                <TableCell align="center">Edit</TableCell>
                <TableCell align="center">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell scope="row">{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.gCode}</TableCell>
                  <TableCell>{product.desc}</TableCell>
                  <TableCell>
                    {product.prices.s},
                    {product.prices.m},
                    {product.prices.l},
                    {product.prices.xl}
                  </TableCell>
                  <TableCell align="center">
                    <Button onClick={() => editProduct(product)} endIcon={<EditIcon/>}/>
                  </TableCell>
                  <TableCell align="center">
                    <Button onClick={() => deleteProduct(product)} endIcon={<DeleteIcon/>}/>
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
