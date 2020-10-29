//NAME: KAVYU THABITHA REG NO: P15/81759/2017

const crypto = require("crypto")

// The `generateKeyPairSync` method accepts two arguments:
// 1. The type ok keys- in this case : "rsa"
// 2. An object with the properties of the key
const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
	
	modulusLength: 2048, //// The standard secure default length for RSA keys is 2048 bits
})



const data = "RSA Algorithm" //  This is the data to encrypted

const encryptedData = crypto.publicEncrypt(
	{
		key: publicKey,
		padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
		oaepHash: "sha256",
	},
	
	Buffer.from(data) //  converts the data string to a buffer using `Buffer.from`
)


console.log("encypted data: ", encryptedData.toString("base64")) //prints the encrypted data in base64 format 
const decryptedData = crypto.privateDecrypt(
	{
		key: privateKey,
		// In order to decrypt the data, 
		// same hashing function and padding scheme used to
		// encrypt the data in the previous step needs to be specified
		padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
		oaepHash: "sha256",
	},
	encryptedData
)


console.log("decrypted data: ", decryptedData.toString()) 