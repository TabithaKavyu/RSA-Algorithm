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

// Digital Signatures

const verifiableData = "RSA Algorithm"; //creates data to sign

// The signature method takes the data  to  be signed, the
// hashing algorithm, and the padding scheme, and generates
// a signature in the form of bytes
const signature = crypto.sign("sha256", Buffer.from(verifiableData), {
	key: privateKey,
	padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
})

console.log(signature.toString("base64"))

const isVerified = crypto.verify(
	"sha256",
	Buffer.from(verifiableData),
	{
		key: publicKey,
		padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
	},
	signature
)


console.log("signature verified: ", isVerified)  //isVerified returns `true` if the signature is valid