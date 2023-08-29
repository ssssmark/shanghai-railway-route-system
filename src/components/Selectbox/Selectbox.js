import React, {useState}from "react";
import { allStation} from "../../algorithm";
import {AutoComplete} from "antd";
import './Selectbox.css'
function Selectbox(props){

    const [input_value, setInput] = useState('');
    const [options, setOptions] = useState(allStation.map((station)=>({
        label: station.id,
        value: station.id
    })))


    const onSelect = (data) => {
        setOptions(allStation.map((station)=>({
            label: station.id,
            value: station.id
        })))
        console.log('onSelect', data);
    };
    const onChange=(data:string)=>{
        console.log('onchange', data);
        setInput(data);
        props.get_station(data)
    }
   const onSearch = (data: string) => {
        //恢复到初始化的options
        if (data === '') {
            setOptions(allStation.map((station)=>({
                label: station.id,
                value: station.id
            })))
        }
        console.log('onSearch:', data);
    };
    return(
        <div>
            <AutoComplete
                className="Selectbox"
                value={input_value}
                placeholder="Input station"
                allowClear={true}
                style={{ width: 300 }}
                backfill={true}
                onSelect={onSelect}
                onChange={onChange}
                onSearch={onSearch}
                options={options}
                //自动补全
                filterOption={(inputValue, option) =>
                    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}

            />
        </div>


    )
}


export default Selectbox;