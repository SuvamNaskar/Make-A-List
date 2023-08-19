import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSetting = {
    databaseURL: "https://realtime-database-a9c59-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSetting);
const database = getDatabase(app);
const listInDB = ref(database, "list");

let input = document.getElementById("input-field");
let btn = document.getElementById("add-btn");

const listEl = document.getElementById("list");

onValue(listInDB, function(snapshot){
    if(snapshot.exists())
    {
        let listArray = Object.entries(snapshot.val());
        listEl.innerHTML = "";
        for(let i = 0; i < listArray.length; i++)
        {
            let currentItem = listArray[i];
            addItem(currentItem);
        }
    }
    else
    {
        listEl.innerHTML = "";
    }
})

btn.addEventListener("click", function(){
    let inputValue = input.value;
    if(inputValue == "")
    {
        alert("Input is blank!");
    }
    else
    {
        push(listInDB, inputValue);
        clearInput();
    }
})

function clearInput()
{
    input.value = "";
}

function addItem(item)
{
    let itemID = item[0];
    let itemVal = item[1];

    let newEl = document.createElement("li");
    
    newEl.addEventListener("click", function(){
        // alert(itemID)
        let exactItem = ref(database, `list/${itemID}`)
        remove(exactItem)
    })

    newEl.textContent = itemVal;
    listEl.append(newEl);
}