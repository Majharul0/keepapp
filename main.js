const addBtn = document.getElementById("add_btn");
const placeItem = document.querySelector(".body");
const epmtyC = document.getElementById("eptCheck");

const updateOnLS = () =>{

const allText = document.querySelectorAll("#textarea");
const notes = [];

allText.forEach((sText)=>{
return notes.push(sText.value);
});

localStorage.setItem("notes", JSON.stringify(notes));

}

//adding item on body
function addingNote(text = "") {
    const noteBox = document.createElement('div');
    const boxData = `
        <textarea readonly class="onlyRead ${text ? "":"dNone"}"  id="onlyRead" ></textarea>
        <textarea class="${text ? "dNone":""}"  id="textarea"   ></textarea>
        <hr>
        <section class="edit_section">
            <button id="editBtn"><i class="far fa-edit"></i></button>
            <button id="delBtn"><i class="far fa-trash-alt"></i></button>
            <p>You Can Edit & Del Also.</p>

        </section>
    `;
    noteBox.insertAdjacentHTML("afterbegin", boxData);



    //getting button by ID.    
    const delBtn = noteBox.querySelector("#delBtn");
    const editBtn = noteBox.querySelector("#editBtn");
    const onlyRead = noteBox.querySelector("#onlyRead");
    const textArea = noteBox.querySelector("#textarea");


    //Delete Each Item by Clicking Delete Btn
    delBtn.addEventListener('click', function () {
        noteBox.remove();
        updateOnLS()
        toggleEmpty();
    });

    textArea.value = text;
    onlyRead.textContent = text;

    editBtn.addEventListener('click',() =>{
        onlyRead.classList.toggle("dNone");
        textArea.classList.toggle("dNone");

    })
    textArea.addEventListener('change',() =>{
        const value = textArea.value;
        onlyRead.innerHTML = value;

        updateOnLS();
    });
    
    
    placeItem.appendChild(noteBox);
    epmtyC.classList.add("dNone");

}

const notes = JSON.parse(localStorage.getItem("notes"));
if(notes){notes.forEach((note)=> addingNote(note))} 

addBtn.addEventListener('click',() =>{
addingNote();
});



function toggleEmpty(){
if(placeItem.childNodes.length < 6){
    epmtyC.classList.remove("dNone");
}
}

