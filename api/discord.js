module.exports = (req, res) => {
  const userAgent = req.headers["user-agent"];
  const isDiscordBot = userAgent.includes("Discordbot");

  if (isDiscordBot) {
    res.redirect("/img/middleclickforcalc.png");
  } else {
    res.redirect("/api/ip");
  }
};
