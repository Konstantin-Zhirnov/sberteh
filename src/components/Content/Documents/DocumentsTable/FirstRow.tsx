import React from 'react';
import { useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Collapse,
} from '@material-ui/core';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

import { useAppSelector } from '../../../../store/hooks';
import { IDocuments } from '../../../../types';
import {
  fetchFeatures,
  fetchSecondDocuments,
  getSecondDocuments,
} from '../../../../store/documentsSlice';
import SecondRow from './SecondRow';

const useStyles = makeStyles({
  row: {
    padding: '0 0 0 50px',
    borderBottom: 'none',
  },
  name: {
    cursor: 'pointer',
    color: '#0075ff',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});

interface Props {
  row: IDocuments;
  openFirstLine: number;
  setOpenFirstLine: (id: number) => void;
}

const FirstRow: React.FC<Props> = React.memo(({ row, openFirstLine, setOpenFirstLine }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const secondDocuments = useAppSelector(getSecondDocuments);

  const handleClickFirstLine = (id: number) => () => {
    if (openFirstLine !== id) {
      dispatch(fetchSecondDocuments(id));
      setOpenFirstLine(id);
    } else {
      setOpenFirstLine(0);
    }
  };

  const handleClickName = () => {
    dispatch(fetchFeatures());
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={handleClickFirstLine(row.id)}>
            {openFirstLine !== row.id ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" onClick={handleClickName} className={classes.name}>
          {row.name}
        </TableCell>
        <TableCell>{row.username}</TableCell>
        <TableCell>{row.email}</TableCell>
        <TableCell>{row.website}</TableCell>
      </TableRow>
      {row.id === openFirstLine && (
        <TableRow>
          <TableCell colSpan={5} className={classes.row}>
            <Collapse in={!!openFirstLine} timeout="auto" unmountOnExit>
              <Table aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell>Имя</TableCell>
                    <TableCell>E-mail</TableCell>
                    <TableCell>Текст</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {secondDocuments ? (
                    secondDocuments.map((item, index) => <SecondRow key={index} item={item} />)
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4}>Нет документов</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
});

export default FirstRow;
