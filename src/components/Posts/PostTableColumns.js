export const POST_TABLE_COLUMNS = [
  {
    Header: 'Title',
    Footer: 'Title',
    accessor: 'title',
    disableFilters: true,
    Cell: row => <div style={{ textAlign: "left" }}>{row.value}</div>
  },
  {
    Header: 'Body',
    Footer: 'Body',
    accessor: 'body',
    disableFilters: true
  }
]