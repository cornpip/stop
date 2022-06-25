import crypto from "crypto"

let make_sig = (timestamp)=>{
    var serviceId = process.env.SERVICE_ID;

	var space = " ";				// one space
	var newLine = "\n";				// new line
	var method = "POST";				// method
    var url = `/sms/v2/services/${serviceId}/messages` // url (include query string)
	// var timestamp = `${Date.now()}`;			// current timestamp (epoch)
	var accessKey = `${process.env.ACCESS_KEY}`;			// access key id (from portal or Sub Account)
	var secretKey = `${process.env.ACCESS_SECRET_KEY}`;			// secret key (from portal or Sub Account)

	if (!serviceId){
		throw Error("dotenv not working")
	}

    var hmac = crypto.createHmac('sha256', secretKey);
	hmac.update(method);
	hmac.update(space);
	hmac.update(url);
	hmac.update(newLine);
	hmac.update(timestamp);
	hmac.update(newLine);
	hmac.update(accessKey);

    // hmac.end();
    // var hash = hmac.read();
    // console.log(hash.toString('base64'))
    return hmac.digest('base64')
}

export { make_sig }