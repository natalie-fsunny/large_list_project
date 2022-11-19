export type User = {
  name: string;
  email: string;
  petType: string;
  petName: string;
  favoriteColor: string;
  job: string;
  id: string;
};

export type Settings = {
  search: { searchProperty: string; searchString: string };
  filter: { filterProperty: string; filterString: string };
  sort: { sortProperty: string };
};
