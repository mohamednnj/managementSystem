let menu = document.getElementsByClassName("menu")[0];
let main = document.getElementsByClassName("main")[0];
// menu.addEventListener("mouseover", ()=>{
//   if(document.body.width < 800) {}
//   main.style.cssText = 'width:calc(100vw - 252px);'
// })
// menu.addEventListener("mouseout", ()=>{
//   main.style.cssText = 'width:calc(100vw - 78px); '
// })


let t = document.getElementsByTagName("tbody")[0];
for(let i=0;i<10;i++) {
  let el = document.createElement("tr")
  el.innerHTML = `
        <td>Product ${i + 1}</td>
        <td>$30.${i * 2}</td>
        <td>${i * 5 / 3}</td>
      `;
  t.appendChild(el);
}

