module.exports = {
    confirmationMail: 'confirmationMail',
    contractCreated: 'contractCreated',
    includes: (string) => {
        return Object.keys(module.exports)
            .filter(key => key !== 'includes')
            .includes(string);
    }
};