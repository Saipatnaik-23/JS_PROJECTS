let createButton = document.querySelector(".create_btn");
let notes = document.querySelector(".notes");
let content = document.querySelector(".content");
let deleteBtn = document.querySelector("#delete_btn");

function saveNotes()
{
    let textArea=document.querySelectorAll(".notes_body textarea");
    console.log(textArea);
    let data=[];
    textArea.forEach((note) => {
        data.push(note.value)
    });
    console.log(data);

  
    if(data.length===0)
    {
        localStorage.removeItem("note")
    }
    else
    {
        localStorage.setItem("note",JSON.stringify(data));//save to local storage
    }
}
createButton.addEventListener("click", () => {
    // console.log("clicked");
    // content.style.opacity=1;
    notesUpdate();
})
function notesUpdate(text=" ") {
    let bodyNote = document.createElement("div");
    bodyNote.classList.add("notes_body");
    bodyNote.innerHTML = `
            <div class="notes_body">
                   <div class="top_of_notes">
                       
                       <i class="fa-solid fa-trash" id="delete_btn"></i>
                       <i class="fa-solid fa-check" id="save_btn"></i>
                   </div>
               <div class="text_area">
                     <textarea placeholder="Enter your notes">${text}</textarea>
               </div>
            </div>
                       `
    content.appendChild(bodyNote);
    let deletBtn=bodyNote.querySelector("#delete_btn");
    deletBtn.addEventListener("click",()=>
    {
        bodyNote.remove();//removing the notes
        saveNotes();
    })
    let saveBtn = bodyNote.querySelector("#save_btn");

    saveBtn.addEventListener("click", () => {
        console.log("saved");
        saveNotes();
    })
    saveNotes();
}
function showLs()
{
    let lsNote=JSON.parse(localStorage.getItem("note"));
    if (lsNote === null) {
       notesUpdate()
    }else
    {
        lsNote.forEach((lsnotes)=>
        {
            notesUpdate(lsnotes);
        })
    }
   
}
showLs();