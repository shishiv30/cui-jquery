var ghpages = require('gh-pages');
var path = require('path');
console.log('Publishing!!!!');
ghpages.publish(path.join(__dirname, 'public'), {
    branch: 'gh-pages'
}, (err) => {
    /*eslint no-console: ["error", { allow: ["log"] }] */
    if (err) console.log(err);
    else console.log('Successfully Published!!!!');
});
