import express from 'express';

const app = express();

app.use(express.static('public'));

app.get('*', (req, res) => {
  const html = `
    <!doctype html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="">
        <meta name="author" content="">
        <link rel="shortcut icon" href="/favicon.ico">
        <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css">
        <link rel="stylesheet" href="/css/font-awesome.min.css">
        <link rel="stylesheet" href="/css/index.css">
        <title>Movee</title>
    </head>
    <body>
        <div id="root"></div>
        <script type="text/javascript" src="/bundle.js"></script>
    </body>
    </html>
  `;

  res.send(html);
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
