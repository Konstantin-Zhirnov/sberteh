import React from 'react';
import { useAppSelector } from '../store/hooks';
import { getDocuments } from '../store/documentsSlice';
import { IDocuments } from '../types';

const useRenderDocumentsArray = (text: string): IDocuments[] => {
  const documents = useAppSelector(getDocuments);

  const [renderDocumentsArray, setRenderDocumentsArray] = React.useState(documents);

  const helperDocuments = (item: {
    name: string;
    username: string;
    email: string;
    website: string;
  }) =>
    item.name.includes(text) ||
    item.username.includes(text) ||
    item.email.includes(text) ||
    item.website.includes(text);

  React.useEffect(() => {
    const includesDocuments = documents.some(helperDocuments);

    if (includesDocuments) {
      const temp = [...documents];
      const result = temp.filter(helperDocuments);
      setRenderDocumentsArray(result);
    } else {
      setRenderDocumentsArray(documents);
    }
  }, [text, documents]);

  return renderDocumentsArray;
};

export default useRenderDocumentsArray;
