import React from 'react';

import { makeStyles } from '@material-ui/core';

import { iProps } from './Features';

const useStyles = makeStyles(() => ({
  inputContainer: {
    padding: '4px 10px',
    '& input': {
      cursor: 'pointer',
    },
  },
}));

const Size: React.FC<iProps> = React.memo(({ containerWidth, setContainerWidth }) => {
  const classes = useStyles();

  const handleSetWidth = ({ target }: { target: EventTarget | null }) => {
    const { value } = target as HTMLInputElement;
    setContainerWidth(Number(value));
  };

  return (
    <div className={classes.inputContainer}>
      <input
        type="range"
        min="33"
        max="73"
        step="10"
        value={containerWidth}
        onInput={handleSetWidth}
      />
    </div>
  );
});

export default Size;
