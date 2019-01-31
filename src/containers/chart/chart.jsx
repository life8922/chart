import React, { Component } from 'react'
import {NavBar, List, InputItem, Grid, Icon} from 'antd-mobile'
import {connect} from 'react-redux'
import {sendMsg, readMsg} from '../../redux/actions'
import QueueAnim from 'rc-queue-anim'
const Item = List.Item
 class Chart extends Component {
    state={
        content:"",
        isShow:false
    }

    componentWillMount(){
        const emojis = ['❤️', '❤️', '❤️','❤️', '❤️', '❤️', '❤️','❤️', '❤️', '❤️', '❤️','❤️'
        ,'❤️', '❤️', '❤️','❤️', '❤️', '❤️', '❤️','❤️', '❤️', '❤️', '❤️','❤️'
        ,'❤️', '❤️', '❤️','❤️', '❤️', '❤️', '❤️','❤️', '❤️', '❤️', '❤️','❤️'
        ,'❤️', '❤️', '❤️','❤️', '❤️', '❤️', '❤️','❤️', '❤️', '❤️', '❤️','❤️']
      this.emojis = emojis.map(emoji => ({text: emoji}))
      console.log('emojis',this.emojis)
    }

    componentDidMount() {
        // 初始显示列表
        window.scrollTo(0, document.body.scrollHeight)
        const targetId=this.props.match.params.userid
        const to=this.props.user._id
        this.props.readMsg(targetId,to)
    
      }
      componentWillUnmount(){
        const targetId=this.props.match.params.userid
        const to=this.props.user._id
        this.props.readMsg(targetId,to)
    
      }
    
      componentDidUpdate () {
        // 更新显示列表
        window.scrollTo(0, document.body.scrollHeight)
      }
    
    handleSend=()=>{
       const from=this.props.user._id
      const to=this.props.match.params.userid
      const content=this.state.content.trim()
     if(content){
         this.props.sendMsg({from,to,content})
     }
         // 清除输入数据
    this.setState({
        content: '',
        
      })
    }

    toggleShow = () => {
        const isShow = !this.state.isShow
        this.setState({isShow})
        if(isShow) {
          // 异步手动派发resize事件,解决表情列表显示的bug
          setTimeout(() => {
            window.dispatchEvent(new Event('resize'))
          }, 0)
        }
      }


    render() {
    
        console.log('渲染')
        const {user} = this.props
    const {users, chatMsgs} = this.props.chat

    // 计算当前聊天的chatId
    const meId = user._id
    if(!users[meId]) { // 如果还没有获取数据, 直接不做任何显示
      return null
    }
    const targetId = this.props.match.params.userid
    const chatId = [meId, targetId].sort().join('_')
       // 对chatMsgs进行过滤
    //const msgs = chatMsgs.filter(msg => msg.chat_id===chatId)
     // 对chatMsgs进行过滤
     
     //debugger
     const msgs = chatMsgs.filter(msg => msg.chat_id===chatId)
         // console.log('msgs',msgs)
    // 得到目标用户的header图片对象
    const targetHeader = users[targetId].header
    const targetIcon = targetHeader ? require(`../../assets/images/${targetHeader}.png`) : null




        return (
        <div id='chat-page'>
        <NavBar icon={<Icon type='left'/>} className='sticky-header'
        onLeftClick={()=> this.props.history.goBack()}
        >{users[targetId].username}</NavBar>
        <List style={{marginTop:50, marginBottom: 50}}>
        <QueueAnim type='left' delay={200}>
            {
              msgs.map(msg => {
                if(targetId===msg.from) {// 对方发给我的
                    return (
                        <Item
                          key={msg._id}
                          thumb={targetIcon}
                        >
                          {msg.content}
                        </Item>
                      )
                } else { // 我发给对方的
                  return (
                    <Item
                      key={msg._id}
                      className='chat-me'
                      extra='我'
                    >
                      {msg.content}
                    </Item>
                  )
                }
              })
            }
         
         </QueueAnim>
        </List>
        <div className='am-tab-bar'>
        <InputItem placeholder="请输入"
        value={this.state.content}
        onChange={val=>this.setState({content:val})}
        onFocus={() => this.setState({isShow: false})}
        extra={
            <span>
                <span onClick={this.toggleShow}>❤️</span>
                <span onClick={this.handleSend}>发送</span>
            </span>
        
        }
        />
         {this.state.isShow ? (
            <Grid
              data={this.emojis}
              columnNum={8}
              carouselMaxRow={4}
              isCarousel={true}
              onClick={(item) => {
                this.setState({content: this.state.content + item.text})
              }}
            />
          ) : null}
        </div>
        </div>
        )
    }       
}

export default connect(
    state=>({user: state.user,chat:state.chat}),
    {sendMsg,readMsg}
)(Chart)
