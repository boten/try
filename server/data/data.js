/**
 * Created by nadavv on 20/09/2014.
 */

var mongoose = require('mongoose');
var channelnSchema = mongoose.Schema({
    name: String,
    category: String
});
channelnSchema.methods.getChannelName = function(){
    return this.name;
};
var channelList = mongoose.model('channels', channelnSchema);
module.exports = channelList;