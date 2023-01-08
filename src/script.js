const addBtn = document.querySelector('.add-notes');
const newNotes = document.querySelector('.enter-notes');
const notesBody = document.querySelector('.body');
const notesTitle = document.querySelector('.title');

const months = ["January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"];

const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdate = false, updateId;

function showNotes(){
    document.querySelectorAll('.note').forEach(note => note.remove());
    notes.forEach((note) => {
        let containerTag = `<div class="note">
                            <div class="note-title">${note.title}</div>
                            <div class="note-body">${note.body}</div>
                            <div class="bottom-content">
                                <div class="note-date">${note.date}</div>
                                <div class="settings">
                                    <button class="edit" onclick="editNote()">edit</button>
                                    <button class="delete" onclick="deleteNote()">delete</button>
                                </div>
                            </div>
                        </div>`
        addBtn.insertAdjacentHTML('afterend', containerTag);
    })
}

showNotes();

function addNotes(){
    var titleInput = notesTitle.value;
    var bodyInput = notesBody.value;
    
    if (titleInput == '' && bodyInput == ''){
        alert('Enter notes');
    }

    else {
        var dateObj = new Date(),
        month = months[dateObj.getMonth()],
        day = dateObj.getDay(),
        year = dateObj.getFullYear();

        var noteInfo = {
            title: titleInput,
            body: bodyInput,
            date: `${month} ${day}, ${year}`
        }

        notes.push(noteInfo);

        showNotes();

        notesTitle.value = '';
        notesBody.value = '';
    }
}


function editNote(){

}


function deleteNote(noteId){
    let confirmDel = confirm("Are you sure you want to delete this note?");
    if(!confirmDel) return;
    notes.splice(noteId, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
}