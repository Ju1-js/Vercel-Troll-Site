module.exports = (req, res) => {
  const ip = req.headers["x-real-ip"] || req.connection.remoteAddress;
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Funny Site</title>
        <style>
          body {
            background: url('https://media.tenor.com/g1bZgt4-tL4AAAAC/skull.gif') repeat;
          }

          #overlay {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: black;
            color: white;
            padding: 20px;
            font-size: 20px;
          }
        </style>
      </head>
      <body>
        <div id="overlay">
          Calculated your IP: ${ip} <br>
          (Didn't log your IP if you're concerned about that)
        </div>
      </body>
    </html>
  `;

  res.setHeader("Content-Type", "text/html");
  res.status(200).send(html);
};
