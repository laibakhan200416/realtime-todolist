  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";
  import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js"; 

  const firebaseConfig = {
    apiKey: "AIzaSyDhjWJ6ik57sLRxrO0qEZk5ffDI3VF5Bzg",
    authDomain: "todo-list-4a46a.firebaseapp.com",
    projectId: "todo-list-4a46a",
    storageBucket: "todo-list-4a46a.firebasestorage.app",
    messagingSenderId: "866381434991",
    appId: "1:866381434991:web:b4e11db12a834c1367fd9a",
    measurementId: "G-RRMRQTH202"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
 const db = getDatabase(app);
  const taskInput = document.getElementById("taskInput"); 
  const taskList = document.getElementById("taskList"); 

  window.addTask = () => {     
    let task = taskInput.value.trim();     
    if (task) push(ref(db, "tasks"),  task);     
    taskInput.value = ""; 
}; 
onValue(ref(db, "tasks"), (snapshot) => {     
    taskList.innerHTML = "";     
    let tasks = snapshot.val();     
    if (!tasks) return; 


    let keys = Object.keys(tasks);     
    for (let i = 0; i < keys.length; i++) {         
        let key = keys[i];         
        let li = document.createElement("li"); 

 let btn = document.createElement("button");

li.textContent = tasks[key]; 
 btn.textContent = "Delete"; 
 btn.onclick = () => remove(ref(db, "tasks/" + key));

 li.appendChild(btn); 
taskList.appendChild(li); 
        } 
    }); 


