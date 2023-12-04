const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));

//python -m http.server 8080
app.listen(3000, () => {
   console.log('Server is running on port 3000');
});