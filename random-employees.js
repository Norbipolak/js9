/*
random employee-kat fogunk csinálni és arra fogunk rászürni iterációs függvényekkel
*/
const departments = ["Marketing", "Finance", "IT", "HR", "Production"];
const firstNames = ["István", "Réka", "Balázs", "Katalin", "Sándor", "Emőke"];
const lastNames = ["Kis", "Nagy", "Horváth", "Takács", "Pintér", "Szabó"];
const employees = [];
const employeeHolder = document.querySelector("#employee-holder");

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

function showEmployees() {
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