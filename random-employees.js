/*
random employee-kat fogunk csinálni és arra fogunk rászürni iterációs függvényekkel
*/
const departments = ["Marketing", "Finance", "IT", "HR", "Production"];
const firstNames = ["István", "Réka", "Balázs", "Katalin", "Sándor", "Emőke"];
const lastNames = ["Kis", "Nagy", "Horváth", "Takács", "Pintér", "Szabó"];
const employees = [];
const employeeHolder = document.querySelector("#employee-holder");
const departmentSelect = document.querySelector("#department");
const firstNameInput = document.querySelector("#firstName");
const lastNameInput = document.querySelector("#lastName");

/*
Létrehozunk employee objektumokat és ezt belerakjuk egy employees nevű tömbbe és véletlenszerűen előállítunk employees-okat 
*/

// const Employee = {
//     department:"",
//     firstName:"",
//     lastName:"",
//     salary:500000
// }

/*
Csinálunk egy function-t -> createEmployees
létrehozunk egy függvényt (random), ami véletlen számot generál a megadott intervalomun belül
*/

const random = (from, to) => (Math.floor(Math.random() * (to - from) + 1)) + from;

function createEmployees() {
    for (let i = 0; i < 30; i++) {  //elég nekünk 30 dolgozó, azért szükséges, hogy 30-ig elszámoljunk 
        const department = departments[random(0, departments.length - 1)];
        const firstName = firstNames[random(0, firstNames.length - 1)];
        const lastName = lastNames[random(0, lastNames.length - 1)];
        const salary = Math.floor(Math.random() * (1_500_000) / 5) * 5 + 500000;

        /*
        length-1 mert ugye núllától indul length:5 departments[0]:Marketing, departments[1]:Finance....
        a random segítségével generálni fogunk egy számot from: 0 és to:departments.length-1 -> 4 között
        ez random szám mondjuk 3-as lesz akkor departments[3] -> ami a mi tömbünkben a 4-dik elem, mert 0-ról indul -> és kijön a HR
        
        teljesen, ugyanezen az elven megy a firstname és a lastname is, és mivel a tömbnek a length-1 van meghatározva,
        ezért teljesen mindegy, hogy hány elemet tartalmaz mert 0 - length-1
        
        salary-nél az intervallum -> 1_500_000 (helyes formátum így is elválasztva -> _)
        /5*5 -> 5-re való kerekítés miatt lesz így
        +500000 a minimálbér Magyarországon
        */
        /*
        Összerakjuk ezeket egy employee nevezetű objektumban
        */

        const employee = {
            firstName: firstName, //az első firstName az a property-nek a neve a második meg az értéke lész (lehet mindkettő ugyanaz)
            lastName: lastName,
            salary: salary,
            department: department
        }
        employees.push(employee);
    }
}

createEmployees();
/*
console.log(employees) ->
{
  firstName: 'Katalin',
  lastName: 'Nagy',
  salary: 1396170,
  department: 'HR'
}
{
  firstName: 'Emőke',
  lastName: 'Pintér',
  salary: 1202395,
  department: 'Production'
}
{
  firstName: 'Balázs',
  lastName: 'Nagy',
  salary: 728920,
  department: 'IT'
}..............

Leírás:
1. Megcsináltuk a tömbket 
2. Csináltunk egy függvényt -> createEmployees();
3. for-val meghatároztuk, hogy mennyit csináljon -> 30
4. random-mal generáltunk egy random számot a függvényen kivül 
5. egy változóban átadtunk -> const department = departments[random(0, departments.length - 1)];
6. csináltunk egy objektumot (const employee), amiben megadtuk a property-nek a nevét és értékként meg a változó nevet amit csináltunk 
pl. const department = departments[random(0, departments.length - 1)];
        const employee = {
            department: department
6. belrakjuk(push) az employee objektumot egy az employees tömbbe, amit csináltunk és a függvény meghívása
*/

