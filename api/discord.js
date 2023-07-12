module.exports = (req, res) => {
  const userAgent = req.headers["user-agent"];
  const isDiscordBot = userAgent.includes("Discordbot");

  if (isDiscordBot) {
    res.redirect(
      "https://cdn.discordapp.com/attachments/713805757531029524/1128800620044894248/middleclickforcalc.png"
    );
  } else {
    res.redirect("/api/ip");
  }
};
