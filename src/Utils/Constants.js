const CONSTANTS = {
    "OPTIONS": {
        "ENCODING": [
            {
                value: "json",
                label: "Default"
            },
            {
                value: "XML",
                label: "xml"
            },
            {
                value: "JSON",
                label: "json"
            }
        ],
        "PRETTY": [
            {
                value: true,
                label: "Default"
            },
            {
                value: true,
                label: "On"
            },
            {
                value: false,
                label: "Off"
            }
        ],
        "SUMMARY": [
            {
                value: true,
                label: "Default"
            },
            {
                value: true,
                label: "True"
            },
            {
                value: "text",
                label: "Text"
            },
            {
                value: "data",
                label: "Data"
            },
            {
                value: "count",
                label: "Count"
            }
        ]
    },
    "URL": "http://hapi.fhir.org/baseR4/",
    "DATA_TYPES": {
        "number":"text",        
        "date":"date",
        "string":"text",
        "token":"combo",
        "reference":"text",
        "composite":"trio",
        "context-quantity":"trio-1",
        "uri":"text",
        "near":"",  
        "combo-data-absent-reason": "combo",
        "code": "combo",
        "component-data-absent-reason": "combo",
        "subject": "text",
        "_lastUpdated": "date",
        "value-concept": "combo",
        "value-date": "date",
        "derived-from": "text",
        "focus": "text",
        "part-of": "text",
        "has-member": "text",
        "based-on": "text",
        "patient": "text",
        "specimen": "text",
        "value-string": "text",
        "identifier": "combo",
        "performer": "text",
        "method": "combo",
        "value-quantity": "trio",
        "component-value-quantity": "trio",
        "_security": "combo",
        "data-absent-reason": "combo",
        "combo-value-quantity": "trio",
        "encounter": "text",
        "_filter": "text",
        "_profile": "text",
        "_tag": "combo",
        "_has": "text",
        "_source": "text",
        "_id": "combo",
        "component-value-concept": "combo",
        "_text": "text",
        "_content": "text",
        "category": "combo",
        "device": "text",
        "combo-value-concept": "combo",
        "status": "combo",





    },
    "SORT": [null, "_content", "_filter", "_has", "_id", "_lastUpdated", "_profile", "_security", "_source", "_tag", "_text", "based-on", "category", "code", "combo-code", "combo-data-absent-reason", "combo-value-concept", "combo-value-quantity", "component-code", "component-data-absent-reason", "component-value-concept", "component-value-quantity", "data-absent-reason", "date", "derived-from", "device", "encounter", "focus", "has-member", "identifier", "method", "part-of", "patient", "performer", "specimen", "status", "subject", "value-concept", "value-date", "value-quantity", "value-string"]
}
export default CONSTANTS;