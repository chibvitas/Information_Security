function isPrime(num) {
    for (let i = 2, sqrt = Math.sqrt(num); i <= sqrt; i++)
        if (num % i === 0) return false;
    return num > 1;
}

// Генерация случайного простого числа
function randomPrime(bits) {
    bits = Math.floor(bits);
    const potentialPrimes = Array.from({ length: bits - 3 }, (_, i) => 2 + i);
    return potentialPrimes.filter(isPrime)[Math.floor(Math.random() * potentialPrimes.filter(isPrime).length)];
}

function gcd(a, b) {
    while (b !== 0) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

function modInverse(a, m) {
    a = (a % m + m) % m;
    for (let x = 1; x < m; x++) {
        if ((a * x) % m === 1) {
            return x;
        }
    }
    return 1;
}

// Генерация ключей RSA
function generateRSAKeys(bits) {
    const p = randomPrime(bits);
    const q = randomPrime(bits);

    const n = p * q;
    const phi = (p - 1) * (q - 1);

    let e = 2;
    while (gcd(e, phi) !== 1) {
        e++;
    }

    const d = modInverse(e, phi);

    return {
        publicKey: { n, e },
        privateKey: { n, d }
    };
}

function modPow(a, b, m) {
    let result = 1n;
    a = a % m;
    while (b > 0) {
        if (b % 2n === 1n) {
            result = (result * a) % m;
        }
        a = (a * a) % m;
        b = b / 2n;
    }
    return result;
}

// Шифрование сообщения с использованием открытого ключа
function encrypt(message, publicKey) {
    const { n, e } = publicKey;
    const encryptedMessage = message.split('').map(char => {
        const charCode = char.charCodeAt(0);
        return modPow(BigInt(charCode), BigInt(e), BigInt(n));
    });
    return encryptedMessage;
}

// Дешифрование сообщения с использованием закрытого ключа
function decrypt(encryptedMessage, privateKey) {
    const { n, d } = privateKey;
    const decryptedMessage = encryptedMessage.map(charCode => {
        const decryptedCharCode = Number(modPow(charCode, BigInt(d), BigInt(n)));
        return String.fromCharCode(decryptedCharCode);
    });
    return decryptedMessage.join('');
}

const bits = 1000;
const keys = generateRSAKeys(bits);
const publicKey = keys.publicKey;
const privateKey = keys.privateKey;

const message = "Barsik lezhit na trube";
const encryptedMessage = encrypt(message, publicKey);
const decryptedMessage = decrypt(encryptedMessage, privateKey);

document.write("Исходный текст: " + message + "<br>");
document.write("Зашифрованный текст: " + encryptedMessage + "<br>");
document.write("Расшифрованный текст: " + decryptedMessage + "<br>");