class Strings {
    static booleanToString(boolean){
        return (boolean) ? "true" : "false";
    }

    static toUSD(string){
        let opts = {style: "decimal", currency: "USD"};
        return string.toLocaleString("en-US", opts) + '$';
    };

    static includesIgnoreCase(stringArray, string){
        for(let i = 0; i < stringArray.length; i++){
            if(stringArray[i].toLowerCase() === string.toLowerCase()){
                return true;
            }
        }

        return false;
    };

    /**
     * @returns {string} formatted as YYYY-MM-DDTHH:MM
     */
    static toDateTimeString(date){
        let year = date.getFullYear().toString(10);
        let month = (date.getMonth()+1).toString(10);
        let day = date.getDate().toString(10);
        let hours = date.getHours().toString(10);
        let minutes = date.getMinutes().toString(10);

        if (month.length === 1) month = "0" + month;
        if (day.length === 1) day = "0" + day;
        if (hours.length === 1) hours = "0" + hours;
        if (minutes.length === 1) minutes = "0" + minutes;

        return `${year}/${month}/${day} - ${hours}:${minutes}`;
    }

    static escapeHTML(string) {
        let htmlEscapes = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#x27;',
            '/': '&#x2F;'
        };

        let htmlEscaper = /[&<>"'\/]/g;

        return ('' + string).replace(htmlEscaper, (match) => htmlEscapes[match]);
    }
}

export default Strings;