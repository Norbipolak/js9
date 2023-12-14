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
Ez azért van, hogy a kódódnak ne kelljen arra várni, amig visszaszámol a setInterval, mert ha várnia kéne 
arra, hogy visszaszámol, akkor az összes többi folyamat meg nem futna le 
*/

console.log("dds");
console.log("edg");

let countDown = 10;

const intervalNumber = setInterval(() => {
    console.log("IntervalNumber: " + intervalNumber)
    countDown--;
    console.log("Its the final countdown: " + countDown); 
    /*ha csak simán kikonzuluzunk valamit, akkor lefutt, így Its the final countdown!
    9
    IntervalNumber: 7
    Its the final countdown!
    8
    */
    console.log(countDown);

    if(countDown === 0) {
    clearInterval(IntervalNumber);
    console.log("Kabumm!");
    }
}, 1000);

/*
Hogyan állítom meg az interval folyamatokat ->
van egy (regisztrációs) számuk, ami reprezentálja őket és 
aminek a segítségével le tudjuk állítani 

A visszatérési értéke a setInterval-nal ez a szám ->
IntervalNumber: 7, mert ez a hetedik folyamat amit inditottunk 
ennek a segítségével le is tudjuk állítani ezeket a folyamatokat, 
úgy hogy azt mondjuk eggy if-vel, hogy a countDown elérte a nullát 
akkor a clearInterval, segítségével leáálítjuk a folyamatot,
úgy, hogy a clearInterval-nak megadom az intervalNumber-t (ennek a folyamatnak az id-ját, most jelen esetben a 7-et)
-> így az fog történni, hogy elszámol 0-ig és ezt követően megállítja a folyamatot 
*/

console.log("Én is itt vagyok!");

/*
Mire használják -> főleg weboldalakon 
de létre lehet vele hozni egy digitális órát is -> date-time.html
vagy akár analógot is -> rotate, transform-rotate
********************************************************************************************************************************************
*/

/*
Csináltunk egy id="watch" div-et és html-ben style-val formáztuk
width: 90px; mert 3 felé szeretnénk osztani (óra, perc, másodperc)
display: grid; grid-template-columns: 1fr 1fr 1fr; margin: 15px auto; - középen legyen + body-nak text-align: center;
id="watch" divbe teszünk 3db class="watch-item" div-et, mindegyiknek külön id-val
szóval van class-juk a formázás miatt és van egy id-juk a lementés miatt 
1. id="hour" 2. id="minute" 3. id="second" -> lementjük őket 
*/ 
const hourDiv = document.querySelector("#hour");
const minuteDiv = document.querySelector("#minute");
const secondDiv = document.querySelector("#second");

function watch() {
    let dt = new Date();
    hourDiv.innerText = d.getHours().toString().padStart(2, "0");
    minuteDiv.innerText = d.getMinutes().toString().padStart(2, "0");
    secondDiv.innerText = d.getSeconds().toString().padStart(2, "0");

    setInterval(()=> {
        dt = new Date();
        hourDiv.innerText = d.getHours().toString().padStart(2, "0");
        minuteDiv.innerText = d.getMinutes().toString().padStart(2, "0");
        secondDiv.innerText = d.getSeconds().toString().padStart(2, "0");
    }, 1000);
}

/*
Ha nem állítunk be semmilyen paramétert, akkor az éppen aktuális date-t fogja megmondani,
azért fontos, hogy mindig elkészítsük a new Date() (setInterval-on belül legyen), mert ha csak egyszer
készítjük el, akkor mindig ugyanazt az időt (setInterval-on belül) fgoja mutatni ->
az elkészítésének a pillanatában lévő időt.

watch() -> egy másodpercenként, lefutatja ami benne van -> úgy fog müködni, mint egy óra, mert a get seconds 1-vel több lesz 1másodperc után
setTimeout (egyszer fut le x idő után amit beállítottunk)
setInterval (mindig lefut olyan időközönként, amit beállítottunk neki)

az a probléma jelenleg, hogy a másodperceket, percet, órát úgy írja ki 10-ig, hogy 1 2 3 4 és mi úgy szeretnénk, hogy 01 02 03 04
erre az a megoldás, hogy átalakítjuk toString()-é (mert ez number és annál nincsen padStart) és a stringek rendelkeznek egy olyan metódussal, hogy padStart()

function watch() {                                          --->                            function watch() {
    setInterval(()=> {                                                                      setInterval(()=> {                                               
        const d = new Date();                                                                   const d = new Date();
        hourDiv.innerText = d.getHours();                                                       hourDiv.innerText = d.getHours().toString().padStart(2, "0");
        minuteDiv.innerText = d.getMinutes();                                                   minuteDiv.innerText = d.getMinutes().toString().padStart(2, "0");
        secondDiv.innerText = d.getSeconds();                                                   secondDiv.innerText = d.getSeconds().toString().padStart(2, "0");
    }, 1000);                                                                                }, 1000);

padStart(2) -> kettő karakteresnek kell lennie és amig nem éri el a kettőt, addig egészítse ki nulákkal az elejen, mert ez egy padStart();
*/

/*
Lehet set-elni is
Az lényege, hogy meg tudunk valamit változtatni a new Date()-ben, itt pl. a évet fogjuk a setFullYear-vel, az összes többi nem fog változni 
Sat Nov 21 2009 11:16:39 GMT+0100 (közép-európai téli idő)
beállítjuk az órát 19 órára
Sat Nov 21 2009 19:17:05 GMT+0100 (közép-európai téli idő) - ugye azért változott a perc meg a másodperc mert annyival késöbb hívtuk meg a setHours-ot bn
*/

const dt2 = new Date();
dt2.setFullYear(2009);
dt2.setHours(19);
console.log(dt2);

/*
Most igy ha megnyitjuk a böngészőt, akkor vár egy másodpercet, mire el kezd számolni, mire lefut a függvény ->
megcsinálunk mindent ami most a setInterval-ban úgyanúgy a függvényben is, de viszont a setIntervalon kivül 
annyi különdséggel, hogy a setInterval-ban egy const definiáltuk a dt = new Date()-et 
most pedig kivül fogjuk definiálni egy let-vel -> let dt = new Date() és a setIntervalon belül pedig újradefiniáljuk egy dt = new Date()-vel
Lehetne egy függvényt is készíteni a hourDiv, minuteDiv, secondDiv-nek és akkor nem kell duplikálni mindent ->
*/
function updateTime() {
    const currentTime = new Date();
    hourDiv.innerText = currentTime.getHours().toString().padStart(2, "0");
    minuteDiv.innerText = currentTime.getMinutes().toString().padStart(2, "0");
    secondDiv.innerText = currentTime.getSeconds().toString().padStart(2, "0");
}

function watch() {
    updateTime(); // Call initially to set the time

    setInterval(updateTime, 1000); // Call updateTime every second using setInterval
}
/*
Csinált egy updateTime függvényt amit meg fogunk hívni a watch függvényben és utána a watch függvényben és a watch függvényben lévő setInterval-nak is átadjuk
mint paramétert 
*/