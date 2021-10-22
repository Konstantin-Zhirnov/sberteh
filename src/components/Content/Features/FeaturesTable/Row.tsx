import React from 'react';
import { useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { IconButton, TableCell, TableRow } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

import { fetchPatchFeatures, getNewTitleForFeatures } from '../../../../store/documentsSlice';
import { IFeatures } from '../../../../types';
import { useAppSelector } from '../../../../store/hooks';
import Edit from './Edit';

const useStyles = makeStyles(() => ({
  td: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btn: {
    padding: 8,
  },
  icon: {
    fontSize: '1.1rem',
  },
}));

interface Props {
  row: IFeatures;
}

const Row: React.FC<Props> = React.memo(({ row }) => {
  const classes = useStyles();
  const newTitleForFeatures = useAppSelector(getNewTitleForFeatures);
  const dispatch = useDispatch();

  const [isShowEdit, setShowEdit] = React.useState(false);

  const handleClickEdit = () => {
    setShowEdit(true);
  };

  React.useEffect(() => {
    if (newTitleForFeatures.id === row.id) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      dispatch(fetchPatchFeatures(row.id));
    }
  }, [newTitleForFeatures]);

  return (
    <TableRow>
      <TableCell>
        {!isShowEdit ? (
          <span className={classes.td}>
            {row.title}
            <IconButton onClick={handleClickEdit} className={classes.btn}>
              <EditIcon className={classes.icon} />
            </IconButton>
          </span>
        ) : (
          <Edit id={row.id} setShowEdit={setShowEdit} title={row.title} />
        )}
      </TableCell>
      <TableCell>{row.body}</TableCell>
    </TableRow>
  );
});

export default Row;
