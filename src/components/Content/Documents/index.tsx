import React from 'react';

import { makeStyles, Paper, Divider, Theme } from '@material-ui/core';

import { getLoaderDocuments } from '../../../store/documentsSlice';
import Loader from '../../Loader';
import Search from '../Search';
import Settings from '../Settings';
import DocumentsTable from './DocumentsTable';

import { useAppSelector } from '../../../store/hooks';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    minHeight: '85vh',
    maxHeight: '85vh',
    [theme.breakpoints.down('md')]: {
      minHeight: 'initial',
      maxHeight: 'initial',
    },
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  loaderContainer: {
    height: 5,
    minHeight: 5,
  },
  tableContainer: {
    maxHeight: '65vh',
    overflowY: 'auto',
    marginTop: 40,
  },
}));

const Documents: React.FC = React.memo(() => {
  const classes = useStyles();

  const loaderDocuments = useAppSelector(getLoaderDocuments);

  return (
    <Paper className={classes.paper}>
      <div className={classes.header}>
        <Search flag="documents" />
        <Settings />
      </div>
      <Divider />
      <div className={classes.loaderContainer}>{loaderDocuments && <Loader />}</div>

      <div className={classes.tableContainer}>
        <DocumentsTable />
      </div>
    </Paper>
  );
});

export default Documents;
