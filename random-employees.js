const random = (from, to)=> Math.floor(Math.random()*((to-from)+1)) + from;

const Employees = {
    departments: ["Marketing", "Finance", "IT", "HR", "Production"],
    firstNames: ["István", "Réka", "Balázs", "Katalin", "Sándor", "Emőke"],
    lastNames: ["Kis", "Nagy", "Horváth", "Takács", "Pintér", "Szabó"],
    employees: [],
    employeeHolder: document.querySelector("#employee-holder"),
    departmentSelect: document.querySelector("#department"),
    firstNameInput: document.querySelector("#firstName"),
    lastNameInput: document.querySelector("#lastName"),
    salaryFromInput: document.querySelector("#salaryFrom"),
    salaryToInput: document.querySelector("#salaryTo"),
    department: "",
    firstName: "",
    lastName: "",
    salaryFrom: 0,
    salaryTo: Number.MAX_SAFE_INTEGER,
    innit() {
        this.generateDepartments();
        this.createEmployees();
        this.search();
        this.searchFirstName();
        this.searchLastName();
        this.searchDepartment();
        this.searchSalaryFrom();
        this.searchSalaryTo();
    },
    search() {
        this.firstName = this.firstName.toLowerCase().trim();
        this.lastName = this.lastName.toLowerCase().trim();


        const filteredEmployees =
        this.employees.filter((employee) =>
                employee.firstName.toLoweCase().includes(this.firstName)
                && employee.lastName.toLoweCase().includes(this.lastName)
                && employee.department.includes(this.department)
                && employee.salary >= this.salaryFrom 
                && employee.salary <= this.salaryTo);

                this.showEmployees(filteredEmployees);
    },
    searchFirstName() {
        this.firstNameInput.addEventListener("input", ()=> {
            this.firstName = this.firstNameInput.value; // ehelyett lett magyarázat lent -> this.firstName = this.value;
            this.search(
                this.firstName, this.lastName, 
                this.department, this.salaryFrom, 
                this.salaryTo
            );
        });
    },
    searchLastName() {
        this.lastNameInput.addEventListener("input", ()=> {
            this.lastName = this.lastNameInput.value;
            this.search(
                this.firstName, this.lastName, 
                this.department, this.salaryFrom, 
                this.salaryTo
            );
        });
    },
    searchDepartment() {
        this.departmentInput.addEventListener("change", ()=> {
            this.department = this.departmentInput.value;
            this.search(
                this.firstName, this.lastName, 
                this.department, this.salaryFrom, 
                this.salaryTo
            );
        });
    },
    searchSalaryFrom() {
        this.salaryFromInput.addEventListener("input", ()=> {
            this.salaryFrom = parseInt(this.salaryFromInput.value);

            if(isNaN(this.salaryFrom))
            this.salaryFrom = 0;

            this.search(
                this.firstName, this.lastName, 
                this.department, this.salaryFrom, 
                this.salaryTo
            );
        });
    },
    searchSalaryTo() {
        this.salaryToInput.addEventListener("input", ()=> {
            this.salaryTo = parseInt(this.salaryToInput.value);

            if(isNaN(this.salaryTo))
            this.salaryTo = Number.MAX_SAFE_INTEGER;

            this.search(
                this.firstName, this.lastName, 
                this.department, this.salaryFrom, 
                this.salaryTo
            );
        });
    },
    generateDepartments() {
        for(let i = 0; i < this.departments.length; i++) {
            const option = document.createElement("option");
            option.innerText = this.departments[i];
            option.value = this.departments[i]

            this.departmentSelect.appendChild(option);
        };
    },
    createEmployees() {
        for(let i = 0; i < 30; i++){
            const departments = this.departments[random(0, departments.length-1)];
            const firstName = this.firstNames[random(0, firstNames.length-1)];
            const lastName = this.lastNames[random(0, lastNames.length-1)];
            const salary = Math.floor(Math.random()*(1_500_000)/5)*5+500000;

            const employee = {
                firstName:firstName,
                lastName:lastName,
                salary:salary,
                department:department
            };

            this.employees.push(employee);
        };
    },
    showEmployees(employees) {
        this.employeeHolder.innerHTML = "";
    
        for (const employee of employees) {
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
    
            this.employeeHolder.appendChild(div); 
        }
    }
    


};

/*
Amikor, ide barakjuk az eventlistenereket, ebbe a objektumba, akkor 3 dologra kell figyelni 
1. csinálni kell nekik egy függvényt -> firstName-nek az lesz, hogy searchFirstName
2. (this-ek) a firstNameInput.addEventListener  helyett a this.firstNameInput.addEventListener
a firstName = this.value helyett this.firstName = this.value 
mikor meghívjuk a search-öt akkor is mindegyik paraméteréhez elég kell írni, hogy this 
search(this.firstName, this.lastName, this.department, this.salaryFrom, this.salaryTo)
amikor meghívunk egy function-t, vagy pusholunk, egy functionban akkor is kell oda a this -> this.employees.push(employee);
3. és az addEventListener második értéke nem lehet sima function() {}, hanem arrow function kell ()=> {}
*/

/*
Betettünk mindent ide ebbe az objektumba, amit az employees.js-en csináltunk és a search függvény fölött csinálunk 
egy init függvényt, ahol meghívtunk minden függvényt és még ezek mellett megcsináltuk a 
const random-ot az egész objektumon kivül
*/

/*
a search függvénynek kitöröltük a paramétereit és benne hivatkozunk a this-re
*/

/*
Magyarázat: 
this.firstName = this.firstName.value; // ehelyett lett magyarázat lent -> this.firstName = this.value;
azért mert az employees tömb searchFirstName(), searchLastName(), searchDepartment() stb. arrow functiont használtunk ->
searchFirstName() {
    this.firstNameInput.addEventListener("input", ()=> {
    console.log(this);
    stb, ami még felül benne van
    });
},
console.log(this) -> maga az egész objektum a this
Ebben az eventListenerben a this mivel, hogy arrow functiont használtunk, ezért az objektum a this és ez azért jelentett 
gondot, mert a this.value innentől kezdve undefined lesz -> nem az amit kiválasztott select - option-ből a user ezért kell 
this.firstName = this.firstName.value;
*/