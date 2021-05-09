const fs = require('fs');

const sourceFile = process.argv[process.argv.length - 2];
const destFile = process.argv[process.argv.length - 1];

const source = fs.readFileSync(sourceFile, 'utf-8');
const rows = source.split('\n');
for (let i = 0; i < rows.length; i++) {
  let row = rows[i];
  if (row.startsWith('CREATE TABLE') && row.includes('REFERENCES')) {
    const matches = row.match(/, `(\w+)` UUID REFERENCES `(\w+)` \(`uuid`\)/g)
    const additions = [];
    matches.forEach((match) => {
      const replace = `${match.substr(0, match.indexOf('UUID') - 1)} CHAR(36) BINARY`;
      row = row.replace(match, replace);
      const addition = `, FOREIGN KEY (${match.substr(2, match.indexOf('UUID') - 3)}) ${match.substr(match.indexOf('UUID') + 5)} ON DELETE SET NULL ON UPDATE CASCADE`
      additions.push(addition);
    });
    row = row.replace(/ ON DELETE SET NULL ON UPDATE CASCADE/g, '');
    row = row.replace(');', `${additions.join('')});`);
    rows[i] = row;
  }
}
fs.writeFileSync(destFile, rows.join('\n'), { encoding: 'utf-8'});
