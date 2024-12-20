const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Run index.html in ./dist

app.use(express.static('dist'));
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})