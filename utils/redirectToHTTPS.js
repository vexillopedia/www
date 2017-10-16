const redirectToHTTPS = ({ ignore = [] } = {}) => {
  return (req, res, next) => {
    if (
      req.protocol === 'https' ||
      req.headers['x-forwarded-proto'] === 'https' ||
      ignore.includes(req.get('host'))
    ) {
      return next();
    } else {
      return res.redirect('https://' + req.get('host') + req.url);
    }
  };
};

module.exports = redirectToHTTPS;
