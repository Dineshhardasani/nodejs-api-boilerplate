/**
 * User controller
 */

export async function converter(req, res, next) {
  let unirest, from, to, value, ans, key;
  unirest = require('unirest');
  from = req.query.from;
  to = req.query.to;
  value = req.query.value;
  try {
    let apireq = unirest(
      'GET',
      'https://free.currconv.com/api/v7/convert?q=' +
        from +
        '_' +
        to +
        '&compact=' +
        process.env.CONVERTER_API_KEY,
    );

    apireq.end(function(apires) {
      if (apires.error) throw new Error(res.error);
      for (key in apires.body) {
        ans = parseFloat(value) * parseFloat(apires.body[key]);
      }
      return res.json({ result: ans });
    });
  } catch (e) {
    return next(e);
  }
}
