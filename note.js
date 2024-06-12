const section = document.querySelector(".grand-container");

export default class note {
  constructor(titre, desc, dateg, rad) {
    this._Titre = titre;
    this._Description = desc;
    this._date = dateg;
    this._rad = rad;
    this.clone = document
      .querySelector("#modalTemplate")
      .content.cloneNode(true);
  }

  static fromObject(obj) {
    return new note(obj._Titre, obj._Description, obj._date, obj._rad);
  }

  get Titre() {
    return this._Titre;
  }

  set Titre(newTitre) {
    this._Titre = newTitre;
  }

  get Description() {
    return this._Description;
  }

  set Description(newDesc) {
    this._Description = newDesc;
  }

  get date() {
    return this._date;
  }

  set date(newDate) {
    this._date = newDate;
  }

  get rad() {
    return this._rad;
  }

  set rad(newRad) {
    this._rad = newRad;
  }

  async setNote() {
    const newClone = this.clone.cloneNode(true);
    section.appendChild(newClone);
    const neww = section.lastElementChild;
    neww.querySelector(".para").innerHTML = this._Titre;

    neww.querySelector(".date").value = this._date;
    let couleur;
    if (this.rad[0]) {
      couleur = "#00FF00";
    } else if (this.rad[1]) {
      couleur = "#FFA500";
    } else {
      couleur = "#FF0000";
    }

    // const tri = neww.querySelector(".edit");
    // tri.addEventListener("click", note.actunote);

    neww.querySelector(".ligne").style.borderLeft = " 4px solid " + couleur;

    console.log(neww);
    return Promise.resolve();
  }

  addbtn(index) {
    const modalContaine = document.querySelector(".modal-containe");
    modalContaine.innerHTML += `
        <div class="overlay modal-trigge"></div>
        <div
          class="modal"
          role="dialog"
          aria-labelledby="modalTitle"
          aria-describedby="dialogDesc"
        >
          <button aria-label="close modal" class="close-modal modal-trigge">
            X
          </button>
          <form id="form">
            <div class="prioriter">
              <input
                type="text"
                placeholder="title"
                id="title"
                value="${anis[index].Titre}"
                style="width: 100%; margin-bottom: 5px"
                readonly
              />
              <textarea
                name="description"
                id="description"
                cols="50%"
                rows="8"
                
                style="resize: none"
                placeholder="Description"
                readonly
              >${anis[index].Description}</textarea>
            </div>
  
            <div>
              <div>
                <label for="date">date: </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value="${this.date}"
                  readonly
                />
              </div>
  
              <div class="mydict">
                <div>
                  <p id="ip">importance :</p>
                  <label>
                    <input
                      type="radio"
                      name="radio"
                     
                      class="rad"
                      id="low"
                      readonly
                    />
                    <span>LOW</span>
                  </label>
                  <label>
                    <input type="radio" name="radio" class="rad" id="med"  readonly />
                    <span>MEDIUM</span>
                  </label>
                  <label>
                    <input type="radio" name="radio" class="rad" id="hight"  readonly />
                    <span>HIGHT</span>
                  </label>
                </div>
              </div>
            </div>
            <!-- <label for="check">reed</label>
        <input type="checkbox" name="check" id="check" /> -->
          </form>
        </div>
      `;
    const lowRadio = document.querySelector(`#low`);
    const mediumRadio = document.querySelector(`#med`);
    const highRadio = document.querySelector(`#hight`);

    if (anis[index].rad[0]) {
      lowRadio.checked = true;
    } else if (anis[index].rad[1]) {
      mediumRadio.checked = true;
    } else {
      highRadio.checked = true;
    }

    setTimeout(() => {
      modalContaine.classList.add("active");
    }, 50); // 1000 millisecondes = 1 seconde
    actubtndetails();

    const modalTriggers = document.querySelectorAll(".modal-trigge");

    modalTriggers.forEach((trigger) => {
      trigger.addEventListener("click", () => {
        setTimeout(() => {
          modalContaine.parentNode.removeChild(modalContaine);
          const parentElement = document.querySelector("body");
          const newHTML = '<div class="modal-containe"></div>';
          actubtndetails();
          parentElement.insertAdjacentHTML("afterbegin", newHTML);
        }, 500); // 1000 millisecondes = 1 seconde

        modalContaine.classList.remove("active");
      });
    });
  }
  static async modify(index, ti, de, da) {
    anis[index].Titre = ti;
    anis[index].Description = de;
    anis[index].date = da;
    // anis[index].rad = rad;
  }

  static actunote() {
    function setupEventListeners() {
      let editButtons = document.querySelectorAll(".edit");

      editButtons.forEach((button) => {
        button.removeEventListener("click", handleEditClick);
        console.log("Removed click event listener from button");
        nbr = 0;
      });

      editButtons.forEach((button) => {
        button.addEventListener("click", handleEditClick);
        console.log("Added click event listener to button");
      });
    }

    function handleEditClick(event) {
      if (nbr === 0) {
        const button = event.currentTarget;
        const index = Array.from(document.querySelectorAll(".edit")).indexOf(
          button
        );
        // anis = JSON.parse(localStorage.getItem("notes")) || [];

        console.log("Index du bouton cliqué : " + index);
        togglemodal();

        const modd = document.getElementById("mod");
        if (modalContainer.classList.contains("active"))
          modd.style.display = "inline-block";

        const moddi = document.getElementById("add");
        if (modalContainer.classList.contains("active"))
          moddi.style.display = "none";

        let _titre = document.querySelector("#title");
        let _description = document.querySelector("#description");
        let _date = document.querySelector("#date");

        _titre.value = anis[index].Titre;
        _description.value = anis[index].Description;
        _date.value = anis[index].date;

        modd.addEventListener("click", async () => {
          await note.modify(
            index,
            _titre.value,
            _description.value,
            _date.value
          );
          localStorage.setItem("notes", JSON.stringify(anis));
        });

        // let modifier = document.querySelector("#add");
        // modifier.style.display = "none";

        nbr++;
        console.log(nbr);
      }
    }

    setupEventListeners();
  }

  static deletnote() {
    const dellet = section.querySelectorAll(".deledit");

    dellet.forEach((tri) => {
      tri.removeEventListener("click", tri._clickHandler);
    });

    dellet.forEach((tri) => {
      const clickHandler = () => handleDelete(tri);
      tri._clickHandler = clickHandler;
      tri.addEventListener("click", clickHandler);
    });

    function handleDelete(tri) {
      const index = Array.from(document.querySelectorAll(".edit")).indexOf(tri);
      let aniss = JSON.parse(localStorage.getItem("notes")) || [];

      aniss.splice(index, 1);
      localStorage.setItem("notes", JSON.stringify(aniss));

      const parenttri = tri.parentNode.parentNode;
      gsap.to(parenttri, {
        x: 600,
        duration: 2,
        ease: "power3.out",
        opacity: 0,
        onComplete: () => {
          parenttri.parentNode.remove();
        },
      });

      console.log(index);
      console.log(aniss);
    }
  }
  //   static act() {
  //     const edi = document.querySelectorAll(".edit");

  //     edi.forEach((e) => {
  //       e.removeEventListener("click", handel);
  //     });

  //     edi.forEach((e) => {
  //       e.addEventListener("click", handel);
  //     });

  //     function handel() {}
  //   }
}
