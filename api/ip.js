import { promises as fs } from "fs";
module.exports = async (req, res) => {
  const ip = req.headers["x-real-ip"] || req.connection.remoteAddress;
  try {
    const html = await fs.readFile(
      path.join(process.cwd(), "html", "ip.html"),
      "utf8"
    );
    res.setHeader("Content-Type", "text/html");
    res.status(200).send(html);
  } catch (e) {
    console.error("Error reading file:", e);
    res.status(500).send("Internal Server Error");
  }
};
