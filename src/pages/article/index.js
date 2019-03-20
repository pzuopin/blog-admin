import React from 'react'
import api from '../../api'
import { Link } from 'react-router-dom';
// Tag
import { Table, Form, Icon, Input, Button, message } from 'antd';

// function hasErrors(fieldsError) {
//   return Object.keys(fieldsError).some(field => fieldsError[field]);
// }
class articleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      columns: [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id'
        },
        {
          title: '标题',
          dataIndex: 'title',
          key: 'title'
        },
        {
          title: '作者',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '关键字',
          dataIndex: 'keywaorld',
          key: 'keywaorld',
        },
        // {
        //   title: '标签',
        //   key: 'tags',
        //   dataIndex: 'tags',
        //   render: tags => (
        //     <span>
        //       {tags.map(tag => {
        //         let color = tag.length > 5 ? 'geekblue' : 'green';
        //         if (tag === 'loser') {
        //           color = 'volcano';
        //         }
        //         return <Tag color={color} key={tag}>{tag.toUpperCase()}</Tag>;
        //       })}
        //     </span>
        //   ),
        // },
        {
          title: '分类',
          dataIndex: 'classify',
          key: 'classify',
        },
        {
          title: '状态',
          dataIndex: 'state',
          key: 'state',
        },
        {
          title: '观看-点赞-评论',
          dataIndex: 'viewTotal',
          key: 'viewTotal',
        },
        {
          title: 'Action',
          key: 'action',
          width: 120,
          align: 'center',
          render: (text, record) => (
            <span>
              <Button type='danger' onClick={ _ => this.handleClick()}>delete</Button>
            </span>
          ),
        }
      ]
    }
  }

  handleClick () {
    console.log(this)
  }
  componentDidMount() {
    // To disabled submit button at the beginning.
    // this.props.form.validateFields();
    this.getList()
  }
  async getList () {
    this.setState({loading: true})
    const {data } = await api.get('/list')
    this.setState({ data })
    this.setState({loading: false})
  }
  async handleCreate () {
    const { code } = await api.post('example/add', {name: '小花'})
    if (code === 200) this.getList()
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields( async(err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
        const { code } = await api.post('example/add', values)
        if (code === 1000) {
          message.success('新增成功！')
          this.getList()
        }
      }
    });
  }
  render() {
    // getFieldsError
    const {
      getFieldDecorator, getFieldError, isFieldTouched,
    } = this.props.form
    // disabled={hasErrors(getFieldsError())
    // Only show error after a field is touched.
    const userNameError = isFieldTouched('name') && getFieldError('name');
    const passwordError = isFieldTouched('title') && getFieldError('title');
    return (
      <div>
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <Form.Item
            validateStatus={userNameError ? 'error' : ''}
            help={userNameError || ''}
          >
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入作者名字!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入作者名字" />
            )}
          </Form.Item>
          <Form.Item
            validateStatus={passwordError ? 'error' : ''}
            help={passwordError || ''}
          >
            {getFieldDecorator('title', {
              rules: [{ required: true, message: '请输入标题' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入标题" />
            )}
          </Form.Item>
          <Form.Item>
          <Button className='mr10' type="primary" htmlType="submit">
            search
          </Button>
          <Link to='article-item'>
            <Button type='primary'>create</Button>
          </Link>
        </Form.Item>
      </Form>
      <Table
      bordered
      className='mt10'
      loading={this.state.loading}
      columns={ this.state.columns }
      dataSource={ this.state.data }
      rowKey={record => record._id} />
      </div>
    )
  }
}
const article = Form.create({ name: 'horizontal_login' })(articleList)

export default article