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
    let couleur;
    if (radio[0].checked) {
      couleur = "#00FF00";
    } else if (radio[1].checked) {
      couleur = "#FFA500";
    } else {
      couleur = "#FF0000";
    }

    neww.querySelector(".ligne").style.borderLeft = " 4px solid " + couleur;
    // neww.querySelector("#details").classList.add("addbook");
    // neww.querySelector("#details").classList.add("modal-btn");
    // neww.querySelector("#details").classList.add("modal-trigger");
    // neww.querySelector(".rad").innerHTML = this.rad;
    console.log(neww);

    this.addbtn(neww);
  }

  addbtn(neww) {
    const btn = neww.querySelector(".modal-trigger");

    btn.addEventListener("click", () => togglemodal());
  }
}

const form = document.getElementById("form");
const submit = document.getElementById("add");
submit.addEventListener("submit", (e) => e.preventDefault());
form.addEventListener("submit", (e) => {
  e.preventDefault();
  togglemodal();
  // radio = radio.filter((r) => r.checked);
  console.log(radio[0]);
  console.log(date.value);
  anis = new note(titre.value, description.value, date.value, radio);
  anis.setNote();
});

function togglemodal() {
  modalContainer.classList.toggle("active");
}
