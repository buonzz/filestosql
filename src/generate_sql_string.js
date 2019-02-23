const SqlString = require('sqlstring');
const os = require("os");

function generate_sql_string(pathinfo){

  let tags = pathinfo.path_tags.join(",");

  let sql = "INSERT INTO files (filename, filepath, dirname, extension, file_type, tags, content_size, last_indexed)";
  	  sql += "VALUES (" + SqlString.escape(pathinfo.filename) + ",";
  	  sql +=  SqlString.escape(pathinfo.filepath)  +  ",";
  	  sql +=  SqlString.escape(pathinfo.dirname)  +  ",";
  	  sql +=  SqlString.escape(pathinfo.extension)  +  ",";
  	  sql +=  SqlString.escape(pathinfo.file_type)  +  ",";
  	  sql +=  SqlString.escape(tags)  +  ",";
  	  sql +=  SqlString.escape(pathinfo.content_size)  +  ",";
  	  sql +=  new Date().getTime()  +  ");" + os.EOL;

  	  return sql;
}

module.exports = generate_sql_string;
