- `npm i`
- copy all your csv files in the spreadsheets/ directory
- `node index.js`
- you should have the generated.xlsx file

- convert all csv files with spaces to underscores:
```
  for f in *\ *; do mv "$f" "${f// /_}"; done
```