import React from 'react';
import { useAppSelector } from '../store/hooks';
import { getFeatures } from '../store/documentsSlice';
import { IFeatures } from '../types';

const useRenderFeaturesArray = (text: string): IFeatures[] => {
  const features = useAppSelector(getFeatures);

  const [renderFeaturesArray, setRenderFeaturesArray] = React.useState(features);

  const helperFeatures = (item: { title: string; body: string }) =>
    item.title.includes(text) || item.body.includes(text);

  React.useEffect(() => {
    const includesFeatures = features.some(helperFeatures);

    if (includesFeatures) {
      const temp = [...features];
      const result = temp.filter(helperFeatures);
      setRenderFeaturesArray(result);
    } else {
      setRenderFeaturesArray(features);
    }
  }, [text, features]);

  return renderFeaturesArray;
};

export default useRenderFeaturesArray;
