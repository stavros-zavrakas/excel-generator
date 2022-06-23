const path = require('path');
const fs = require('fs');

const directoryPath = path.join(__dirname, 'spreadsheets');

module.exports = () => {
  return new Promise((resolve, reject) => {
    //passsing directoryPath and callback function
    fs.readdir(directoryPath, function (err, files) {
      if (err) {
        console.log('Unable to scan directory: ' + err);

        return reject(err);
      } 

      const excel_files = files
        .filter(file => file.includes('.csv'))
        .map(file => {
          return {
            [file]: fs.readFileSync(path.join(directoryPath, file), 'utf8')
          }
        });

      return resolve(excel_files);
    });
  });
}