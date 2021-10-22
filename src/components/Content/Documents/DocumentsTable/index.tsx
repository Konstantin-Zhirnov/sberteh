import React from 'react';
import { useDispatch } from 'react-redux';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';

import useRenderDocumentsArray from '../../../../hooks/useRenderDocumentsArray';
import { IDocuments } from '../../../../types';
import { useAppSelector } from '../../../../store/hooks';
import {
  fetchDocuments,
  getDocuments,
  getSearchTextDocuments,
} from '../../../../store/documentsSlice';
import FirstRow from './FirstRow';

const DocumentsTable: React.FC = React.memo(() => {
  const dispatch = useDispatch();
  const documents = useAppSelector(getDocuments);
  const searchTextDocuments = useAppSelector(getSearchTextDocuments);

  const renderArray = useRenderDocumentsArray(searchTextDocuments);

  const [openFirstLine, setOpenFirstLine] = React.useState<number>(0);

  React.useEffect(() => {
    if (!documents.length) {
      dispatch(fetchDocuments());
    }
  }, []);

  return (
    <TableContainer>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Имя</TableCell>
            <TableCell>Логин</TableCell>
            <TableCell>E-mail</TableCell>
            <TableCell>Сайт</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {renderArray?.length ? (
            renderArray.map((row: IDocuments) => (
              <FirstRow
                key={row.id}
                row={row}
                openFirstLine={openFirstLine}
                setOpenFirstLine={setOpenFirstLine}
              />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5}>Документы отсутствуют</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
});

export default DocumentsTable;
