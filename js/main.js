let title = document.getElementById("title")
let price = document.getElementById("price")
let taxes = document.getElementById("taxes")
let transfercost = document.getElementById("transfercost")
let discound = document.getElementById("discound")
let total = document.getElementById("total")
let count = document.getElementById("count")
let creatbtn = document.getElementById("creat")
let sall = document.querySelectorAll("#sall input")
let department = document.getElementById("department")
let tbody = document.getElementById("tbody")
let spanclear = document.getElementById("spanclear")
let clearall = document.getElementById("clearall")


let mood = "creat"
let globalid
if (localStorage.product != null) {
    alldata = JSON.parse(localStorage.product)
} else {
    alldata = [];

}



let gettotal = () => {
    let price = sall[0].value,
        taxes = sall[1].value,
        transfercost = sall[2].value,
        discound = sall[3].value,
        total = sall[4].value
    sall[4].value = (+price + +taxes + +transfercost) - discound
}

for (let i = 0; i < sall.length; i++) {
    sall[i].addEventListener('keyup', gettotal)

}

let creatdata = () => {
    let newdata = {
        title: title.value,
        price: sall[0].value,
        taxes: sall[1].value,
        transfercost: sall[2].value,
        discound: sall[3].value,
        total: sall[4].value,
        count: count.value,
        department: department.value

    }


   

    if (mood == "creat") {
        if (newdata.count > 1) {
            for (let i = 0; i < newdata.count; i++) {
                alldata.push(newdata)
            }
        } else {
            alldata.push(newdata)
        }

    } else {
        alldata[globalid] = newdata
        mood = "creat "
        creat.innerHTML = "create"
        creat.classList.replace('btn-warning', 'btn-danger')
        count.classList.remove("none")
    }



    localStorage.setItem("product", JSON.stringify(alldata))
    showdata()
    clearinputs()
}
let showdata = () => {
    let table = ''
    for (let i = 0; i < alldata.length; i++) {
        table += `
     <tr>
    <td>${i+1}</t>
    <td>${alldata[i].title}</td>
    <td>${alldata[i].price}</td>
    <td>${alldata[i].taxes}</td>
    <td>${alldata[i].discound}</td>
    <td>${alldata[i].total}</td>
    <td>${alldata[i].department}</td>
    <td> <button onclick="deleteitem(${i})" class= " btn btn-danger "> delete</button></td>
    <td><button onclick="updatedate(${i})" class="btn btn-success"> edit</button></td>
     </tr>`

    }
    if (alldata.length > 0) {
        clearall.classList.add("mb-3")
        clearall.classList.remove("none")
        spanclear.innerHTML = alldata.length
    } else {
        clearall.classList.add("none")

    }


    tbody.innerHTML = table

}
// localStorage.clear()
showdata()
creatbtn.addEventListener("click", creatdata)





let clearinputs = () => {
    title.value = ""
    sall[0].value = ""
    sall[1].value = ""
    sall[2].value = ""
    sall[3].value = ""
    sall[4].value = ""
    count.value = ""
    department.value = ""
}

// delet one item                           
let deleteitem = (i) => {
    alldata.splice(i, 1)
    localStorage.product = JSON.stringify(alldata)
    showdata()
}


let clearalls = () => {
    alldata.splice(0)
    localStorage.product = JSON.stringify(alldata)
    showdata()
}

clearall.addEventListener('click', clearalls)

let updatedate = (i) => {
    mood = "update"
    title.value = alldata[i].title
    sall[0].value = alldata[i].price
    sall[1].value = alldata[i].taxes
    sall[3].value = alldata[i].transfercost
    sall[2].value = alldata[i].discound
    sall[4].value = alldata[i].total
    department.value = alldata[i].department
    globalid = i;
    count.classList.add('none')
    creat.innerHTML = 'update'
    creat.classList.replace("btn-danger", "btn-warning")
}


var sss = calu