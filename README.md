# Files to SQL

A ClI (command line interface) tool to get a listing of all files inside a folder (and its subfolders) and generate a SQL file so you can easily analyze it using standard SQL queries.


### Usage

Go to the folder which you want to generate the sql and then execute:
```
npx filestosql
```
it will then generate a <current folder>.sql in the current directory.
    
You can also specify the target folder and output file via command line arguments

```
npx filestosql --folder=/path/to/folder/to/crawl --output=path/to/sql/file.sql
```
   
You can also install it globally if you need to use it repetitively
```
npm install -g filestosql
```


### Using the generated SQL file

the entire purpose of the sql file is so that you can load that into your MySQL database. You can then query the database for your reporting needs.

for example:
```
mysql -u user -p  dbname -h localhost < path/to/sql/file.sql
```

make sure you have the following schema in your mysql database

```
CREATE TABLE IF NOT EXISTS files (
    id INT AUTO_INCREMENT,
    filename VARCHAR(255) NOT NULL,
    filepath VARCHAR(500) NOT NULL,
    dirname VARCHAR(255) NOT NULL,
    extension VARCHAR(255) NOT NULL,
    content_hash VARCHAR(255) DEFAULT NULL,
    content_size VARCHAR(255) DEFAULT NULL,
    file_type VARCHAR(50) DEFAULT NULL,
    tags TEXT DEFAULT NULL,
    last_indexed BIGINT DEFAULT NULL,
    UNIQUE KEY unique_filepath (filepath),
    PRIMARY KEY (id)
)  ENGINE=INNODB;
```
