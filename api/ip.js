module.exports = (req, res) => {
  const ip = req.headers["x-real-ip"] || req.connection.remoteAddress;
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Calculator</title>
        <style>
          body {
            background: url('../img/skull.gif') repeat;
          }

          #overlay {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
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
          <br>
          If you actually want a calcualtor, click <a href="Calculator:///"">here</a>.
        </div>
      </body>
    </html>
  `;

  res.setHeader("Content-Type", "text/html");
  res.status(200).send(html);
};
