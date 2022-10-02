const fs = require('fs');

const storeData = (filePath, data) => {
    fs.writeFile(filePath, JSON.stringify(data), (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('data updated!');
        }
    });
}

module.exports = { storeData };