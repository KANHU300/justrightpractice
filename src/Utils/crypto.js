
import CryptoJS from 'crypto-js';
import ApiNames from '../Constants/ApiUrls';

// Function to encrypt sensitive data
const encryptData = (data) => {
    const encryptedData = CryptoJS.AES.encrypt(data, ApiNames.secretKey).toString();
    return encryptedData;
};

// Function to decrypt data
const decryptData = (data) => {
    try {
        const bytes = CryptoJS.AES.decrypt(data, ApiNames.secretKey);
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        return JSON.parse(decryptedData);
    } catch (error) {
        console.error('Error decrypting data:', error);
        return null; // Or handle the error appropriately
    }
};
export default decryptData;
// export { encryptData, decryptData };

