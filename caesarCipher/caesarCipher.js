function encrypt(text, shift) {
    let result = '';
    for (let i = 0; i < text.length; i++) {
        let char = text.charCodeAt(i);
        if (char >= 65 && char <= 90) {
            result += String.fromCharCode((char - 65 + shift) % 26 + 65);
        } else if (char >= 97 && char <= 122) {
            result += String.fromCharCode((char - 97 + shift) % 26 + 97);
        } else {
            result += text.charAt(i);
        }
    }
    return result;
}

function decrypt(text, shift) {
    let result = '';
    for (let i = 0; i < text.length; i++) {
        let char = text.charCodeAt(i);
        if (char >= 65 && char <= 90) {
            result += String.fromCharCode((char - 65 - shift + 26) % 26 + 65);
        } else if (char >= 97 && char <= 122) {
            result += String.fromCharCode((char - 97 - shift + 26) % 26 + 97);
        } else {
            result += text.charAt(i);
        }
    }
    return result;
}
// 65-90 верхний регистр, 97-122 нижний регистр


document.write

let encryptedText = encrypt('I am a capybara', 3);
document.write("Зашифрованный текст:<br>");
document.write(encryptedText + '<br>');

document.write("Варианты расшифровки текста:<br>");
for(let i = 0; i < 26; i++){
    let decryptedText = decrypt(encryptedText, i);
    document.write(decryptedText + '<br>');
}