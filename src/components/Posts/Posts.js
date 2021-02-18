import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useTable, useSortBy, useFilters } from 'react-table'
import LinearProgress from '@material-ui/core/LinearProgress'

import { fetchPosts, fetchUsers } from '../../redux'
import { POST_TABLE_COLUMNS } from './PostTableColumns'
import { ColumnFilter } from '../../utils/ColumnFilter'

const Posts = () => {
  const { userId } = useParams()

  const stateData = useSelector(state => state)
  const dispatch = useDispatch()
  useEffect(() => { dispatch(fetchUsers()) }, [])
  useEffect(() => { dispatch(fetchPosts(userId)) }, [])

  //get username by userId
  const user = stateData.user.users.find(obj => {
    return obj.id == userId
  })

  //react-table setup
  const defaultColumn = React.useMemo(() => ({ Filter: ColumnFilter }), [])
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns: POST_TABLE_COLUMNS,
      data: stateData.post.posts,
      defaultColumn
    },
    useFilters,
    useSortBy
  )

  return (
    <div className='postWrapper'>
      { stateData.user.users.length !== 0 ? <div className='postHeader'>{user.name}'s Posts</div> : null}
      { stateData.post.posts.length === 0 ? <LinearProgress /> :
        <table {...getTableProps()} data-testid='postTable'>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
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
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      }
    </div>
  )
}

export default Posts
