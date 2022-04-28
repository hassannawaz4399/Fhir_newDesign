import React, { useEffect, useState } from "react";
import { deleteCall, getCall, postCall, putCall } from "../../Utils/Api";
import ReadModal from "./ReadModal";
import SearchComponent from '../../components/Home/SearchComponent';
import Select from "react-select";
import HistoryModal from "./HistoryModal";
const Crud = () => {
    const [resource, setResource] = useState([]);
    const [selectedResource, setSelectResource] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [readId, setReadId] = useState("");
    const [readVId, setReadVId] = useState("");
    const [hId, setHid] = useState("");
    const [hvid, setHvid] = useState("");
    const [hlimit, setHLimit] = useState("");
    const [delId, setDelId] = useState("");
    const [createId, setCreateId] = useState("");
    const [createBody, setCreateBody] = useState("");
    const [updateId, setUpdateId] = useState("");
    const [updateBody, setUpdateBody] = useState("");
    const [validateContent, setValidateContent] = useState("");
    const [readResult, setReadResult] = useState();
    const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
    const [historyResult, setHistoryResult] = useState([]);
    useEffect(async () => {
        const data = await getCall("metadata");
        if (!data) return;
        setResource(data.rest[0].resource.filter(x => x.extension && x.extension.length > 0));
        setSelectResource(data.rest[0].resource[0].type);
    }, []);


    const onReadClick = function () {
        if (!readId) {
            alert("No Id specified");
            return;
        }
        let url = selectedResource + "/" + readId + (readVId ? "/_history/" + readVId : "");
        getCall(url).then(x => {
            setReadResult(x);
            setIsModalOpen(true);
        })
    }


    const onResourceChange = function (e) {
        setSelectResource(e);
    }
    const onHistoryClick = async e => {
        let url = selectedResource;
        if (hId) {
            url += "/" + hId;
        }
        url += "/_history"
        let opts = [];
        if (hvid) opts.push({ name: "since", value: hvid });
        if (hlimit) opts.push({ name: "_count", value: hlimit });
        url += (opts.length > 0 ? "?" + opts.map(x => x.name + "=" + x.value).join("&") : "");
        let result = await getCall(url);
        console.log("here", result);
        if (result) {
            setHistoryResult(result);
            setIsHistoryModalOpen(true);
        }
    }
    const onDeleteClick = async e => {
        if (!delId) return alert("ID requried");

        const result = await deleteCall(selectedResource + "/" + delId);
        if (result) {
            alert("Show result");
        }
        let sampleResponse = {
            "resourceType": "OperationOutcome",
            "text": {
                "status": "generated",
                "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\"><h1>Operation Outcome</h1><table border=\"0\"><tr><td style=\"font-weight: bold;\">INFORMATION</td><td>[]</td><td><pre>Successfully deleted 1 resource(s) in 5ms</pre></td>\n\t\t\t</tr>\n\t\t</table>\n\t</div>"
            },
            "issue": [{
                "severity": "information",
                "code": "informational",
                "diagnostics": "Successfully deleted 1 resource(s) in 5ms"
            }]
        };
    }
    const onCreateClick = async e => {
        let _createBody = JSON.parse(createBody);
        if (_createBody && _createBody["resourceType"]) {
            let url = selectedResource + "?_format=json&_pretty=true";
            const result = await postCall(url, _createBody);
            if (result) {
                alert("Show result");
                let sampleResult = {
                    "resourceType": "Patient",
                    "id": "2835309",
                    "meta": {
                        "versionId": "1",
                        "lastUpdated": "2022-03-10T15:21:01.561+00:00"
                    },
                    "text": {
                        "status": "generated",
                        "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\"><table class=\"hapiPropertyTable\"><tbody/></table></div>"
                    }
                };
            }
        } else {
            alert("Invalid");
        }

    }
    const onUpdateClick = async e => {
        if (!updateId) return alert("ID required");

        let _updateBody = JSON.parse(updateBody);
        _updateBody["id"] = updateId;
        if (_updateBody && _updateBody["resourceType"]) {
            let url = selectedResource + "/" + updateId + "?_format=json&_pretty=true";
            const result = await putCall(url, _updateBody);
            if (result) {
                alert("Show result");
                let sampleResult = {
                    "resourceType": "Patient",
                    "id": "2835302",
                    "meta": {
                        "versionId": "3",
                        "lastUpdated": "2022-03-10T15:26:15.616+00:00"
                    },
                    "text": {
                        "status": "generated",
                        "div": "<div xmlns=\"http://www.w3.org/1999/xhtml\"><table class=\"hapiPropertyTable\"><tbody/></table></div>"
                    }
                };
            }
        } else {
            alert("Invalid");
        }
    }
    const onValidateClick = e => {

    }
    return (
        <>

            <div className="row ">
                {/* ----Curd------- */}
                <div className="col-4 datacolunm">
                    {
                        resource && resource.length > 0 ? <SearchComponent hideOption={true} onChange={onResourceChange} resources={resource} defaultResource={{ value: resource[0].type, label: resource[0].type + " (" + resource[0].extension[0].valueDecimal + ")" }}></SearchComponent> : <Select placeholder="loading..." isDisabled={true} />
                    }

                    <div className="row mt-3">
                        <div className="col-lg-12 col-12">
                            <strong>Read</strong> an individual resource instance given its ID (and optionally a version ID to retrieve a specific version of that instance to vread that instance)
                            <div className="curd">
                                <button className="align-items-center btn btn-primary">
                                    <i className="fa fa-book mr-2"></i>
                                    Read
                                </button>
                                <div className="input-group ml-3" style={{ maxWidth: 300 }}>
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">ID*</span>
                                    </div>
                                    <input type="text" className="form-control m-0" placeholder="" value={readId} onChange={e => setReadId(e.target.value)} aria-label="Username" aria-describedby="basic-addon1" />
                                </div>
                                <div className="input-group " style={{ maxWidth: 400 }}>
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">Version ID</span>
                                    </div>
                                    <input type="text" className="form-control m-0" placeholder="Add for vread" value={readVId} onChange={e => setReadVId(e.target.value)} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-lg-12 col-12">
                            Retrieve the update <strong>history</strong> across the Observation resource type, or against a specific instance of this resource type if an ID is specified.
                            <div className="curd">
                                <button className="align-items-center btn btn-primary" onClick={onHistoryClick}>
                                    <i className="fa fa-calendar-o mr-2"></i>
                                    History
                                </button>
                                <div className="input-group" style={{ maxWidth: 300 }}>
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">ID</span>
                                    </div>
                                    <input value={hId} onChange={e => setHid(e.target.value)} type="text" className="form-control m-0" placeholder="(Instance ID)" aria-label="Username" aria-describedby="basic-addon1" />
                                </div>
                                <div className="input-group" style={{ maxWidth: 400 }}>
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">Version ID</span>
                                    </div>
                                    <input value={hvid} onChange={e => setHvid(e.target.value)} type="text" className="form-control m-0" placeholder="(opt)" aria-label="Username" aria-describedby="basic-addon1" />
                                </div>
                                <div className="input-group" style={{ maxWidth: 250 }}>
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">Limit</span>
                                    </div>
                                    <input value={hlimit} onChange={e => setHLimit(e.target.value)} type="text" className="form-control m-0" placeholder="#" aria-label="Username" aria-describedby="basic-addon1" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-lg-12 col-12">
                            <strong>Delete</strong> an individual instance of the resource
                            <div className="curd">
                                <button className="align-items-center btn btn-primary" onClick={onDeleteClick}>
                                    <i className="fa fa-trash-o mr-2"></i>
                                    Delete
                                </button>
                                <div className="input-group ml-3" style={{ maxWidth: 300 }}>
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">ID*</span>
                                    </div>
                                    <input value={delId} onChange={e => setDelId(e.target.value)} type="text" className="form-control m-0" placeholder="" aria-label="Username" aria-describedby="basic-addon1" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-12">
                            <strong>Create</strong> an instance of the resource. Generally you do not need to specify an ID but you may force the server to use a specific ID by including one.
                            <div className="curd">
                                <button className="align-items-center btn btn-primary" onClick={onCreateClick}>
                                    <i className="fa fa-plus mr-2"></i>
                                    Create
                                </button>
                                <div className="input-group" style={{ maxWidth: 300 }}>
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">ID</span>
                                    </div>
                                    <input value={createId} onChange={e => setCreateId(e.target.value)} type="text" className="form-control m-0" placeholder="" aria-label="Username" aria-describedby="basic-addon1" />
                                </div>
                                <div className="input-group" style={{ maxWidth: 400 }}>
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">Version ID</span>
                                    </div>
                                    <textarea value={createBody} onChange={e => setCreateBody(e.target.value)} style={{ height: 38 }} type="text" className="form-control m-0" placeholder="Place resource here" aria-label="Username" aria-describedby="basic-addon1" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-12">
                            <strong>Update</strong> an existing instance of the resource by ID.
                            <div className="curd">
                                <button className="align-items-center btn btn-primary" onClick={onUpdateClick}>
                                    <i className="fa fa-plus mr-2"></i>
                                    Update
                                </button>
                                <div className="input-group" style={{ maxWidth: 300 }}>
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">ID*</span>
                                    </div>
                                    <input value={updateId} onChange={e => setUpdateId(e.target.value)} type="text" className="form-control m-0" placeholder="" aria-label="Username" aria-describedby="basic-addon1" />
                                </div>
                                <div className="input-group" style={{ maxWidth: 400 }}>
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">Version ID</span>
                                    </div>
                                    <textarea value={updateBody} onChange={e => setUpdateBody(e.target.value)} style={{ height: 38 }} type="text" className="form-control m-0" placeholder="Place resource here" aria-label="Username" aria-describedby="basic-addon1" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-12">
                            <strong>Validate</strong> an instance of the resource to check whether it would be acceptable for creating/updating, without actually storing it on the server.
                            <div className="curd">
                                <button className="align-items-center btn btn-primary" onClick={onValidateClick}>
                                    <i className="fa fa-thumbs-up mr-2"></i>
                                    Validate
                                </button>
                                <div className="input-group" style={{ maxWidth: 800 }}>
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">Contents*</span>
                                    </div>
                                    <textarea value={validateContent} onChange={e => setValidateContent(e.target.value)} style={{ height: 38 }} type="text" className="form-control m-0" placeholder="Place resource body here" aria-label="Username" aria-describedby="basic-addon1" />
                                </div>
                            </div>
                        </div>
                    </div>
                    {isModalOpen && <ReadModal data={readResult} onModalClose={e => setIsModalOpen(false)} />}
                    {isHistoryModalOpen && <HistoryModal data={historyResult} onModalClose={e => setIsHistoryModalOpen(false)} />}
                </div>
                <div className="col-8">
                    <article>


                        {/* <h5 className="modal-title" id="exampleModalLabel">Modal title</h5> */}


                        <div className="modal-body mt-5 overflow-auto">
                            {
                                readResult?.text?.div && <div dangerouslySetInnerHTML={{ __html: readResult?.text?.div }}></div>
                            }{
                                (!(readResult?.text?.div)) && <div>NO DATA FOUND</div>
                            }

                        </div>
                        {/* <div className="modal-footer border-0">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div> */}

                        <div className="modal-body mt-5 overflow-auto">
                            {
                                historyResult && historyResult.entry && historyResult.entry.map((x, i) => <><div dangerouslySetInnerHTML={{ __html: x?.resource?.text?.div }}></div></>)
                            }

                        </div>

                    </article>

                </div>
            </div>
        </>
    );
}
export default Crud;