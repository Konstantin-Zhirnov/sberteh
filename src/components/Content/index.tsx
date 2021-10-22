import React from 'react';

import { makeStyles } from '@material-ui/core';

import Documents from './Documents';
import Features from './Features';

const Content: React.FC = React.memo(() => {
  const [containerWidth, setContainerWidth] = React.useState(50);

  const useStyles = makeStyles((theme) => ({
    wrapper: {
      maxWidth: 1920,
      margin: '0 auto',
      padding: '50px 20px',
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'space-between',
      [theme.breakpoints.up('lg')]: {
        padding: '50px 32px',
      },
      [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
      },
      [theme.breakpoints.down('xs')]: {
        padding: '30px 15px',
      },
    },
    documentsContainer: {
      width: `${99 - containerWidth}%`,
      [theme.breakpoints.down('md')]: {
        width: '100%',
        marginBottom: 15,
      },
    },
    featuresContainer: {
      width: `${containerWidth}%`,
      [theme.breakpoints.down('md')]: {
        width: '100%',
      },
    },
  }));

  const classes = useStyles();

  return (
    <main className={classes.wrapper}>
      <section className={classes.documentsContainer}>
        <Documents />
      </section>
      <section className={classes.featuresContainer}>
        <Features containerWidth={containerWidth} setContainerWidth={setContainerWidth} />
      </section>
    </main>
  );
});

export default Content;
