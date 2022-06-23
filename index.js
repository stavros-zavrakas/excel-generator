const fs = require('fs');
const excel = require('excel4node');

const getFileList = require('./get-file-list');

logic();

async function logic() {
  const csvFiles = await getFileList();
  console.log('csvFiles', csvFiles);

  // Create a new instance of a Workbook class
  const workbook = new excel.Workbook();

  //Some logic
  function generateExcelSheet(array, worksheet){
    const rowArray = array.split('\r\n').filter(row => !!row);
    rowArray.forEach((row, i) => {
      if (row) {
        const colsArray = row.split(';');
        colsArray.forEach((col, j) => {
          if(col) {
            console.log('i-j', { i, j, col});
            worksheet.cell(i + 1, j + 1).string(col);
          }
        });  
      }
    });
  }

  csvFiles.forEach(csvFile => {
    const firstCsv = csvFile;

    const tabName = Object.keys(firstCsv)[0];
  
    // Add Worksheets to the workbook
    const worksheet = workbook.addWorksheet(tabName);
  
    generateExcelSheet(firstCsv[tabName], worksheet);  
  });

  workbook.write('Excel.xlsx');
}
