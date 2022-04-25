import React from "react";
import Select from "react-select";
import CONSTANTS from "../../Utils/Constants";

function SearchParams(props) {
    const [data,setData] = React.useState(props.data);
    const [comparer,setComparer] = React.useState("=");
    const[selected,setSelected] = React.useState({});
    const[finalValue,setFinalValue] = React.useState(null);
    const [value,setValue] = React.useState({});
    const [valueComb,setValueComb] = React.useState({});
    const [thirdValue,setThirdValue] = React.useState({});
    React.useEffect(()=>{
        // valueChanged({
        //         target:{
        //             name:data[0]?.name,
        //             value:data[0].type
        //         }
            
        // })
    },[]);
    const setValueIsChanged = function(e){
        let _value = value.value;
        if(valSel() == "date"){
            let date = new Date(_value);
            _value = date?`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`:"";            
        } 
        if(valSel()=="combo"){
            _value = value.value+"|"+valueComb.value;
        }
        if(valSel()=="trio"){
            _value = value.value+"|"+valueComb.value+"|"+thirdValue.value;
        }
        setFinalValue(`${e.target.name}${comparer}${_value}`);
        
        props.onValueChanged(`${e.target.name}${comparer}${_value}`);
    }
    const valueChanged = function(e){
        setValue({name:e.target.name,value:e.target.value});
        setValueIsChanged(e);
        
    }
    // const valueCombChanged = function(e){      
    //     let value = e.target.value;
    //     if(valSel() == "date"){
    //         let date = new Date(value);
    //         value = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    //     }        
    //     setValueComb({name:e.target.name,value});        
    // }
    const valSel = ()=>{
        return CONSTANTS.DATA_TYPES[selected?.value];
    }
    const valueCombChanged = (e) =>{
        setValueComb({name:e.target.name,value:e.target.value});
        setValueIsChanged(e);
        //setValueComb(e.target.value);
    }
    const valueChangedThird = (e) =>{
        setThirdValue({name:e.target.name,value:e.target.value});
        setValueIsChanged(e);
        //setThirdValue(e.target.value);
    }
    return (
        <>
            <div className="row">
                <div className="col-12">
                    {/* <h3>Search Params</h3> */}
                </div>
            </div>
            {/* <div className="row">
                <div className="col-12">
                <div class="input-group-prepend">
                            <button className="btn btn-sm">
                                <i class="fa fa-plus"></i>
                            </button>
                        </div>
                </div>
            </div> */}
            <div className="row">
                {/* <div className="col-1">
                    <button className="btn btn-sm">
                        <i class="fa fa-plus"></i>
                    </button>
                </div> */}
                <div className="col-7">
                    <div class="btn-group w-100 mt-3" role="group" aria-label="Basic example" >
                        
                        <Select
                            className="basic-single w-100"
                            type="button"
                            placeholder={"Select Parameters"}
                            classNamePrefix="select"
                            onChange={setSelected}
                            name="color"
                            options={props.data.map(x => { return { value: x.type, label: x.name + ' - ' + x.documentation } })}
                        />
                    </div>
                    <br/>

                </div>
                <div className="col-5 mt-3" >
                    {
                       selected&& valSel() =="date"?<input value={value.value} className="form-control w-100" type="date" name={selected.label.split(' - ')[0].trim()} onChange={valueChanged}/>:<></>
                    }
                    {
                        selected&& valSel() =="text"?<input value={value.value} className="m-0 form-control w-100" type="text" name={selected.label.split(' - ')[0].trim()} onChange={valueChanged}/>:<></>
                    }
                    {
                        selected&& valSel() =="combo"?<><input value={value.value} className="m-0 form-control w-100" type="text" name={selected.label.split(' - ')[0].trim()} onChange={valueChanged}/> <input className="m-0 form-control w-100" value={valueComb.value} type="text" name={selected.label.split(' - ')[0].trim()} onChange={valueCombChanged}/></>:<></>
                    }
                    {
                        selected&& valSel() =="trio"?<><input value={value.value} className="m-0 form-control w-100" type="text" name={selected.label.split(' - ')[0].trim()} onChange={valueChanged}/> <input className="m-0 form-control w-100" value={valueComb.value} type="text" name={selected.label.split(' - ')[0].trim()} onChange={valueCombChanged}/><input className="m-0 form-control w-100" type="text" name={selected.label.split(' - ')[0].trim()} value={thirdValue.value} onChange={valueChangedThird}/></>:<></>
                    }
                </div>
            </div>
        </>
    )
}
export default SearchParams;