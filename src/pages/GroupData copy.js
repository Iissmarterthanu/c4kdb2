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
  TextField } from '@material-ui/core';
import { projectFirestore } from '../config/firebaseConfig';
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
  inputPC: {width: '20ch', background: 'white'},
  inputPN: {width: '35ch', background: 'white'},
  gcBox: {margin: theme.spacing(1), width: '20ch' },
  gnBox: {margin: theme.spacing(1), width: '35ch' },
  value: {margin: theme.spacing(1) },
  table: {
    minWidth: 350,
  },
}));

export default function GroupData({ groups, setGroups }) {
  const classes = useStyles();

  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState(false);
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCodeError(false);
    setNameError(false);
    if (code == '' ) { setCodeError(true) }
    if (name == '' ) { setNameError(true) }
    if (code && name) { console.log(code,name); }
    if (code && name) { 
      addGroup({"id":code, name});
      setCode("");
      setName("");
    }
  };

  const groupRef = projectFirestore.collection("groups");
  // console.log(groupRef);
  
  // one time get function
  function getGroups() {
    setLoading(true);
    groupRef.get().then((item) => {
      const items = item.docs.map((doc)=>doc.data());
      setGroups(items);
      setLoading(false);
    });
  }

  // ADD FUNCTION
  function addGroup(newGroup) {
    groupRef
      .doc(newGroup.id)
      .set(newGroup)
      .then(() => {
        setGroups((prev) => [newGroup, ...prev]);
      })
      .catch((err) => {
        console.error(err);
      });
  }

    //DELETE FUNCTION
    function deleteGroup(group) {
      groupRef
        .doc(group.id)
        .delete()
        .then(() => {
          setGroups((prev) =>
            prev.filter((element) => element.id !== group.id)
          );
        })
        .catch((err) => {
          console.error(err);
        });
    }

    // EDIT FUNCTION
    function editGroup(group) {
      setCode(group.id);
      setName(group.name);
      deleteGroup(group);
    }


    useEffect(() => {
      getGroups();
      //  eslint-disable-next-line
    }, []);
    
  return (
    <Container className={classes.myRoot} >

      <Typography 
        variant="h6" 
        component="h2"
        color="textPrimary"
        gutterBottom
      >
        Create a new product group
      </Typography>

      <form className={classes.form1} noValidate autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField 
          className={classes.inputPC} 
          value={code}
          onChange={(e) => setCode(e.target.value)}
          id="code" 
          label="Group Code" 
          variant="outlined" 
          required
          error={codeError}
        />
        <TextField 
          className={classes.inputPN} 
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="name" 
          label="Group Name" 
          variant="outlined" 
          required
          error={nameError}
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
                <TableCell>Group Code</TableCell>
                <TableCell>Group Name</TableCell>
                <TableCell align="center">Edit</TableCell>
                <TableCell align="center">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {groups.map((group) => (
                <TableRow key={group.id}>
                  <TableCell scope="row">{group.id}</TableCell>
                  <TableCell>{group.name}</TableCell>
                  <TableCell align="center">
                    <Button onClick={() => editGroup(group)} endIcon={<EditIcon/>}/>
                  </TableCell>
                  <TableCell align="center">
                    <Button onClick={() => deleteGroup(group)} endIcon={<DeleteIcon/>}/>
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
