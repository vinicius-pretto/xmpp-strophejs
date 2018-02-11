const app = require('./server/app');
const { port } = require('./server/config');

app.listen(port, () => {
  console.log(`Server is listening at port: ${port}`);
});