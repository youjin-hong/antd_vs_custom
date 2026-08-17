import { Table, Tag } from 'antd'
import type { TableColumnsType } from 'antd'

interface Row {
  key: string
  name: string
  email: string
  role: string
  status: 'active' | 'invited' | 'suspended'
  joinedAt: string
}

const statusColor: Record<Row['status'], string> = {
  active: 'green',
  invited: 'gold',
  suspended: 'red',
}

const columns: TableColumnsType<Row> = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Role',
    dataIndex: 'role',
    filters: [
      { text: 'Admin', value: 'Admin' },
      { text: 'Editor', value: 'Editor' },
      { text: 'Viewer', value: 'Viewer' },
    ],
    onFilter: (value, record) => record.role === value,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    render: (status: Row['status']) => (
      <Tag color={statusColor[status]}>{status}</Tag>
    ),
  },
  {
    title: 'Joined',
    dataIndex: 'joinedAt',
    sorter: (a, b) => a.joinedAt.localeCompare(b.joinedAt),
  },
]

const data: Row[] = [
  { key: '1', name: '김민준', email: 'minjun.kim@example.com', role: 'Admin', status: 'active', joinedAt: '2023-02-14' },
  { key: '2', name: '이서연', email: 'seoyeon.lee@example.com', role: 'Editor', status: 'active', joinedAt: '2023-05-03' },
  { key: '3', name: '박도윤', email: 'doyun.park@example.com', role: 'Viewer', status: 'invited', joinedAt: '2024-01-22' },
  { key: '4', name: '최지우', email: 'jiwoo.choi@example.com', role: 'Editor', status: 'suspended', joinedAt: '2022-11-09' },
  { key: '5', name: '정하은', email: 'haeun.jung@example.com', role: 'Viewer', status: 'active', joinedAt: '2024-06-30' },
  { key: '6', name: '강시우', email: 'siwoo.kang@example.com', role: 'Admin', status: 'active', joinedAt: '2021-09-17' },
]

function AntdDataTable() {
  return (
    <Table<Row>
      columns={columns}
      dataSource={data}
      pagination={{ pageSize: 5 }}
      size="small"
    />
  )
}

export default AntdDataTable
