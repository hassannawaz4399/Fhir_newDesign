import Select from "react-select";
import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import SearchComponent from '../../components/Home/SearchComponent'
import SearchParams from '../../components/Home/SearchParams'
import CONSTANTS from '../../Utils/Constants'
import { getCall } from './../../Utils/Api'
import "./Home.css"
import ReadModal from "./ReadModal";

function Home() {
    const history = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [resource, setresource] = useState([])
    const [options, setOptions] = useState([])
    const [resourceSelected, setResourceSelected] = useState("")
    const [value, setvalue] = useState()
    const [sortData, setSearchparam] = useState([])
    const [datatype, setdatatype] = useState("")
    const [readResult, setReadResult] = useState();
    const [selection, setSelection] = useState("")
    const [selectedDate, setSelectedDate] = useState("")
    const [resultSet, setResultSet] = useState([])
    const [url] = useState("http://hapi.fhir.org/baseR4/Observation");
    const [searchArray, setSearchArray] = useState([]);
    const [inludes, setInludes] = useState([]);
    const [sortSelected, setSortSelected] = useState([]);
    const [datasort, setdatasort] = useState([]);
    useEffect(() => {
        getdata();
    }, [])



    const getdata = async () => {
        const data = await getCall("metadata");
        if (!data) return;
        setresource(data.rest[0].resource.filter(x => x.extension && x.extension.length > 0));
        setSearchparam(data.rest[0].resource[0].searchParam);
        setInludes(data.rest[0].resource[0].searchInclude);
        reset();
        setResourceSelected(data.rest[0].resource[0].type);
    }

    //console.log(resource.type)
    const observation = (e) => {

        setvalue(e)
        const SearchParam = e;
        const result = resource.find(({ type }) => type === SearchParam);
        setSearchparam(result.searchParam)
        setInludes(result.searchInclude);
        setdatatype(result.searchParam)
        reset();
        setResourceSelected(result.type);
        setSearchArray([]);
    }
    var data;
    const Selection = (e) => {
        data = e;
        setSelection(e)
    }


    const onReadClick = function (id) {




        getCall(id).then(x => {

            setReadResult(x);

        })
        setIsModalOpen(true);
        // if (!readId) {
        //     alert("No Id specified");
        //     return;
        // }
        // let url = selectedResource+"/" + readId + (readVId ? "/_history/" + readVId : "");
        // getCall(url).then(x => {
        //     setReadResult(x);
        //     setIsModalOpen(true);
        // })
    }






    //end 
    // const onDateChange = (e) => {
    //     setSelectedDate(e.target.value);
    // }

    const reset = function () {

        var allchecked = document.querySelectorAll("[name='search_include']");
        for (let i = 0; i < allchecked.length; i++) {
            const el = allchecked[i];
            el.checked = false;
        }
    }
    const onSearchClick = async (e) => {
        var allchecked = document.querySelectorAll("[name='search_include']:checked");

        var queryParams = searchArray.map(x => x.selection).join("&");
        queryParams += "&_include=" + [datasort].map(x => x).join("&_include=");
        console.log(queryParams)
        var result = await getCall(resourceSelected + "?" + (options ?? "") + "&" + (queryParams ?? "") + (sortSelected ? "&_sort=" + sortSelected : ""));



        if (result)
            setResultSet(result.entry);
    }
    const optionChanged = e => {
        setOptions(e);
    }

    {/* ********************Get DropDown Value*************************** */ }

    const datasearch = (e) => {
        // setdatasort(e[0]?.value)
        // console.log(datasort)
        // let value = Array.from(e.target.selectedOptions, option => option.value);
        // console.log(value)
        setdatasort(Array.isArray(e) ? e.map(x => x.value) : []);

    }


    return (
        // <div className='container'>

        <div className="row">

            <div className="col-12 col-lg-4 datacolunm">

                {
                    resource && resource.length > 0 ? <SearchComponent onOptionChange={optionChanged} onChange={observation} resources={resource} defaultResource={{ value: resource[0].type, label: resource[0].type + " (" + resource[0].extension[0].valueDecimal + ")" }}></SearchComponent> : <div>Loading...</div>
                }



                {/* ################Sort btn################ */}
                <article className="sortheading my-3">
                    <label>Search Parameters </label>
                    {/* <p className="sortresult">Sort Results</p> */}



                    <article className='sortcontiner'>
                        <button className='btn' onClick={() => { setSearchArray([...searchArray, { sortData: sortData }]) }}>
                            <i className='fa fa-plus'></i>
                        </button>


                        {/* <label data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-funnel" viewBox="0 0 16 16">
                                <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z" />
                            </svg>
                        </label> */}
                        <Select
                            className="search_include sortbtn"
                            classNamePrefix="select"
                            name="color"
                            options={CONSTANTS.SORT.map((x, i) => { return { value: x, label: x } })}
                        />



















                        {/* <select value={sortSelected} onChange={e=>setSortSelected(e.target.value)}>
            {
                CONSTANTS.SORT.map((x,i)=><option value={x} key={i}>{x??"Default Sort"}</option>)
            }
            </select> */}
                    </article>

                </article>




                {
                    searchArray.map(x => {
                        return <SearchParams data={x.sortData} onValueChanged={(e) => { x.selection = e; setSearchArray(searchArray) }} />
                    })
                    // sortData && sortData.length > 0 ? <SearchParams onValueChanged={Selection} data={sortData} ></SearchParams> : <></>
                }

                {/* ********************DropDown*************************** */}

                <article className='hintcontent mt-3'>
                    <Select
                        classNamePrefix="select"
                        placeholder={"Select Param"}
                        // defaultValue={props.defaultResource}
                        label="test"
                        isMulti
                        name="colors"
                        onChange={datasearch}
                        className="basic-multi-select"
                        // onChange={(e) => { props.onChange(e.value) }} 
                        options={inludes.map(x => { return { value: x, label: x } })}

                    />
                    <br />
                    <div><b>Selected Value: </b> {JSON.stringify(datasort, null, 2)}</div>
                </article>
                <div>
                    <button className='btn btn-primary btn-block btncolor mb-5' onClick={onSearchClick}>Search</button>
                </div>
            </div>



            <div className="col-12 col-lg-8">
                <h2 className="mt-3 tablehide">Table Data:</h2>
                <article>
                    {resultSet && resultSet.length > 0 &&
                        <article>
                            <div>
                                <table className='table table-striped table-bordered'>
                                    <thead>
                                        <tr>
                                            <th>

                                            </th>
                                            <th>
                                                ID
                                            </th>
                                            <th>
                                                Updated
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            resultSet.map((c, i) => {
                                                const id = `${c.resource.resourceType}/${c.resource.id}/_history/1`
                                                return (
                                                    <tr>
                                                        <td className='d-flex flex-row'>
                                                            <button className='btn readbtn btn-primary btn-sm' onClick={() => onReadClick(id)}>Read</button>
                                                            <button className='btn btn-primary updatebtn btn-sm ml-2'>Update</button>
                                                        </td>
                                                        <td>
                                                            <a href={c.fullUrl + "/_history/1"}>{`${c.resource.resourceType}/${c.resource.id}/_history/1`}</a>
                                                        </td>
                                                        <td>
                                                            {new Date(c.resource.meta.lastUpdated).toLocaleString()}
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            {isModalOpen && <ReadModal data={readResult} onModalClose={e => setIsModalOpen(false)} />
                            }

                        </article>
                    }
                </article>

                <Outlet />
            </div>

        </div >
        // </div>

    )
}

export default Home;
