import React, { Component } from 'react';
import './App.css';
import { Button,Icon,List,Popup,InputItem } from 'antd-mobile';


const Item = List.Item;
const Brief = Item.Brief;
class App extends Component {
    constructor(props){
        super(props);
        this.state={
            instrument:[],
        };
        this.formData={};
        this.showAddModal = this.showAddModal.bind(this);
    }
    componentDidMount(){
        this.loadList()
    }
    async loadList(){
        let res = await fetch('http://qq.kkiqq.cn/api/instrument');
        let data = await res.json();
        this.setState({
            instrument:data
        })
    }
    formAddChaged(type,value){
        this.formData[type]=value;
    }
    showAddModal(){
        this.formData = {};
         Popup.show(<div>
      <List renderHeader={() => (
        <div style={{ position: 'relative' }}>
         输入仪器信息 
          <span  style={{position: 'absolute', right: 3, top: -5}} onClick={() => this.onClose('cancel')}>
            <Icon type="cross" />
          </span>
        </div>)}
        className="popup-list"
      >
          <Item>
              <InputItem onChange={this.formAddChaged.bind(this,'code')}>设备编码</InputItem>
          </Item>
          <Item>
              <InputItem onChange={this.formAddChaged.bind(this,'factory-number')}>出厂编号</InputItem>
          </Item>
          <Item>
              <InputItem onChange={this.formAddChaged.bind(this,'device-name')}>设备名称</InputItem>
          </Item>
          <Item>
              <InputItem onChange={this.formAddChaged.bind(this,'device-type')}>设备型号</InputItem>
          </Item>
          <Item>
              <InputItem onChange={this.formAddChaged.bind(this,'span/accuracy')}>量程and准确度</InputItem>
          </Item>
          <Item>
              <InputItem onChange={this.formAddChaged.bind(this,'accessories')}>配件</InputItem>
          </Item>
          <Item>
              <InputItem onChange={this.formAddChaged.bind(this,'original-value')}>原值</InputItem>
          </Item>
          <Item>
              <InputItem onChange={this.formAddChaged.bind(this,'trace-period')}>溯源周期（月）</InputItem>
          </Item>
          <Item>
              <InputItem onChange={this.formAddChaged.bind(this,'trace-date')}>最近溯源日期</InputItem>
          </Item>
          <Item>
              <InputItem onChange={this.formAddChaged.bind(this,'charge-in-date')}>开始收入时间</InputItem>
          </Item>
          <Item>
              <InputItem onChange={this.formAddChaged.bind(this,'stop-using-date')}>停止使用时间</InputItem>
          </Item>
          <Item>
              <InputItem onChange={this.formAddChaged.bind(this,'charge-out-date')}>结束收入时间</InputItem>
          </Item>
         <Item>
              <InputItem onChange={this.formAddChaged.bind(this,'comment')}>备注</InputItem>
          </Item>
         <Item>
              <InputItem onChange={this.formAddChaged.bind(this,'trace-way')}>现场or送检</InputItem>
          </Item>
         <Item>
              <InputItem onChange={this.formAddChaged.bind(this,'trace-contacts')}>检定员</InputItem>
          </Item>
          <Item>
              <InputItem onChange={this.formAddChaged.bind(this,'trace-certificate-num')}>证书编号</InputItem>
          </Item>
        <Item>
              <InputItem onChange={this.formAddChaged.bind(this,'trace-parameter')}>检定参数</InputItem>
          </Item>
          <Item>
              <InputItem onChange={this.formAddChaged.bind(this,'trace-result')}>检定结论</InputItem>
          </Item>
          <Item>
              <InputItem onChange={this.formAddChaged.bind(this,'repair-record')}>设备维修情况</InputItem>
          </Item>
          <Item>
              <InputItem onChange={this.formAddChaged.bind(this,'assets-type')}>资产类别</InputItem>
          </Item>
          <Item>
              <InputItem onChange={this.formAddChaged.bind(this,'expense-per-trace')}>检定费用</InputItem>
          </Item>
          <Item>
              <InputItem onChange={this.formAddChaged.bind(this,'allowed-users')}>授权使用人</InputItem>
          </Item>
          <Item>
              <InputItem onChange={this.formAddChaged.bind(this,'person-in-charge')}>责任人</InputItem>
          </Item>

        </List>
          <Button type="primary" onClick={() => this.onAdd('cancel')}>添加</Button>
    </div>, { animationType: 'slide-up', maskClosable: false });
    }
    onAdd = ()=>{
        this.addItem(this.formData);
        this.onClose();
    }
    onClose = (sel) => {
        Popup.hide();
  };
    async addItem(data){
        var res =  await fetch('http://qq.kkiqq.cn/api/instrument',{
            method:"POST",mode: 'cors', 
            body:JSON.stringify(data)
        })
        this.loadList();
    }
  render() {
    return (
        <div className="App">
            <Button type='primary' onClick={this.showAddModal}>Add </Button>
            <Icon type="check" />
            <List>
                {this.state.instrument.map((data)=>{
                    return (<Item>{data.name}-{data.type}</Item>)
                })}
            </List>
        </div>
    );
  }
}

export default App;
