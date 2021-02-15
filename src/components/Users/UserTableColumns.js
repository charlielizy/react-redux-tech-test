export const USER_TABLE_COLUMNS = [
  {
    Header: 'Id',
    Footer: 'Id',
    accessor: 'id',
    disableFilters: true,
    textAlign: 'left'
  },
  {
    Header: 'Name',
    Footer: 'Name',
    accessor: 'name',
    Cell: row => <div style={{ textAlign: "left" }}>{row.value}</div>
  },
  {
    Header: 'Email',
    Footer: 'Email',
    accessor: 'email',
    disableFilters: true
  },
  {
    Header: () => (<div style={{ textAlign:"right" }}>City</div>),
    Footer: 'City',
    accessor: 'address.city',
    disableFilters: true,
    disableSortBy: true,
    Cell: row => <div style={{ textAlign: "right" }}>{row.value}</div>
  },
  {
    Header: () => (<div style={{ textAlign:"right" }}>Company</div>),
    Footer: 'Company',
    accessor: 'company.name',
    disableFilters: true,
    disableSortBy: true,
    Cell: row => <div style={{ textAlign: "right" }}>{row.value}</div>
  },
]