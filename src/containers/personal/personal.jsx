/*
用户个人中心路由组件
 */

import React from 'react'

import {connect} from 'react-redux'

import {resetUser} from '../../redux/actions'




class Personal extends React.Component {



  render() {
    const {username, info, header, company, post, salary} = this.props.user
    return (
     <div>geren</div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {resetUser}
)(Personal)