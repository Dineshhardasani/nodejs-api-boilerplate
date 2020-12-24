/**
 * User controller
 */

 const https=require("https");

 function get(url, callback) {
    "use-strict";
    https.get(url, function (result) {
        var dataQueue = "";
        result.on("data", function (dataBuffer) {
            dataQueue += dataBuffer;
        });
        result.on("end", function () {
            callback(dataQueue);
        });
    });
}

export async function converter(req, res, next) {
  let from, to, value, ans, key;
  from = req.query.from;
  to = req.query.to;
  value = req.query.value;
  try {
     var url='https://free.currconv.com/api/v7/convert?q=' +
        from +
        '_' +
        to +
        '&compact=' +
        process.env.CONVERTER_API_KEY;


    const promise = new Promise((resolve, reject) => {
        get(url, function (data) {
            // do something with data
            data=JSON.parse(data);
            for (key in data) {
              ans = parseFloat(value) * parseFloat(data[key]);
            }
            resolve(ans);
        })
    })
    promise.then(ans => {
      return res.status(200).json({ result:ans });
    }).catch(err => {
    	console.log(err)
    })
  } catch (e) {
    return next(e);
  }
}
