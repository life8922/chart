/*
消息界面路由容器组件
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {List, Badge} from 'antd-mobile'
const Item = List.Item
const Brief = Item.Brief
/*
对chatMsgs按chat_id进行分组, 并得到每个组的lastMsg组成的数组
1. 找出每个聊天的lastMsg, 并用一个对象容器来保存 {chat_id, lastMsg}
2. 得到所有lastMsg的数组
3. 对数组进行排序(按create_time降序)
 */
function   getLastMsgs(chatMsgs, userid){
  //1. 找出每个聊天的lastMsg, 并用一个对象容器来保存 {chat_id：lastMsg}
  const lastMsgObjs={}
  chatMsgs.forEach(msg=>{
    if(msg.to===userid&&!msg.read){
      msg.unReadCount=1
    }else{
      msg.unReadCount=0
    }
  })
  chatMsgs.forEach(msg=>{
    //得到msg的聊天标识id
    const chatId=msg.chat_id
    const lastMsg=lastMsgObjs[chatId]
    if(!lastMsg){
      //当前msg就是所在组的lastMsg
      lastMsgObjs[chatId]=msg
    }else{//有
      //累加
      const unReadCount=lastMsg.unReadCount +msg.unReadCount 
      //如果msg比lastMsg晚
      if(msg.create_time>lastMsg.create_time){
        lastMsgObjs[chatId]=msg
      }
      lastMsgObjs[chatId].unReadCount= unReadCount
    }
  })
  //2. 得到所有lastMsg的数组 Object.values api
  const lastMsgs=Object.values(lastMsgObjs)
  //3. 对数组进行排序(按create_time降序)
  lastMsgs.sort(function (m1, m2) { // 如果结果<0, 将m1放在前面, 如果结果为0, 不变, 如果结果>0, m2前面
    return m2.create_time-m1.create_time
  })
  return lastMsgs
}

class Message extends Component {
  
  render() {
    const {user} = this.props
    const {users, chatMsgs} = this.props.chat
    const lastMsgs = getLastMsgs(chatMsgs, user._id)
    console.log("lastMsgs",lastMsgs)
    return (
      <List style={{marginTop:50, marginBottom: 50}}>
        {

　　　　　/* 　numbers.map(function(item){

　　　　　　　　return <li>{item}</li>

　　　　　　}) */
      lastMsgs.map(msg=>{
          // 得到目标用户的id
          const targetUserId = msg.to===user._id ? msg.from : msg.to
         // 得到目标用户的信息
         const targetUser = users[targetUserId]
         return (<Item
        key={msg._id}
        extra={<Badge text={msg.unReadCount}/>}
        thumb={targetUser.header ? require(`../../assets/images/${targetUser.header}.png`):null}
        arrow='horizontal'
        onClick={() => this.props.history.push(`/chart/${targetUserId}`)}
        >
        {msg.content}
        <Brief>{targetUser.username}</Brief>
        </Item>)
            
      })
      }
      </List>
    )
  }
}

export default connect(
  state => ({user: state.user,chat: state.chat}),
  {}
)(Message)
//http://localhost:3000/#/chart/5c4861c325a6234598dbc6ed
//http://localhost:3000/#/chat/5c4861c325a6234598dbc6ed