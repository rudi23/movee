import express from 'express';
import classifyBrowser from './server/plugins/classifyBrowser';
import setRequestResources from './server/plugins/setRequestResources';
import renderHtml from './server/plugins/renderHtml';
import webpackResources from './server/resources';

const consoleLogger = console;
const app = express();
const publicPath = process.env.NODE_ENV === 'development' ? 'public' : 'dist/client';

app.use(express.static(publicPath));
app.use(classifyBrowser);
app.use(setRequestResources(webpackResources(consoleLogger)));

app.get('*', renderHtml);

app.listen(3000, () => {
  consoleLogger.info('Start listening on port 3000');
});
