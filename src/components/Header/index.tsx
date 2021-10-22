import React from 'react';

import { AppBar, Toolbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  header: {
    backgroundColor: '#0075ff',
  },
  text: {
    fontSize: '1.3rem',
  },
  img: {
    width: 60,
    marginRight: 20,
  },
});

const Header: React.FC = React.memo(() => {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.header}>
      <Toolbar variant="dense">
        <img src="/4.png" className={classes.img} />
        <p className={classes.text}>Тестовое задание для СберТех</p>
      </Toolbar>
    </AppBar>
  );
});

export default Header;
