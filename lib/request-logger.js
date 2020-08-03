export default (req, res, next) => {
  // Log only if this isn't an assset or bundle request.
  if (req && !req.path.includes('/public') && !req.path.includes('/favicon')) {
    const date = new Date();
    const remoteAddress = (req.connection && req.connection.remoteAddress) || 'unknown';
    const time = date.toLocaleTimeString('us', 'az');
    const dateString = date.toLocaleDateString('us', 'az');
    const userAgent = req.get('user-agent') || 'unknown';
    const referrer = req.get('referrer') || req.get('referer') || 'unknown';
    console.log(`
      ****** Request Info ******
      IP Address: ${remoteAddress}
      Date:       ${dateString}
      Time:       ${time}
      UserAgent:  ${userAgent}
      Path:       ${req.path}
      Referrer:   ${referrer}
    `);
  }

  next();
};
