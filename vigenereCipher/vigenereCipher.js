function encrypt(text, key) {
    let encryptedText = '';

    for (let i = 0, j = 0; i < text.length; i++) {
        let char = text.charCodeAt(i);

        if (char >= 65 && char <= 90) {
            encryptedText += String.fromCharCode((char - 65 + key.charCodeAt(j % key.length) - 65) % 26 + 65);
            j++;
        } else if (char >= 97 && char <= 122) {
            encryptedText += String.fromCharCode((char - 97 + key.charCodeAt(j % key.length) - 97) % 26 + 97);
            j++;
        } else {
            encryptedText += text.charAt(i);
        }
    }

    return encryptedText;
}

function decrypt(encryptedText, key) {
    let decryptedText = '';

    for (let i = 0, j = 0; i < encryptedText.length; i++) {
        let char = encryptedText.charCodeAt(i);

        if (char >= 65 && char <= 90) {
            decryptedText += String.fromCharCode((char - 65 - (key.charCodeAt(j % key.length) - 65) + 26) % 26 + 65);
            j++;
        } else if (char >= 97 && char <= 122) {
            decryptedText += String.fromCharCode((char - 97 - (key.charCodeAt(j % key.length) - 97) + 26) % 26 + 97);
            j++;
        } else {
            decryptedText += encryptedText.charAt(i);
        }
    }

    return decryptedText;
}
// 65-90 верхний регистр, 97-122 нижний регистр

let text = "the optimistic dwarf's coffin is half full";
let key = "capybara";
let encryptedText = encrypt(text, key);
let decryptedText = decrypt(encryptedText, key);
console.log("the".charCodeAt(0));
console.log("capybara".charCodeAt(0));
document.write('Текст: ' + text + '<br>');
document.write('Ключ: ' + key + '<br>');
document.write('Зашифрованный текст: ' + encryptedText + '<br>');
document.write('Расшифрованный текст: ' + decryptedText + '<br>');