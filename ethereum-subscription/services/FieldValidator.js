const validation = require("./validation");
const {strings, objects} = require("./datatypes");
const {bindAllMethods} = require("./utils");

class FieldValidator {
    constructor(fields){
        this.fields = fields;
        this.errors = {};

        bindAllMethods(this, FieldValidator);
    }

    validateFields(){
        this.errors = {};

        Object.keys(this.fields).forEach(fieldKey => {
            const error = validation.getFieldError(fieldKey, this.fields[fieldKey]);

            if(strings.isDefined(error)){
                this.errors[fieldKey] = error;
            }
        });

        return this;
    }

    getErrors(options = {strings: false}){
        return (options.strings) ? objects.values(this.errors) : this.errors;
    }
}

module.exports = FieldValidator;