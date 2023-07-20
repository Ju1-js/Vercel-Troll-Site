module.exports = (req, res) => {
  const ip = req.headers["x-real-ip"] || req.connection.remoteAddress;
  const html = fs.readFileSync(
    path.join(__dirname, "..", "html", "ip.html"),
    "utf8"
  );
  res.setHeader("Content-Type", "text/html");
  res.status(200).send(html);
};
