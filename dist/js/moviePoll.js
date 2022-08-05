const options = document.querySelectorAll("#poll-form > label");
for (let i = 0; i < options.length; i++) {
  options[i].addEventListener("click", ()=>{
    for (let j = 0; j < options.length; j++) {
      if(options[j].classList.contains("selected")){
        options[j].classList.remove("selected");
      }
    }

    options[i].classList.add("selected");
    for (let k = 0; k < options.length; k++) {
      options[k].classList.add("selectall");
    }

    let forVal = options[i].getAttribute("for");
    let selectInput = document.querySelector("#"+forVal);
    let getAtt = selectInput.getAttribute("type");
    if(getAtt == "checkbox"){
      selectInput.setAttribute("type", "radio");
    }else if(selectInput.checked == true){
      options[i].classList.remove("selected");
      selectInput.setAttribute("type", "checkbox");
    }

    let array = [];
    for (let l = 0; l < options.length; l++) {
      if(options[l].classList.contains("selected")){
        array.push(l);
      }
    }
    if(array.length == 0){
      for (let m = 0; m < options.length; m++) {
        options[m].removeAttribute("class");
      }
    }
  });
}
// to do find parent div with class = fiveToOne
const starLabels = document.querySelectorAll(".fiveToOne > label");
for (let i = 0; i < starLabels.length; i++) {
  starLabels[i].addEventListener("click", (evt)=>{
    console.log("starLabelsClicked",evt.target.parentNode.querySelectorAll("label"));
    for (let j = 0; j < starLabels.length; j++) {
      if(starLabels.contains("selected")){
        starLabels.remove("selected")
      }
}})
};

// handle lable click here
// evt selected