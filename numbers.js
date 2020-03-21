let newNumber = digits => {
    const from = Math.pow(10, digits - 1)
    const to = Math.pow(10, digits)
    return from + Math.floor(Math.random() * (to - from))
}

const arr = x => Array.from(x);
const num = x => Number(x) || 0;
const str = x => String(x);
const isEmpty = xs => xs.length === 0;
const take = n => xs => xs.slice(0, n);
const drop = n => xs => xs.slice(n);
const reverse = xs => xs.slice(0).reverse();
const comp = f => g => x => f(g(x));
const not = x => !x;
const chunk = n => xs =>
    isEmpty(xs) ? [] : [take(n)(xs), ...chunk(n)(drop(n)(xs))];

let numToWordsEN = n => {
    let a = [
        '', 'one', 'two', 'three', 'four',
        'five', 'six', 'seven', 'eight', 'nine',
        'ten', 'eleven', 'twelve', 'thirteen', 'fourteen',
        'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
    ];
    let b = [
        '', '', 'twenty', 'thirty', 'forty',
        'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
    ];
    let g = [
        '', 'thousand', 'million', 'billion', 'trillion', 'quadrillion',
        'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion'
    ];
    // this part is really nasty still
    // it might edit this again later to show how Monoids could fix this up
    let makeGroup = ([ones, tens, huns]) => {
        return [
            num(huns) === 0 ? '' : a[huns] + ' hundred ',
            num(ones) === 0 ? b[tens] : b[tens] && b[tens] + '-' || '',
            a[tens + ones] || a[ones]
        ].join('');
    };
    // "thousands" constructor; no real good names for this, i guess
    let thousand = (group, i) => group === '' ? group : `${group} ${g[i]}`;
    // execute !
    if (typeof n === 'number') return numToWordsEN(String(n));
    if (n === '0') return 'zero';
    return comp(chunk(3))(reverse)(arr(n))
        .map(makeGroup)
        .map(thousand)
        .filter(comp(not)(isEmpty))
        .reverse()
        .join(' ');
};


let numToWordsPL = n => {
    let liczba = n

    const jednosci = ["", " jeden", " dwa", " trzy", " cztery", " pięć", " sześć", " siedem", " osiem", " dziewięć"];
    const nascie = ["", " jedenaście", " dwanaście", " trzynaście", " czternaście", " piętnaście", " szesnaście", " siedemnaście", " osiemnaście", " dziewietnaście"];
    const dziesiatki = ["", " dziesięć", " dwadzieścia", " trzydzieści", " czterdzieści", " pięćdziesiąt", " sześćdziesiąt", " siedemdziesiąt", " osiemdziesiąt", " dziewięćdziesiąt"];
    const setki = ["", " sto", " dwieście", " trzysta", " czterysta", " pięćset", " sześćset", " siedemset", " osiemset", " dziewięćset"];
    let grupy = [
        ["", "", ""],
        [" tysiąc", " tysiące", " tysięcy"],
        [" milion", " miliony", " milionów"],
        [" miliard", " miliardy", " miliardów"],
        [" bilion", " biliony", " bilionów"],
        [" biliard", " biliardy", " biliardów"],
        [" trylion", " tryliony", " trylionów"]];


    let wynik = '';
    let znak = '';
    if (liczba == 0)
        wynik = "zero";
    if (liczba < 0) {
        znak = "minus";
        liczba = -liczba;
    }

    let g = 0;
    while (liczba > 0) {
        let s = Math.floor((liczba % 1000) / 100);
        let n = 0;
        let d = Math.floor((liczba % 100) / 10);
        let j = Math.floor(liczba % 10);

        if (d == 1 && j > 0) {
            n = j;
            d = 0;
            j = 0;
        }

        let k = 2;
        if (j == 1 && s + d + n == 0)
            k = 0;
        if (j == 2 || j == 3 || j == 4)
            k = 1;
        if (s + d + n + j > 0)
            wynik = setki[s] + dziesiatki[d] + nascie[n] + jednosci[j] + grupy[g][k] + wynik;

        g++;
        liczba = Math.floor(liczba / 1000);
    }
    return wynik;
}

let numToWords = (lang, n) => {
    if (lang == 'pl') return numToWordsPL(n)
    return numToWordsEN(n);
}