import React, { useEffect, useState } from 'react';
import "./App.css"
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Notes from './pages/Notes'
import GroupData from './pages/GroupData'
import ProductData from './pages/ProductData'
import ItemData from './pages/ItemData';
import { Box, createTheme, Divider, makeStyles, ThemeProvider } from '@material-ui/core'
import { amber, brown } from '@material-ui/core/colors'

const theme = createTheme({
  palette: {
    primary: brown,
    secondary: amber
  },
  typography: {
    fontFamily: 'Josefin Sans',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
  }
})

const useStyles = makeStyles((theme) => ({
  nav:  {
    margin: theme.spacing(1),
  },
}));

function App() {

  const classes = useStyles();

  const [groups, setGroups] = useState([]);
  const [products, setProducts] = useState([]);
  const [items, setItems] = useState([]);

  return (
    
    <ThemeProvider theme={theme}>
      <Router>

        <Box display="flex" flexDirection="row" p={1} >
          <nav className={classes.nav}>
            <Link className={classes.nav} to="/">Home</Link>
            <Link className={classes.nav} to="/groups">groups</Link>
            <Link className={classes.nav} to="/products">products</Link>
            <Link className={classes.nav} to="/items">items</Link>
          </nav>
        </Box>


        <Switch>
          <Route exact path="/"> <Notes /> </Route>
          <Route path="/groups"> 
            <GroupData 
              groups={groups} 
              setGroups={setGroups} 
            /> 
          </Route>
          <Route path="/products" key={groups[0]}> 
            <ProductData 
              groups={groups}
              products={products}
              setProducts={setProducts} 
            /> 
          </Route>
          <Route path="/items" key={groups[0]}> 
            <ItemData 
              products={products}
              items={items}
              setItems={setItems} 
            /> 
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
 