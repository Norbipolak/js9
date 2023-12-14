const d = new Date();
console.log(d);
/*
Date-objektum a jelenlegi dátumot mutatja az operációs rendszerednek megfelelő időzónában
a böngésződ tudja, hogy az operációs rendszered milyen időzónában van beállítva 
2023-12-14T00:39:36.010Z -> visszakapjuk ezt a UTC time-ot
ezt már a node.js dolgozta fel böngészőben kicsit másféleképpen fogjuk ezt látni 

böngészőben -> Thu Dec 14 2023 01:42:08 GMT+0100 (közép-európai téli idő)
ez egy toString-es verzió

ebből sokféle információt ki tudunk szedni 
*/
const d2 = new Date("2006-05-20 10:11:12:500");
console.log(d2);
/*
Be tudjuk állítani, hogy az év legyen 2006
2006-01-01T00:00:00.000Z
azt is mondhatom, hogy legyen 2006-05
2006-05-01T00:00:00.000Z
meg a napot is
2006-05-20T00:00:00.000Z
még az órát, percet és a másodpercet is meg tudjuk határozni 
2006-05-20T08:11:12.000Z
*/
/* 
ez a toStringelt verzió, ha szeretnénk innen kiszedni az évet, lementeni egy változóba ->
year: 2006
*/
const year = d2.getFullYear();
console.log("year: " + year);

/*
A month 4-et fog visszaadni, ami azért érdekes, mert májusról van szó, hónapot 0-tól számolja!!!!!!!!!!!!!!!!!
month: 4
*/
const month = d2.getMonth();
console.log("month: " + month);

/*
A day-nél is egy érdekes értékét fogunk kapni, 6, mert ez nem azt jelenti, hogy hanydika van, hanem ugy, hogy a hétnek 
hanyadik napja van, úgyhogy a vasárnap a 0, tehát ez egy szombati nap volt
day: 6
Sat May 20 2006 10:11:12 GMT+0200 (közép-európai nyári idő)
*/
const day = d2.getDay();
console.log("day: " + day);

/*
visszakajuk azt, hogy hanyadik nap a hónapban
monthDay: 20
*/
const monthDay = d2.getDate();
console.log("monthDay: " + monthDay);

/*
Óra, perc másodperc
hour: 10
minute: 11
second: 12
millisencond: 0 -> ez alapból nullára lesz állítva, mert nem határoztuk meg, amikor létrehoztuk ezt a d2-t
utána beírtuk, hogy :500 a d2-be a másodperc után -> millisencond: 500
*/
const hour = d2.getHours();
console.log("hour: " + hour);

const minute = d2.getMinutes();
console.log("minute: " + minute);

const second = d2.getSeconds();
console.log("second: " + second);

const ms = d2.getMilliseconds();
console.log("millisencond: " + ms);

/*********************************************************************************************************************************/
/*
Unix timestamp 
Millisecond-ban adja meg, hogy 1970.01.01 00:00:00 óta mennyi idő telt 
Ez azért fontos, mert pl. a szökőévek miatt nehéz összehasonlítani dátumokat, hogy melyik volt elöbb-késöbb
és ha két dátumot átváltunk milliszekundumra, akkor biztosan tudjuk melyik volt elöbb és késöbb, kivéve 1970 elötti
dátumok

a getTime()-val tujduk megkapni a unix timestampat

1665360000000
1668124800000
*/

const d3 = new Date("2022-11-11");
const d4 = new Date("2022-11-11");

const d3ms = d3.getTime();
const d4ms = d4.getTime();

console.log(d3ms);
console.log(d4ms);

/*
Két date time objektumot össze tudunk hasonlítani a relációs operátorok segítségével is
azt interpreter automatikusan át fogja váltani unix timestamp-re

kiírta -> A d3 kisebb, mint a d4.

Ha meg összehasonlítjuk, hogy egyenlő-e a kettő 
false
ha beállítjuk, hogy egyenlők legyenek, akkor az egyenlőség nem müködik mert objektumokat hasonlítunk össze és nem 
fogja átváltani automatikusan ->
ezért utána kell írni a getTime-ot
true
*/

if(d3 < d4) {
    console.log("A d3 kisebb, mint a d4.")
}

console.log(d3 === d4); // nem jó így

console.log(d3.getTime() === d4.getTime());

/*
2 dolog ami a kód lefutásának az időzítéséhez kapcsolodik

1. setTimeout()
egy olyan beépített függvény, amely vár két paramétert ->
egy callback function-t és egy számértéket
a callback function az az a függvény amit majd lefutatt, annyi idő után
amilyen értéket megadtunk második paraméternek, ami egy milliszekundum lesz 
*/

setTimeout(() => {
    console.log("Lefutottam öt másodperc múlva.")
}, 5000);

/*
vár öt másodpercet és kiírja, amit beíertunk console.log-ba neki
ezzel meg tudjuk mondani, hogy mi fusson le mennyi idő múlva
*******************************************************************
*/

/*
2. setInterval
ami nagyon hasonlit erre, de ez egy bizonyos intervallumonként lefutatt egy kódot, amit megadunk neki
pl. van egy countDown változónk, ami 10-ről kezdödik 

ez a countDown le fog számolni 10-től a minusz végtelenig, mert semmi se állítja le a kódot

Az az érdekessége, hogy azt a console.log-ot is elöbb fogja kiírni ami utána van és csak utána kezdi el 
a számolást
Ebböl az következik, hogy még normál esetben a kódunk az ugy fut le, hogy fentről lefelé és amig az
egyik kód nem ér véget, addig a másik kód várakozik 
A setInterval másképpen müködik, indit egy új végrehajtási szálat és mellette párhuzamos pl.
le tudott futni a console.log is ami utána volt 
Ez azért van, hogy a kódódnak ne kelljen addig várni, amig visszaszámol a setInterval, mert ha várnia kéne 
arra, hogy visszaszámol, akkor az összes többi folyamat meg nem futna le 
*/

console.log("dds");
console.log("edg");

let countDown = 10;

const intervalNumber = setInterval(() => {
    console.log("IntervalNumber: " + intervalNumber)
    countDown--;

    console.log(countDown);

    if(countDown === -0)
    clearInterval(IntervalNumber);
    
}, 1000);

/*
Hogyan állítom meg az interval folyamatokat ->
van egy regisztrációs számuk, ami reprezentálja őket és 
aminek a segítségével le tudjuk állítani 

IntervalNumber: 7, mert ez a hetedik folyamat amit inditottunk 

*/

console.log("Én is itt vagyok!");

