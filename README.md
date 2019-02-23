# Files to SQL

A ClI (command line interface) tool to get a listing of all files inside a folder (and its subfolders) and generate a SQL file so you can easily analyze it using standard SQL queries.


### Usage


Install it
```
npm install -g filestosql
```

run it

```
filestosql --folder=/path/to/folder/to/crawl --output=path/to/sql/file.sql
```

after it had run, you can now load the sql file to your database

```
mysql -u user -p  dbname -h localhost < path/to/sql/file.sql
```

make sure you the following scheme in your mysql database

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