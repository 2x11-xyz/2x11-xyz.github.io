const MAX_VALUE = 100;

const sequences = {
    triangular: {
        name: 'Triangular Numbers',
        generate: function() {
            const numbers = [];
            for (let n = 1; ; n++) {
                const triangular = (n * (n + 1)) / 2;
                if (triangular <= MAX_VALUE) {
                    numbers.push(triangular);
                } else {
                    break;
                }
            }
            return numbers;
        }
    },
    square: {
        name: 'Square Numbers',
        generate: function() {
            const numbers = [];
            for (let n = 1; numbers.length < 10; n++) {
                const square = n * n;
                if (square <= MAX_VALUE) numbers.push(square);
                else break;
            }
            return numbers;
        }
    },
    twinPrimes: {
        name: 'Twin Primes',
        generate: function() {
            const isPrime = num => {
                if (num < 2) return false;
                for (let i = 2; i <= Math.sqrt(num); i++) {
                    if (num % i === 0) return false;
                }
                return true;
            };
            
            const pairs = [];
            for (let n = 2; n <= MAX_VALUE - 2; n++) {
                if (isPrime(n) && isPrime(n + 2)) {
                    pairs.push([n, n + 2]);
                }
            }
            return pairs;
        }
    },
    mersenne: {
        name: 'Mersenne Primes',
        generate: function() {
            const isPrime = num => {
                if (num < 2) return false;
                for (let i = 2; i <= Math.sqrt(num); i++) {
                    if (num % i === 0) return false;
                }
                return true;
            };
            
            const numbers = [];
            for (let n = 2; n <= Math.log2(MAX_VALUE + 1); n++) {
                const mersenne = Math.pow(2, n) - 1;
                if (mersenne <= MAX_VALUE && isPrime(mersenne)) {
                    numbers.push(mersenne);
                }
            }
            return numbers;
        }
    },
    sophieGermain: {
        name: 'Sophie Germain Primes',
        generate: function() {
            const isPrime = num => {
                if (num < 2) return false;
                for (let i = 2; i <= Math.sqrt(num); i++) {
                    if (num % i === 0) return false;
                }
                return true;
            };
            
            const numbers = [];
            for (let p = 2; p <= MAX_VALUE; p++) {
                if (isPrime(p) && isPrime(2 * p + 1)) {
                    numbers.push(p);
                }
            }
            return numbers;
        }
    }
};

function generateSequence() {
    const numbers = [];
    for (let i = 1; i <= 100; i++) {
        numbers.push(i);
    }
    return numbers;
}
