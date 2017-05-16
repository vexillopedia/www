const redirectToHTTPS = ({ ignore = [] } = {}) => {
  return (req, res, next) => {
    if (req.protocol === "https" || ignore.includes(req.get("host"))) {
      next()
    } else {
      return res.redirect("https://" + req.get("host") + req.url)
    }
  }
}

module.exports = redirectToHTTPS