/*
már lehet velük dolgozni, elöször meg fogjuk őket jeleniteni a html szerkezetben és csinálunk nekik egy style.ccs
csináltunk egy container amiben benne lesz egy grid4(ami csak arra fog szolgálni, hogy megkapja a grid-es tulajdonságokat)
ebben még csináltunk egy employee data-t(ami azért kell hogy megjelenitsük a benne lévő dolgokat egy box-ban, van border-je)
és ezek után jöhetnek a h4, h5-ös tag-ek az adatokkal

<body>
    <div class="container">
        <div class="grid-4" id="employee-holder">
            <div class="employee-data">
                <h4>Név</h4>
                <h5>Kis János</h5>

                <h4>Részleg</h4>
                <h5>Marketing</h5>

                <h4>Fizetés</h4>
                <h5>1 500 000$</h5>
            </div>
            <div class="employee-data">
                <h4>Név</h4>
                <h5>Kis János</h5>

                <h4>Részleg</h4>
                <h5>Marketing</h5>

                <h4>Fizetés</h4>
                <h5>1 500 000$</h5>
            </div>
            <div class="employee-data">
                <h4>Név</h4>
                <h5>Kis János</h5>

                <h4>Részleg</h4>
                <h5>Marketing</h5>

                <h4>Fizetés</h4>
                <h5>1 500 000$</h5>
            </div>
            <div class="employee-data">
                <h4>Név</h4>
                <h5>Kis János</h5>

                <h4>Részleg</h4>
                <h5>Marketing</h5>

                <h4>Fizetés</h4>
                <h5>1 500 000$</h5>
            </div>
        </div>
    </div>
</body>

ezekből fogunk szürni adatokat 
grid-nek adunk egy id="employee-holder-t" és az ebben a js-ben lévő adatokat amik az employees tömbben vannak, azokat bele kell rakosgatni 
az employee-holder-be -> elöször lementjük ide az employee-holder-t 

csinálunk egy showEmployees function-t 
itt fogjuk megjeleniteni az employees tömbben való dolgokat
*/

function showEmployees(employees) {
    employeeHolder.innerHTML = "";
    
    for(const employee of employees) {
        const div = document.createElement("div"); //ezzel létrehozunk egy div-et
        div.classList.add("employee-data"); //ezzel adunk egy class-t a div-nek -> ahogy a html-ben van, mert nem töröltem ki 
        const nameH4 = document.createElement("h4");
        nameH4.innerText = "Name";
        const nameH5 = document.createElement("h5");
        nameH5.innerText = employee.firstName + "" + employee.lastName;

        const departmentH4 = document.createElement("h4");
        departmentH4.innerText = "Department";
        const departmentH5 = document.createElement("h5");
        departmentH5.innerText = employee.department;

        const salaryH4 = document.createElement("h4");
        salaryH4.innerText = "Salary";
        const salaryH5 = document.createElement("h5");
        salaryH5.innerText = employee.salary;

        div.appendChild(nameH4);
        div.appendChild(nameH5);
        div.appendChild(departmentH4);
        div.appendChild(departmentH5);
        div.appendChild(salaryH4);
        div.appendChild(salaryH5);

        employeeHolder.appendChild(div); //a div-et meg az employeeHolder-be helyezzük el 
    }
}
/* 
1.csinálunk egy függványt aminek értékként megadjuk az employees tömbünket
2.csinálunk egy for-t, hogy végigiteráljon az employees tömbönkün
3.a for-ban csinálunk egy html szerkezetet, olyat ami az employees.html-ben ott van - késöbb ezt majd töröljük ,ne maradjon benne, mert látszani fog
4.innerText-vel megadjuk, hogy mit tartalmazzon a tag-ekben a mező
pl. a nameH4.innerText = "Name"; csak annyit fog tartalmazni, hogy name 
a nameH5.innerText = employee.firstName + "" + employee.lastName; az employees nevü tömbünk objektumán lévő firstName és lastName lesz
appendChild-oljuk amiket elkészítettünk 
*/ 

/*
le kell törölni, amit csináltnuk html, mert ha bennemarad látszani fog a böngészőben is
ez legyen a html-ben:
    <div class="container">
        <div class="grid-4" id="employee-holder">
többit létrehoztuk a showEmployees függvényünkben
*/

showEmployees();

/*
legenerált 30db random nevet, department és salaryt
ha újratöltjük az oldalat, akkor legenerál másik 30db - mindig 30db összesen az első for-ban lévő i < 30 miatt 
itt majd rá tudunk szürni a departmentre, névre, salary-ra
*/

/*csinálunk a container-ben egy class="box"-os div-et -> ahol a form lesz amivel szürünk*/

/**********************************************************************************************************/
/* köveztkező óra a 22-i video*/

/*
Megcsináljuk, hogy rá lehessen keresni a input mezőkkel a First Name, Last Name stb-re

A department majd egy select mező lesz, amiben van egy option, ahol van több lehetőség amiből tudunk választani 
abban mindig select amiben van option ->

            <div>
                <h3>Department</h3>
                <select id="department">
                    <option value="-1">Válassz részleget</option>
                </select>
            </div>

mindegyik input mezőnek adtunk egy id-t 
A salary, úgy lesz, hogy van két darab input mezőnk egymás alatt, egyik a tól másik az -ig ->
                <h3>Salary</h3>
                <input type="number" id="salaryFrom">-tól
                <input type="number" id="salaryTo">-ig
                
legfelülre, lementjük és itt legeneráljuk a departmentet 
*/

