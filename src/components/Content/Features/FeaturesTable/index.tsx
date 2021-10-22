import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { getFeatures, getSearchTextFeatures } from '../../../../store/documentsSlice';
import useRenderFeaturesArray from '../../../../hooks/useRenderFeaturesArray';
import { IFeatures } from '../../../../types';
import { useAppSelector } from '../../../../store/hooks';
import Row from './Row';

const useStyles = makeStyles(() => ({
  text: {
    padding: 16,
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    fontSize: '1rem',
  },
  icon: {
    fontSize: '1.1rem',
    marginRight: 10,
  },
  tableContainer: {
    maxHeight: '57vh',
    overflowY: 'auto',
    marginTop: 40,
  },
}));

const FeaturesTable: React.FC = React.memo(() => {
  const classes = useStyles();
  const features = useAppSelector(getFeatures);
  const searchTextFeatures = useAppSelector(getSearchTextFeatures);

  const renderArray = useRenderFeaturesArray(searchTextFeatures);

  if (!features.length) {
    return (
      <p className={classes.text}>
        <ArrowBackIcon className={classes.icon} />
        Кликните на имя в таблице{' '}
      </p>
    );
  }
  return (
    <TableContainer className={classes.tableContainer}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>Наименование</TableCell>
            <TableCell>Содержание</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {renderArray.map((row: IFeatures) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});

export default FeaturesTable;
