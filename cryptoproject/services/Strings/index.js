class Strings {
    static booleanToString(boolean){
        return (boolean) ? "true" : "false";
    }

    static isDefined(string){
        return string !== undefined && string !== null && string !== '';
    }

    static toUSD(string){
        let opts = {style: "decimal", currency: "USD"};
        return '$' + string.toLocaleString("en-US", opts);
    };

    static commaSeparate(string){
        let opts = {style: "decimal", currency: "USD"};
        return string.toLocaleString("en-US", opts);
    }

    static includesIgnoreCase(stringArray, string){
        for(let i = 0; i < stringArray.length; i++){
            if(stringArray[i].toLowerCase() === string.toLowerCase()){
                return true;
            }
        }

        return false;
    };

    static toDateString(date){
        let year = date.getFullYear().toString(10);
        let month = (date.getMonth()+1).toString(10);
        let day = date.getDate().toString(10);

        if (month.length === 1) month = "0" + month;
        if (day.length === 1) day = "0" + day;

        return `${year}/${month}/${day}`;
    }

    /**
     * @returns {string} formatted as YYYY-MM-DDTHH:MM
     */
    static toDateTimeString(date){
        let hours = date.getHours().toString(10);
        let minutes = date.getMinutes().toString(10);

        if (hours.length === 1) hours = "0" + hours;
        if (minutes.length === 1) minutes = "0" + minutes;

        return `${Strings.toDateString(date)} - ${hours}:${minutes}`;
    }
}

export default Strings;