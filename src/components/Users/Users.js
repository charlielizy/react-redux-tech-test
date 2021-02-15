import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useTable, useSortBy, useFilters } from 'react-table'
import LinearProgress from '@material-ui/core/LinearProgress'

import { fetchUsers } from '../../redux'
import { USER_TABLE_COLUMNS } from './UserTableColumns'
import { ColumnFilter } from '../../utils/ColumnFilter'

const Users = () => {
  // redux state and dispatch
  const userData = useSelector(state => state.user)
  const dispatch = useDispatch()
  useEffect(() => { dispatch(fetchUsers())}, [])

  const history = useHistory()
  const handleRowClick = (row) => {
    history.push(`/posts/${row.original.id}`)
  }

  //react-table setup
  const defaultColumn = React.useMemo(() => ({ Filter: ColumnFilter }), [])
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns: USER_TABLE_COLUMNS,
      data: userData.users,
      defaultColumn
    },
    useFilters,
    useSortBy
  )

  return (
    <div className='userWrapper'>
      { userData.users.length === 0 ? <LinearProgress /> :
        <table {...getTableProps()} data-testid='userTable'>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th text-align={column.textAlign} {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
                        : ''}
                    </span>
                    <div>{column.canFilter ? column.render('Filter') : null}</div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()} onClick={() => handleRowClick(row)} >
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })}
                </tr>
              )
            })}
          </tbody>
        </table> }
    </div>
  )
}

export default Users
