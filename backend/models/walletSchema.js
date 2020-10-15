
const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
     
    },
    {
        collection: 'walletDetails',
        unique: 'true'
    });
    

module.exports = mongoose.model('Wallet',walletSchema);