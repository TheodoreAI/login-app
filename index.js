
const express = require('express');
const path = require('path');
require('dotenv').config();
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('public'));

// @TODO add auth middleware
// @TODO add registration page
app.use(
    require('express-session')({
      secret: process.env.APP_SECRET,
      resave: true,
      saveUninitialized: false
    })
  );
  
  const { ExpressOIDC } = require('@okta/oidc-middleware');
  console.log(`${process.env.OKTA_ORG_URL}/oauth2/default`);
  const oidc = new ExpressOIDC({
    
    appBaseUrl: process.env.HOST_URL,
    issuer: `${process.env.OKTA_ORG_URL}/oauth2/default`,
    client_id: process.env.OKTA_CLIENT_ID,
    client_secret: process.env.OKTA_CLIENT_SECRET,
    redirect_uri: `${process.env.HOST_URL}/callback`,
    scope: 'openid profile',
    routes: {
      loginCallback: {
        path: '/callback'
      },
    }
  });
  
  app.use(oidc.router);

app.use('/', require('./routes/index'));
app.use('/register', require('./routes/register'));

const PORT = process.env.PORT || 3000;
const localhost = "127.0.0.1";
app.listen(PORT, () => console.log(`Web App running at http://${localhost}:${PORT}/ Press Ctrl-C to terminate`));