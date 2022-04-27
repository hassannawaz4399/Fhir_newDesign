import React, { useState } from "react";
import Select from "react-select";
import CONSTANTS from "../../Utils/Constants";
import "../../App.css"
function SearchComponent(props) {
  const [encodingList, setEncodingList] = React.useState([]);
  const [encoding, setEncoding] = React.useState({});
  const [prettyList, setPrettyList] = React.useState([]);
  const [pretty, setPretty] = React.useState({});
  const [summaryList, setSummaryList] = React.useState([]);
  const [summary, setSummary] = React.useState({});
  React.useEffect(() => {
    setEncodingList([...CONSTANTS.OPTIONS.ENCODING]);
    setEncoding({ ...CONSTANTS.OPTIONS.ENCODING.filter(x => x.label == "Default")[0] })
    setPrettyList([...CONSTANTS.OPTIONS.PRETTY]);
    setPretty({ ...CONSTANTS.OPTIONS.PRETTY.filter(x => x.label == "Default")[0] });
    setSummaryList([...CONSTANTS.OPTIONS.SUMMARY]);
    setSummary({ ...CONSTANTS.OPTIONS.SUMMARY.filter(x => x.label == "Default")[0] });

  }, []);




  const onOptionChange = e => {
    props.onOptionChange(
      `&_format=${encoding.value}&_pretty=${pretty.value}&_summary=${summary.value}`
    )
  }
  return (
    <>
      <div className="row mt-3">
        <div className="col-lg-12 col-sm-12">
          {/* <label>Resources</label> */}
          <Select
            className="basic-single"
            classNamePrefix="select"
            placeholder={"Select Resources"}
            // defaultValue={props.defaultResource}
            label="test"
            onChange={(e) => { props.onChange(e.value) }}
            name="color"
            options={props.resources.map(x => { return { value: x.type, label: x.type + " (" + x.extension[0].valueDecimal + ")" } })}
          />

        </div>

        {
          props.hideOption === true ? <></> :
            <div className="col-lg-12 col-sm-12 ">
              <div className="row">
                <div className="col-12 mt-3">
                  {/* <label> Encoding </label> */}
                  <Select
                    className="basic-single"
                    options={encodingList}
                    placeholder="Select Encoding"

                    // value={encoding}
                    onChange={e => { setEncoding(e); onOptionChange(); }}
                  />
                </div>
                <div className="col-12 mt-3">
                  {/* <label> Pretty </label> */}
                  <Select
                    className="basic-single"
                    options={prettyList}
                    placeholder="Select Pretty"
                    // value={pretty}
                    onChange={e => { setPretty(e); onOptionChange(); }}
                  />
                </div>
                <div className="col-12 mt-3">
                  {/* <label> Summary </label> */}
                  <Select
                    className="basic-single"
                    options={summaryList}
                    placeholder="Select Summary"
                    // value={summary}
                    onChange={e => { setSummary(e); onOptionChange(); }}
                  />
                </div>
              </div>
            </div>
        }

      </div>
    </>
  );
}
export default SearchComponent;