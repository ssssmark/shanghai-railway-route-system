import React  from "react";
import { allStation} from "../../algorithm";
import {AutoComplete} from "antd";
import './Selectbox.css'
export default class Selectbox extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            input_value:'',
            options:allStation.map((station)=>({
                label: station.id,
                value: station.id
            }))
        }
    }
    onSelect = (data) => {
        this.setState({
            options:allStation.map((station)=>({
                label: station.id,
                value: station.id
            }))
        })
    };
    onChange=(data)=>{
        console.log('onchange', data);
        this.setState({input_value:data})
        this.props.get_station(data)
    }
    resetstate=()=>{
        this.state={
           options:allStation.map((station)=>({
               label: station.id,
               value: station.id
           }))
       }
    }
   onSearch = (value: string) => {
        //从options中间找有没有包含value的,有就返回搜索结果,没有不返回
        this.resetstate()
        console.log('onSearch:', value);
        //遍历options,找到包含value的
        let result = [];
        for (let i = 0; i < this.state.options.length; i++) {
            if (this.state.options[i].value.includes(value)) {
                result.push(this.state.options[i]);
            }
        }
        //显示options中result的结果
        this.setState({
            options: result
        })


    };
    render()
    {
        return(
            <div>
                <AutoComplete
                    className="Selectbox"
                    value={this.state.input_value}
                    placeholder="Input station"
                    allowClear={true}
                    style={{ width: 300 }}
                    backfill={true}
                    onSelect={this.onSelect}
                    onChange={this.onChange}
                    onSearch={this.onSearch}
                    options={this.state.options}
                />
            </div>


        )
    }
}