const fs = require('fs');
const path = require('path');

module.exports = (on, config) => {
  on('task', {
    getSchema() {
      return fs.readFileSync(
        path.resolve(__dirname, '../../test-schema.graphql'),
        'utf8'
      );
    },
  });
};
