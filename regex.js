/*
a reguláris kifejezések, azok különböző szabályokat biztosítanak arra, hogy input stringeket szürjünk -> mintailleszkedés vizsgálat 
regex101.com
Megnézzük, hogy egy string csak szám vagy betűkből áll, vagy számokból, amik pontosan 8 karakteresek 

Ezzel lehet például validálni egy adószámot, egy email-címet, egy url-t 
nem azt csináljuk, hogy az összes létező adószámból benne van-e, amit beírtak, hanem itt az történik, hogy a mintákat ismerjük fel benne.

[] -> felsorolás a megengedett karakterekről 

regex101.com-ba beírjuk, hogy [0-6] - nullától kilencig lehet megadni, ugy nem lehet, hogy [0-10]
0-tól 6-ig elfogadja nekünk a számokat, mint inputot, viszont ha, 7-8-9-et írunk, akkor már nem 
felül írja a match-eket, minden egyes jól beírt karakter növekszik a matchek száma 
pl. ha azt irom be, hogy 55 akkor lesz 2 matches - ha azt, hogy 555 akkor lesz 3 matches, 3 input ment át 

el tudunk fogadni betűket, olyan formában -> [0-6a-k] a-tól k-ig pl.
a-tól k-ig átmennek az angol abc kisbetűi

ha az összes számot és kisbetűt el szeretnénk fogadni, akkor [0-9a-z]
viszont ezzel nem tudom validaálni a speciális karaktereket pl. *-/+.,

[A-Z] -> angol abc nagybetűi 
[/d] -> (digit)-számkarakter [0-9]-nek a rövidítése
[/w] -> word karakter, ami egy szóban benne lehet, kisbetű, angol abbc 
[/W] -> non-word karakterek (+*-/.,) - speciális karakterek
{3} -> 3 karaktert fog elfogadni 
{3-5} -> 3-tól 5-ig fog elfogadni 
? -> 0 vagy 1 karakter 
+ -> 1 és végtelen között 
* -> 0 és végtelen között (lehet 0 és végtelen karakterem is, mindent elfogad)
(hideg) -> csak azt fogadja el, ami bele van írva és olyan sorrendben 
| -> vagy jel (hideg|meleg)

[hideg] -> sorrend, nem fontos, itt nem csak azt fogja elfogadni, hogy -> hideg, hanem azt is mondjuk, hogy idghe vagy gedih
*/

/*
Hogy kell azt ha szeretnénk az angol abc kis-nagybetűit, digits karaktereket, de pontosan 3-at belőlük -> {3}
[a-zA-z/d]{3}
csak 3 karakterenként fogja elfogadni 1 és 2 karaktert azt nem, 3 karakterenként lesz + 1 matchünk

? 0 és 1-et fogad el, ha nem írunk be semmit, akkor már van egy matchünk, ha beírunk még egy valamit, akkor lesz 2 match-ünk 
[a-zA-z/d]?
[a-zA-z/d]+
[a-zA-z/d]* ha beírjuk pl.asdfghjkl2432545 -> akkor az két találat(2matches) a 0 és a végtelen miatt 

(hideg) -> egy konkrét kifejezésnek az elfogadása
(sárga|piros) -> azt fogadja el, ami bele van írva, |-jellel elválasztva írhatunk több dolgot is bele (| - vagy jel)
*/