var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
var TimesSchema = new Schema({
	nome: {type:String, requied:true, trim: true}
});

module.exports = mongoose.model('Times', TimesSchema);