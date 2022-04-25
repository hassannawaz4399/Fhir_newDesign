import ReactJson from "react-json-view";


const ReadModal = function (props) {
    return (
        <>
        <article className="model">
            <div id="exampleModalLive" className="fade .w-100 h-100 modal p-0 show" tabindex="-1" role="dialog" aria-labelledby="exampleModalLiveLabel" aria-modal="true" style={{ paddingRight: "17px", display: "block" }}>
                <div className="h-100 m-0 modal-dialog w-100" role="document" style={{ maxWidth: "unset" }}>
                    <div className="h-50 modal-content w-50">
                        <div className="border-0 modal-header position-absolute w-100">
                            {/* <h5 className="modal-title" id="exampleModalLabel">Modal title</h5> */}
                            <button type="button" onClick={e=>props.onModalClose()} className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                        </div>
                        <div className="modal-body mt-5 overflow-auto">
                            {  
                                props?.data?.text?.div&&<div dangerouslySetInnerHTML={{__html:props?.data?.text?.div}}></div>
                            }{
                                (!(props?.data?.text?.div))&&<div>NO DATA FOUND</div>
                            }
                        
                        </div>
                        {/* <div className="modal-footer border-0">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div> */}
                    </div>
                </div>
            </div>
            </article>
        </>
    )
}
export default ReadModal;