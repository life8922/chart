/*
注册的路由组件
 */

import React, {Component} from 'react'
import {
  NavBar,
  WingBlank,
  List,
  InputItem,
  WhiteSpace,
  Radio,
  Button
} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {register} from '../../redux/actions'
import Logo from '../../components/logo/logo'

const ListItem = List.Item

class Register extends Component {
  state = {
    username: '',  // 用户名
    password: '',  // 密码
    password2: '',  // 确认密码
    type: 'laoban',  // 用户类型名称   dashen/laoban
  }

  // 点击注册调用
  register = () => {
    //console.log(this.state)
    this.props.register(this.state)
  }

  // 处理输入数据的改变: 更新对应的状态
  handleChange = (name, val) => {
    // 更新状态
    this.setState({
      [name]: val  // 属性名不是name, 而是name变量的值
    })
  }

  toLogin = () => {
    this.props.history.replace('/login')
  }

  render() {
    const {type} = this.state
    const {msg, redirectTo} = this.props.user
    // 如果redirectTo有值, 就需要重定向到指定的路由
    if(redirectTo) {
      return <Redirect to={redirectTo}/>
    }

    return (
      <div>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {register} //链接redux 给本容器Register传数据
)(Register)