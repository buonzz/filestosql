const path = require('path');
const known_file_types = require('./known_file_types');
const fs = require("fs");

function analyze_pathinfo(filepath){

	let dirname = path.dirname(filepath);
	let path_tags = dirname.split(path.sep);
	let filename = path.basename(filepath);
	let extension = path.extname(filepath).toLowerCase();
	let file_type = get_file_type(extension);

	return {
		dirname,
		path_tags,
		filename,
		extension,
		filepath,
		file_type
	};
}


function get_file_type(extension){
	if(known_file_types.VIDEO.includes(extension))
		return 'video';
	else if(known_file_types.IMAGE.includes(extension))	
		return 'image';
	else
		return 'unknown';
}

module.exports = analyze_pathinfo;
