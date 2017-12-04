function validatedate(dateInput){
  const format = /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/;
  if(dateInput.value.match(format)){
    document.create.date.focus();
    const slashSplit = dateInput.value.split('/');
    const dashSplit = dateInput.value.split('-');
    if (slashSplit.length > 1){
      const x = slashSplit;
    }
    else if (ashSplit.length > 1){
      const x = dashSplit;
    }
    const mm  = parseInt(x[0]);
    const dd = parseInt(x[1]);
    const yy = parseInt(x[2]);
    const ListofDays = [31,28,31,30,31,30,31,31,30,31,30,31];
    if (mm == 1 || mm > 2){
      if (dd > ListofDays[mm - 1]){
        alert('Invalid date format!');
        return document.getElementById("dateError").innerHTML = "Invalid date format!";
      }
    }
    if (mm == 2){
      const year = false;
      if ( (!(yy % 4) && yy % 100) || !(yy % 400)) {
        year = true;
      }
      if ((year == false) && (dd >= 29)){
        alert('Invalid date format!');
        return document.getElementById("dateError").innerHTML = "Invalid date format!";
      }
      if ((year == true) && (dd > 29)){
        alert('Invalid date format!');
        return document.getElementById("dateError").innerHTML = "Invalid date format!";
      }
    }
  else{
    alert("Invalid date format!");
    document.create.date.focus();
    return document.getElementById("dateError").innerHTML = "Invalid date format!";
  }
}
}

