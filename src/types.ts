export interface IState {
  documents: IDocuments[] | [];
  secondDocuments: ISecondDocuments[] | [];
  features: IFeatures[] | [];
  searchTextDocuments: string | '';
  searchTextFeatures: string | '';
  newTitleForFeatures: ITitleForFeatures;
  status: null | string;
  error: null | string;
}
export interface ITitleForFeatures {
  id: null | number;
  text: string | '';
}

export interface IDocuments {
  id: number;
  name: string;
  username: string;
  email: string;
  address: IAddress;
  phone: string;
  website: string;
  company: ICompany;
}

interface IGeo {
  lat: string;
  lng: string;
}

interface IAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: IGeo;
}

interface ICompany {
  name: string;
  catchPhrase: string;
  bs: string;
}
export interface ISecondDocuments {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface IFeatures {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface ResponseSecondDocuments {
  data: ISecondDocuments[];
}
