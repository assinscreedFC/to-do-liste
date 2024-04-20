const button=document.querySelector("button");
button.addEventListener('click',()=>{
let input=document.querySelector("input");
const text=input.value;
if(text===""){alert("Please enter a valid number!");}else{
    const ul=document.querySelector("ul");
    const li=document.createElement("li");
    li.innerHTML=`${text}  <button id="${ul.childElementCount}">Supprimer</button>`;
    li.id=ul.childElementCount;
    //ul.innerHTML=`<li class="${ul.childElementCount}">Item 1 <button class="${ul.childElementCount}">Supprimer</button></li>`;
    ul.appendChild(li);
    input.value="";
    console.log(ul.childNodes);
   
const buttonUl=document.querySelectorAll("ul button");
            buttonUl.forEach( btn=>remove (btn));
}
} );
const ul=document.querySelector("ul");
const buttonUl=document.querySelectorAll("ul button");
            buttonUl.forEach( btn=>remove (btn));
function remove(btn) {
    console.log(btn);
    btn.addEventListener("click", (e)=> {
        let i = e.target.id;
       let  li=document.getElementById(`${i}`);
       
       ul.removeChild(li);
       
       });
    
} ;