/*
老板主界面路由容器组件
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'


class Laoban extends Component {
  componentDidMount () {
   
  }
  render () {
    return (
      <div></div>
    )
  }
}

export default connect(
  state => ({userList: state.userList}),
  {}
)(Laoban)