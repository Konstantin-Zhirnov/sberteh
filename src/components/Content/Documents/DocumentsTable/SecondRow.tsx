import React from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Collapse,
  IconButton,
} from '@material-ui/core';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

import { ISecondDocuments } from '../../../../types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  row: {
    padding: '0 0 0 0',
    borderBottom: 'none',
  },
});

interface Props {
  item: ISecondDocuments;
}

const SecondRow: React.FC<Props> = React.memo(({ item }) => {
  const classes = useStyles();

  const [openSecondLine, setOpenSecondLine] = React.useState(false);

  const handleClickSecondLine = () => {
    setOpenSecondLine((prevState) => !prevState);
  };

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton aria-label="expand row" onClick={handleClickSecondLine}>
            {openSecondLine ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {item.name}
        </TableCell>
        <TableCell>{item.email}</TableCell>
        <TableCell>{item.body}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell className={classes.row} colSpan={5}>
          <Collapse in={openSecondLine} timeout="auto" unmountOnExit>
            <Table size="small" aria-label="purchases">
              <TableHead>
                <TableRow>
                  <TableCell>Номер документа</TableCell>
                  <TableCell>Дата</TableCell>
                  <TableCell>Тип</TableCell>
                  <TableCell>Статус</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>1-111</TableCell>
                  <TableCell>{new Date().toLocaleDateString()}</TableCell>
                  <TableCell>Накладная</TableCell>
                  <TableCell>В производстве</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2-222</TableCell>
                  <TableCell>{new Date().toLocaleDateString()}</TableCell>
                  <TableCell>Спецификация</TableCell>
                  <TableCell>Не просмотрен</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
});

export default SecondRow;
