import {Parser} from 'json2csv';

class Files {
    static objectArrayToCsv(objectArray, fieldsToExclude = [], options = {}){
        if(objectArray.length === 0){
            return "";
        }

        let fieldsToInclude = Object.keys(objectArray[0]).filter(key =>
            !fieldsToExclude.includes(key)
        );
        let opts = Object.assign({}, options, {fields: fieldsToInclude});
        let parser = new Parser(opts);

        return parser.parse(objectArray);
    }

    static downloadCsv(content, name){
        Files.download(
            content,
            `${name}.csv`,
            'text/csv;encoding:utf-8'
        );
    }

    static download(content, fileName, mimeType){
        let a = document.createElement('a');

        mimeType = mimeType || 'application/octet-stream';

        if (navigator.msSaveBlob) {
            navigator.msSaveBlob(new Blob([content], {
                type: mimeType
            }), fileName);
        } else if (URL && 'download' in a) {
            a.href = URL.createObjectURL(new Blob([content], {
                type: mimeType
            }));
            a.setAttribute('download', fileName);
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } else {
            location.href = 'data:application/octet-stream,' + encodeURIComponent(content);
        }
    };
}

export default Files;