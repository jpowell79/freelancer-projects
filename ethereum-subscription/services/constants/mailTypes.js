module.exports = {
    confirmationMail: 'confirmationMail',
    contractCreated: 'contractCreated',
    massMailSuppliers: 'massMailSuppliers',
    requestContract: 'requestContract',
    includes: (string) => {
        return Object.keys(module.exports)
            .filter(key => key !== 'includes')
            .includes(string);
    }
};