function generateDepartments() {
    for(let i = 0; i < departments. length; i++) {
        const option = document.createElement("option");
        option.innerText = departments[i];
        option.value = departments[i];

        console.log(option);

        departmentSelect.appendChild(option);

    // for(const department of departments) {
    //     //option-ök készítése 
    //     const option = document.createElement("option");
    //     option.value = value;
    /*inkább sima for ciklussal csináljuk*/
    }
}

generateDepartments();

/*
csináltunk egy option-t 
megadtuk az option.innerText-vel az összes departments-et
option.value - > mondjuk a 3-as indexü department az IT az employees-ban akkor a legördülő mezőben is 3-ik lesz

option.value = ; 
The line option.value = i; sets the value of each <option> element to the current value of i. 
In this context, it appears the intention is to assign a numerical value to each department option based on its index in the departments array.
This can be useful when handling the selected value later through JavaScript, 
as these numerical values can serve as identifiers for the departments in the dropdown list.
*/

// option.value-t késöbb változtattuk departments[i]-re, mert az employeesba névvel tettük be a departmentet és ezért nem tudunk indexre
//rákeresni

/*
most jön a First Name
lementjük a firstName-t 
utána adunk neki egy eventListenert -> keyup
*/



firstNameInput.addEventListener("keyup", function(){ // keyup az teljesen megegyezik az input-val (mindegy melyiket használjuk)
//console.log(this.value); ha az input mezőbe (=value) beírunk valamit, akkor kiírjuk az értékét(beirom, hogy a -> megjelenik a console egy a)
// de bármi lehet amit beirunk, akkor fogja kiírni, ha felengedem a kezem a billentyűről (lenyomva tartom az a-t akkor beírhatok, annyi a-t amig fel nem engedem a kezem a billentyűről)
const inputValue /= this.value.trim().toLowerCase() // azért kell a this -> mert az arra utal, hogy firstNameInput mezőre és annak az a value-ja amit beírunk oda
//a showEmployees() várjon nekünk egy paramétert azt, hogy employees -> showEmployees(employees), ezt most egy paraméterből fogja megkapni
//kivettük a showEmployees meghívását, mert dobna nekünk egy hibát 
//meghívjuk majd itt a showEmployeest a következő paraméterrel, amit csinálunk 
firstName = employees.filter((employee)=> employee.firstName.toLowerCase.includes(inputValue));
//azokat adom vissza amik megfelelnek a filteredEmployees kritériumnak 
showEmployees(filteredEmployees);
});                      

/*
még nem volt jó, igy mert a showEmployees folyamatosan generálta az új dolgokat ezért beírtuk, hogy employeeHolder.innerHTML = ""
szóval, ha egyszer legenerálta nekünk akkor az innerHTML = "" -> no content, tehát nem fogja tudni, mégegyszer legenerálni 

hogy müködik: 
az input mezőben beírunk valamit -> inputValue 
azt szeretnénk, hogy csak azokat jelenitse meg (filter) employee.firstName-ben megtalálható (includes) az amit beírtunk az input mezőbe(inputValue)
és a végén meghívjuk a showEmployees(filteredEmployees) -> elején ameddig nem írunk be semmit a mezőbe, addig megjelenít mindenkit, de utána 
viszont, mivel meg van neki értékként adva a filteredEmployees, ami kapcsolatban van az inputValue-vel 
csak azokat jeleniti meg amelyiknek a firstName-je tartalmazza azt a betűt vagy betűket amit beírtunk az input mezőbe.

Viszont még baj, hogy megkülönbözteti a nagy és kis betűt, pl. azt írom be hogy ré akkor nem talál senkit
de ha viszont azt írom be, hogy Ré -akkor kijön két Réka. -> ezért az inputValue és a employee.firstName is kap toLowerCase-t
ha kis betűvel írjuk be, hogy réka utána kijönnek a rékák -> de az nem változik meg, hogy amit látunk a box-ban Réka az nagy betű marad
*/

/*
az a probléma, hogy, így csak egyféle inputra tudunk rászürni, mert ha beírnánk valamit a Last Name-hez,
akkor ezzel a módszerrel az elözőt azt törölné -> 
beírtuk, hogy Réka a First Name-hez, kijött két Réka, az egyik Pintér a másik Nagy, de ha másikba beírnám, hogy Pintér,
akkor rákeresne az összes Pintérre

csinálunk egy search függvényt aminek, megadunk két értéket lastName és firstName
*/


