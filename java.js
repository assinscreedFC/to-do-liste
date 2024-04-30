const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");
const titre = document.querySelector("#title");
const description = document.querySelector("#description");
const date = document.querySelector("#date");
const radio = document.querySelectorAll(".rad");
const section = document.querySelector(".grand-container");
modalTriggers.forEach((trigger) =>
  trigger.addEventListener("click", () => togglemodal())
);

function togglemodal() {
  modalContainer.classList.toggle("active");
}

class note {
  constructor(titre, desc, dateg, rad) {
    this.Titre = titre;
    this.Description = desc;
    this.date = dateg;
    this.rad = rad;
    this.clone = document
      .querySelector("#modalTemplate")
      .content.cloneNode(true);
  }

  setNote() {
    const newClone = this.clone.cloneNode(true);
    section.appendChild(newClone);
    const neww = section.lastElementChild;
    neww.querySelector(".para").innerHTML = this.Titre;
    // neww.querySelector("#description").innerHTML = this.Description;
    neww.querySelector(".date").value = this.date;
    // neww.querySelector(".rad").innerHTML = this.rad;
    console.log(neww);
  }
}

const form = document.getElementById("form");
const submit = document.getElementById("details");
submit.addEventListener("submit", (e) => e.preventDefault());
form.addEventListener("submit", (e) => {
  e.preventDefault();
  // radio = radio.filter((r) => r.checked);
  console.log(radio[0].value);
  console.log(date.value);
  anis = new note(titre.value, description.value, date.value, radio[0].checked);
  anis.setNote();
});
