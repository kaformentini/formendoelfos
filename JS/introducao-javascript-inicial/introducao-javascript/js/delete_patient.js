const patientsList = document.querySelectorAll(".paciente");
// console.log(patients)
// patientsList.forEach(function(patient){
//     patient.addEventListener("dblclick", function(){
//         this.remove()
//     })
// })

const tablePatientList = document.querySelector("table");
console.log(tablePatientList);

tablePatientList.addEventListener("dblclick", function(event){
  event.target.parentNode.remove();
// console.log("aqui");

});
