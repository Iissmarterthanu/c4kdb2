import React from 'react'
import { Container, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function Notes() {
  const classes = useStyles();
  console.log("notes");
  return (
    <Container>
      <Typography variant="h3" color="textPrimary"> Collars For Kings Database</Typography>
      <Typography variant="body1" color="textPrimary"> Version 2 - resize images</Typography>
      <Typography variant="body1" color="textPrimary"> Version 3 - remove images</Typography>
      <Typography variant="body1" color="textPrimary"> Version 4 - disable resize, add images to groups</Typography>
    </Container>
  )
}
