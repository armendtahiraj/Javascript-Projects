
function createNoteShow(){
    document.getElementById("addNoteContent").style.display='flex';
       document.getElementById("btnAddNote").style.display='none';
}

let shenimet;
const savednoteList = JSON.parse(localStorage.getItem('shenimet'));
if (Array.isArray(savednoteList)) {

    shenimet = savednoteList;

} else {
    
shenimet = [
    {
        tittle: '',
        noteParagraph: '',
        id: '',
        dateTime: ''
    },
];
};


function addnotes(){
    const tittle = document.getElementById("txtNoteTitle").value;
    const note = document.getElementById("txtNoteContent").value;

    const id ="" + new Date().getTime();
    const dTime = new Date();
    const dateTime = dTime.getFullYear()+","+(dTime.getMonth()+1)+","+dTime.getDate()
        +"-"+dTime.getHours()+":"+dTime.getMinutes()+":"
        +dTime.getSeconds();

    shenimet.push({
        tittle: tittle,
        noteParagraph: note,
        id: id,
        dateTime: dateTime,
    });
    notes();
    saveNoteList();
}


function deleteNote(event){
    const btnDeleteNote = event.target;
    const idToDelete  = btnDeleteNote.id;
   
    shenimet = shenimet.filter(function(noteDetail){
       if (noteDetail.id === idToDelete || btnDeleteNote.id === 'undefined') {
           return false
       } else {
           return true
       }
    });
    saveNoteList()
    notes()

};

function saveNoteList(){
    localStorage.setItem('shenimet', JSON.stringify(shenimet));
};

function notes(){
    document.getElementById("noteshere").innerHTML='';

    shenimet.forEach(function(noteDetail){
        let boxnote = document.createElement('div');
        boxnote.className = 'boxnote';
        boxnote.id = noteDetail.id;
        let noteTittle = document.createElement('h3');
        noteTittle.innerText = noteDetail.tittle;
        noteTittle.id = 'notetitle';
        boxnote.appendChild(noteTittle)
    
        let brake = document.createElement('br');
        boxnote.appendChild(brake);
    
        let writednote = document.createElement('p');
        writednote.innerText = noteDetail.noteParagraph;
        writednote.id = 'writednote';
        boxnote.appendChild(writednote)

        let noteFooterAction  = document.createElement("div");
        noteFooterAction.className = 'noteFooterAction'

        let timeNoteCreated = document.createElement('p');
        timeNoteCreated.id = "dateNoteCreated"
        timeNoteCreated.innerText = noteDetail.dateTime;

        let btnDeleteNote = document.createElement('button');
        btnDeleteNote.innerText = 'Delete';
        btnDeleteNote.className = 'bttnDeleteNote';
        btnDeleteNote.id = noteDetail.id;
        btnDeleteNote.onclick = deleteNote;

        noteFooterAction.appendChild(timeNoteCreated)
        noteFooterAction.appendChild(btnDeleteNote)
        boxnote.appendChild(noteFooterAction);

        const noteContanier = document.getElementById("noteshere");
        noteContanier.appendChild(boxnote);
    })

    document.getElementById("addNoteContent").style.display='none';
    document.getElementById("btnAddNote").style.display='block';
    document.getElementById("txtNoteTitle").value='';
    document.getElementById("txtNoteContent").value='';
}
