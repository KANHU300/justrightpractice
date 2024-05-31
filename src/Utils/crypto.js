// utils/crypto.js
import CryptoJS from 'crypto-js';
import ApiNames from '../Constants/ApiUrls';

// Function to encrypt sensitive data
const encryptData = (data) => {
    const encryptedData = CryptoJS.AES.encrypt(data, ApiNames.secretKey).toString();
    return encryptedData;
};

const decryptData = (data) => {
    const bytes = CryptoJS.AES.decrypt(data, ApiNames.secretKey);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8)
    return JSON.parse(decryptedData);
};

export default decryptData;
