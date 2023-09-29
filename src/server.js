/**
 * Here we set up our express application and listen to Port:5000.
 * Additionally, our `view` engine will be set to `.ejs` this is
 * simply to render the `index.ejs` file and show the data acquired.
 */
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.set('view engine', 'ejs');
const PORT = 5000;

const authRouter = require('./routes/auth_router');
const loginRoutes = require('./routes/authorization_routes');


app.use(cookieParser());
app.use('/auth', loginRoutes);
app.use('/', authRouter);



app.listen(PORT, () => { console.log(`Listening to on Port ${PORT}`) });


