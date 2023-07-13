module.exports = (req, res) => {
  const userAgent = req.headers["user-agent"];

  const isDiscordBot =
    userAgent.includes("Discordbot") ||
    userAgent.includes(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 11.6; rv:92.0) Gecko/20100101 Firefox/92.0"
    );

  if (isDiscordBot) {
    res.redirect("img/middleclickforcalc.png");
  } else {
    res.redirect("/api/ip");
  }
};
