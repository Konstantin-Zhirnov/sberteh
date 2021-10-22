import React from 'react';
import { useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';

import { setNewTitleForFeatures } from '../../../../store/documentsSlice';

const useStyles = makeStyles(() => ({
  td: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textarea: {
    width: '100%',
    minHeight: 70,
  },
  btn: {
    padding: 8,
  },
  icon: {
    fontSize: '1.1rem',
  },
}));

interface Props {
  id: number;
  setShowEdit: (value: boolean) => void;
  title: string;
}

const Edit: React.FC<Props> = React.memo(({ id, setShowEdit, title }) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [newTitle, setNewTitle] = React.useState(title);

  const handleChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setNewTitle(e.currentTarget.value);
  };

  const handleClickSave = () => {
    dispatch(setNewTitleForFeatures({ id, text: newTitle }));
    setShowEdit(false);
  };

  return (
    <span className={classes.td}>
      <textarea value={newTitle} onChange={handleChange} className={classes.textarea} />
      <IconButton onClick={handleClickSave} className={classes.btn}>
        <SaveIcon className={classes.icon} />
      </IconButton>
    </span>
  );
});

export default Edit;
