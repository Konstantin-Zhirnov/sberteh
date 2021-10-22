import React from 'react';

import { makeStyles, Paper, Theme } from '@material-ui/core';

import TabsPanel from './TabsPanel';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    minHeight: '85vh',
    maxHeight: '85vh',
    [theme.breakpoints.down('md')]: {
      minHeight: 'initial',
      maxHeight: 'initial',
    },
  },
}));

export interface iProps {
  containerWidth: number;
  setContainerWidth: (param: any) => void;
}

const Features: React.FC<iProps> = React.memo(({ containerWidth, setContainerWidth }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <TabsPanel containerWidth={containerWidth} setContainerWidth={setContainerWidth} />
    </Paper>
  );
});

export default Features;
