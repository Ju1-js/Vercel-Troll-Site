const fs = require("fs").promises;
const path = require("path");
module.exports = async (req, res) => {
  try {
    const ip = req.headers["x-real-ip"] || req.connection.remoteAddress;
    const html = await fs
      .readFile(path.join(process.cwd(), "html", "ip.html"), "utf8")
      .replace("${ip}", ip);
    res.setHeader("Content-Type", "text/html");
    res.status(200).send(html);
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal Server Error");
  }
};
