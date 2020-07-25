export default (req, res, next) => {
  // Log only if this isn't an assset or bundle request.
  if (req && !req.path.includes('/public') && !req.path.includes('/favicon')) {
    const remoteAddress = (req.connection && req.connection.remoteAddress) || 'unknown';
    const time = new Date().toLocaleTimeString('us');
    const userAgent = req.get('user-agent') || 'unknown';
    const referrer = req.get('referrer') || req.get('referer') || 'unknown';
    console.log(`
      ****** Request Info ******
      IP Address: ${remoteAddress}
      Time:       ${time}
      UserAgent:  ${userAgent}
      Path:       ${req.path}
      Referrer:   ${referrer}
    `);
  }

  next();
};