function search(firstName, lastName) {
    firstName = firstName.toLowerCase().trim();
    lastName = lastName.toLowerCase().trim()

    const filteredEmployees = employees.filter((employee)=>
    employee.firstName.toLowerCase.includes(firstName)
    && employee.firstName.toLowerCase.includes(lastName));

    showEmployees(filteredEmployees);
    
}
/*itt irom újra az eventlistenert a változtatások miatt*/ 
/*létrehozunk egy firstName,, lastName változot üres stringgel az eventListeneren kivül 
let firstName = ""
az inputValue-t átírjuk a firstName változóra
*/

let firstName = "";
let lastName = "";

firstNameInput.addEventListener("input", function() {
    firstName = this.value;
    search(firstName, lastName);
});

lastNameInput.addEventListener("input", function() {    
    lastName = this.value;
    search(firstName, lastName);
});

/*
Ilyenkor az történik, hogyha elkezdek írni a firstNameInput-ba, akkor a firstName értéke változni fog és
ha lastName-be írok akkor a lastNameInput értéke fog változni 
ha írjuk, hogy réka, akkor megváltozott a firstName értéke és ha másikba írjuk, akkor megváltozik a lastName 
értéke, de megmarad a firstName is és így tudunk mindegyikre rákeresni 
*/

/*
Hogy keresünk rá a departmentekre?
Másféle eseménykezelő szükséges -> change 
*/

let department = "";//fontos, hogy let, mert késöbb, új értéket szeretnénk neki adni -> this.value
let firstName = "";
let lastName = "";

firstNameInput.addEventListener("input", function() {
    firstName = this.value;
    search(firstName, lastName, department);//hozzágyuk ide a department
});

lastNameInput.addEventListener("input", function() {    
    lastName = this.value;
    search(firstName, lastName, department);//hozzágyuk ide a department
});

departmentSelect.addEventListener("change", function(){
    department = this.value;
    search(firstName, lastName, department)
});
/*
Ha megváltozik az értéke akkor keresünk rá a departmentre
Hogyan? 
search függvénynek megadjuk a departmentet 3. paraméterként
*/
function search(firstName, lastName, department) {
    firstName = firstName.toLowerCase().trim();
    lastName = lastName.toLowerCase().trim()

    const filteredEmployees = employees.filter((employee)=>
    employee.firstName.toLowerCase.includes(firstName)
    && employee.firstName.toLowerCase.includes(lastName) 
    && employee.departments.include(department),
    /*
    itt a felhasználó nem írhatja be kis-nagybetűvel ezért a toLowerCase() felesleges, ugyanugy mint a trim(), hiszen itt efógy listából 
    válassza ki és akkor sincs probléma, ha felhasználó nem választ ki semmit, mert a kezdővalue html-ben egy üres string, az minden
    másik stringben megtalálható, így veszi a JavaScript, tehát az összeset ki fogja hozni, ugyanígy a neveknél is
    */
    );

    showEmployees(filteredEmployees);
}

/*
Most már ár tudunk keresni mindegyikre pl. First name Sándor és lett 8 Sándor utána kiválasztjuk, hogy IT -> erre is rászűr és 
így már csak 4 Sándort fog megjeleniteni, akik az IT-ban dolgoznak, Finance-ban egy Sándor dolgozik és így tovább tudunk szűrni 
departmentre is 
*/

/*
Fizetés -> 2 van, ezért muszály mindkettőt lementeni (tól és ig)
*/

const departments = ["Marketing", "Finance", "IT", "HR", "Production"];
const firstNames = ["István", "Réka", "Balázs", "Katalin", "Sándor", "Emőke"];
const lastNames = ["Kis", "Nagy", "Horváth", "Takács", "Pintér", "Szabó"];
const employees = [];
const employeeHolder = document.querySelector("#employee-holder");
const departmentSelect = document.querySelector("#department");
const firstNameInput = document.querySelector("#firstName");
const lastNameInput = document.querySelector("#lastName");
const salaryFromInput = document.querySelector("#salaryFrom");
const salaryToInput = document.querySelector("#salaryTo");

/*
Megcsináljuk ugyangy, hogy let = "" és minegyiknek adunk egy eventListenert
*/
let salaryFrom = 0;
let salaryTo = 0;

salaryFromInput.addEventListener("input" function() {
    salaryFrom = parseInt(this.value);
    // console.log(salaryFrom); ha beírunk egy számot, az addig ok, de ha kitöröljük akkor azt kapjuk, hogy NaN 
    //és ez probléma, mert üres stringnél megjelenitette előbb az összeset, de itt NaN nem fogja, ha üresen hagyjuk
    if(isNaN)
});