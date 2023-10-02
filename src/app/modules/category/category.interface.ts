export type ICategoryCreateData = {
  title: string;
};

export type IPrerequisiteCategoryRequest = {
  CategoryId: string;
};

export type ICategoryFilterRequest = {
  searchTerm?: string | undefined;
};
