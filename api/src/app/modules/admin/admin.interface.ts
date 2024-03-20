export type adminFilters = {
  searchTerm?: string;
  firstName?: string;
  lastName?: string;
}

export const adminFiltersData = ['searchTerm', 'firstName', 'lastName']
export const adminOptions = ['limit', 'page', 'sortBy', 'sortOrder']

export const AdminSearchableFields = ['firstName', 'lastName']
