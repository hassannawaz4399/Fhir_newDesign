
import ReactJson from "react-json-view";
const RenderHTML = (props) => (<div dangerouslySetInnerHTML={{__html:props.HTML}}>{props.HTML}</div>)
const HistoryModal = function (props) {
    return (
        <>
            <div id="exampleModalLive" className="fade h-100 modal p-0 show" tabindex="-1" role="dialog" aria-labelledby="exampleModalLiveLabel" aria-modal="true" style={{ paddingRight: "17px", display: "block" }}>
                <div className="h-100 m-0 modal-dialog w-100" role="document" style={{ maxWidth: "unset" }}>
                    <div className="h-100 modal-content w-100">
                        <div className="border-0 modal-header position-absolute w-100">
                            {/* <h5 className="modal-title" id="exampleModalLabel">Modal title</h5> */}
                            <button type="button" onClick={e=>props.onModalClose()} className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                        </div>
                        <div className="modal-body mt-5 overflow-auto">
                          {
                             props&& props.data.entry&&props.data.entry.map((x,i)=><><div dangerouslySetInnerHTML={{__html:x?.resource?.text?.div}}></div></>)
                          }
                        
                        </div>
                        {/* <div className="modal-footer border-0">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}
export default HistoryModal;