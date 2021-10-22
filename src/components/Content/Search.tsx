import React from 'react';
import { useDispatch } from 'react-redux';

import { makeStyles, Theme } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import {
  getSearchTextDocuments,
  getSearchTextFeatures,
  setSearchText,
} from '../../store/documentsSlice';
import { useAppSelector } from '../../store/hooks';

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    border: '1px solid gray',
    display: 'flex',
    alignItems: 'center',
    padding: '3px 5px',
    borderRadius: 3,
    [theme.breakpoints.down('xs')]: {
      margin: '20px 0',
    },
  },
  icon: {
    fontSize: '1.4rem',
    color: 'gray',
  },
  input: {
    border: 'none',
    paddingLeft: 8,
    '&:focus-visible': {
      outline: 'none',
    },
  },
}));

interface Props {
  flag: string;
}

const Search: React.FC<Props> = React.memo(({ flag }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const searchTextDocuments = useAppSelector(getSearchTextDocuments);
  const searchTextFeatures = useAppSelector(getSearchTextFeatures);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value);
    dispatch(setSearchText({ text: e.currentTarget.value, flag }));
  };

  return (
    <div className={classes.form}>
      <SearchIcon className={classes.icon} />
      <input
        className={classes.input}
        autoComplete="off"
        placeholder="Поиск"
        value={flag === 'documents' ? searchTextDocuments : searchTextFeatures}
        onChange={handleChange}
      />
    </div>
  );
});

export default Search;
