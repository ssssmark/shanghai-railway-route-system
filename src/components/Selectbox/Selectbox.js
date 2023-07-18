import React from "react";
import stationname from "../../data/Station-name";
import {AutoComplete} from "antd";
import './Selectbox.css'
export default class Selectbox extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            input_value:' ',
            options:stationname.map((station)=>({
                label: station.value,
                value: station.value
            }))
        }
    }
    onSelect = (data) => {
        console.log('onSelect', data);
        this.setState({input_value:data})
    };
    handlechange=(e)=>{
        this.setState({input_value:e.target.value})
    }
   handleSearch = (value: string) => {
        let res: { label: string }[] = [];
        if (!value || value.indexOf('@') >= 0) {
            res = [];
        } else {
            res = ['gmail.com', '163.com', 'qq.com'].map((domain) => ({
                value,
            }));
        }
        this.setState({options:res})
    };
    render()
    {
        return(
            <AutoComplete
                className="Selectbox"
                options={this.state.options}
                value={this.state.input_value}
                filterOption={(input) =>{
                    return (
                     this.state.options.filter(obj=>obj.value.include(input))
                    );}}
                placeholder="input here"
                allowClear={true}
                          style={{ width: 300 }}
                          backfill={true}
                          onSelect={this.onSelect}
            />
        )
    }
}