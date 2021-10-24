import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Tabs, Tab, Divider, Theme } from '@material-ui/core';

import { getLoaderFeatures } from '../../../store/documentsSlice';
import { useAppSelector } from '../../../store/hooks';
import Loader from '../../Loader';
import Search from '../Search';
import Size from '../Size';
import { iProps } from './index';
import Settings from '../Settings';
import FeaturesTable from './FeaturesTable';

const useStyles = makeStyles((theme: Theme) => ({
  tabs: {
    padding: '16px 16px 0',
    '& .MuiTabs-indicator': {
      backgroundColor: '#0075ff',
    },
  },
  search: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 16px 10px',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  loaderContainer: {
    height: 5,
    minHeight: 5,
  },
}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && <>{children}</>}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const TabsPanel: React.FC<iProps> = React.memo(({ containerWidth, setContainerWidth }) => {
  const classes = useStyles();
  const loaderFeatures = useAppSelector(getLoaderFeatures);
  const [value, setValue] = React.useState(0);

  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="simple tabs example"
        className={classes.tabs}>
        <Tab label="Информация" {...a11yProps(0)} />
        <Tab label="Элементы" {...a11yProps(1)} />
      </Tabs>
      <div className={classes.search}>
        <Search flag="features" />
        <Size containerWidth={containerWidth} setContainerWidth={setContainerWidth} />
        <Settings />
      </div>
      <Divider />
      <div className={classes.loaderContainer}>{loaderFeatures && <Loader />}</div>
      <TabPanel value={value} index={0}>
        <FeaturesTable />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <p>Здесь расположены элементы</p>
      </TabPanel>
    </>
  );
});

export default TabsPanel;
