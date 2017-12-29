export default function renderHtml(req, res, next) {
  const supportsManifest = req.userAgentClassifiction === 'chrome';
  const { resources } = req;

  res.writeHead(200, {
    Connection: 'Transfer-Encoding',
    'Content-Type': 'text/html; charset=utf-8',
    'Transfer-Encoding': 'chunked',
    'Strict-Transport-Security': 'max-age=31557600; includeSubDomains; preload',
    'Timing-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
  });

  const html = `
    <!doctype html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=5" />
        <meta name="description" content="">
        <meta name="author" content="">
        <link rel="shortcut icon" href="/favicon.ico">
        <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css">
        <link rel="stylesheet" href="/css/font-awesome.min.css">
        <link rel="stylesheet" href="/css/index.css">
        ${supportsManifest ? '<meta name="theme-color" content="#0077B5" />' : ''}
        ${supportsManifest ? '<link rel="manifest" href="/manifest.json" />' : ''}
        ${resources.inline !== null ? `<style>${resources.inline}</style>` : ''}
        ${resources.css !== null ? `<link rel="stylesheet" href="${resources.css}" />` : ''}
        <title>Movee</title>
    </head>
    <body>
        <div id="root"></div>
        <script src='${resources.js}' async defer></script>
    </body>
    </html>
  `;

  res.write(html);

  res.end();

  next();
}
