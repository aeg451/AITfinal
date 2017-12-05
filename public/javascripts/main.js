//Reference: HOF: https://www.w3schools.com/jsref/jsref_sort.asp
///////////////////////////////////////////////////////////
//DATE SORT
///////////////////////////////////////////////////////////
function convertDate(d) {
  const part = d.split("/");
  return +(part[2]+part[1]+part[0]);
}
asc = true;
document.addEventListener("DOMContentLoaded", date);
  function date() {
    const sortDate = document.getElementById('date');
    sortDate.addEventListener('click', function (evt) {
      evt.preventDefault();
      const tbody = document.getElementById('tb');
      const rows = [].slice.call(tbody.querySelectorAll("tr"));
      if(asc){
        rows.sort(function(a,b) {
          return convertDate(a.cells[1].innerHTML) - convertDate(b.cells[1].innerHTML);
        });
        document.getElementById('date').textContent = 'Date ↑';
        asc = false;
      }
      else{
        rows.sort(function(a,b) {
          return convertDate(b.cells[1].innerHTML) - convertDate(a.cells[1].innerHTML);
        });
        document.getElementById('date').textContent = 'Date ↓';
        asc = true;
      }
      rows.forEach(function(ele) {
          tbody.appendChild(ele);
      });
    });
  }
///////////////////////////////////////////////////////////
//TYPE
///////////////////////////////////////////////////////////
asc1 = true;
document.addEventListener("DOMContentLoaded", type);
  function type() {
    const sortEx = document.getElementById('ty');
    sortEx.addEventListener('click', function (evt) {
      evt.preventDefault();
      const tbody = document.getElementById('tb');
      const rows = [].slice.call(tbody.querySelectorAll("tr"));
      if(asc1){
        rows.sort(function(a,b) {
            if ((a.cells[2].innerHTML) < (b.cells[2].innerHTML)) {
              return -1;
            }
            if ((a.cells[2].innerHTML) > (b.cells[2].innerHTML)) {
              return 1;
            }
        });
        document.getElementById('ty').textContent = 'Type ↑';
        asc1 = false;
      }
      else{
        rows.sort(function(a,b) {
            if ((a.cells[2].innerHTML) > (b.cells[2].innerHTML)) {
              return -1;
            }
            if ((a.cells[2].innerHTML) < (b.cells[2].innerHTML)) {
              return 1;
            }
        });
        document.getElementById('ty').textContent = 'Type ↓';
        asc1 = true;
      }
      rows.forEach(function(ele) {
          tbody.appendChild(ele);
      });
    });
  }
///////////////////////////////////////////////////////////
//DISTANCE SORT
///////////////////////////////////////////////////////////
asc2 = true;
document.addEventListener("DOMContentLoaded", distance);
  function distance() {
    const sortEx = document.getElementById('dis');
    sortEx.addEventListener('click', function (evt) {
      evt.preventDefault();
      const tbody = document.getElementById('tb');
      const rows = [].slice.call(tbody.querySelectorAll("tr"));
      if(asc2){
        rows.sort(function(a,b) {
            if ((a.cells[3].innerHTML) < (b.cells[3].innerHTML)) {
              return -1;
            }
            if ((a.cells[3].innerHTML) > (b.cells[3].innerHTML)) {
              return 1;
            }
        });
        document.getElementById('dis').textContent = 'Distance ↑';
        asc2 = false;
      }
      else{
        rows.sort(function(a,b) {
            if ((a.cells[3].innerHTML) > (b.cells[3].innerHTML)) {
              return -1;
            }
            if ((a.cells[3].innerHTML) < (b.cells[3].innerHTML)) {
              return 1;
            }
        });
        document.getElementById('dis').textContent = 'Distance ↓';
        asc2 = true;
      }
      rows.forEach(function(ele) {
          tbody.appendChild(ele);
      });
    });
  }
///////////////////////////////////////////////////////////
//PACE SORT
///////////////////////////////////////////////////////////
asc3 = true;
document.addEventListener("DOMContentLoaded", pace);
  function pace() {
    const sortEx = document.getElementById('pa');
    sortEx.addEventListener('click', function (evt) {
      evt.preventDefault();
      const tbody = document.getElementById('tb');
      const rows = [].slice.call(tbody.querySelectorAll("tr"));
      if(asc3){
        rows.sort(function(a,b) {
            if ((a.cells[4].innerHTML) < (b.cells[4].innerHTML)) {
              return -1;
            }
            if ((a.cells[4].innerHTML) > (b.cells[4].innerHTML)) {
              return 1;
            }
        });
        document.getElementById('pa').textContent = 'Pace ↑';
        asc3 = false;
      }
      else{
        rows.sort(function(a,b) {
            if ((a.cells[4].innerHTML) > (b.cells[4].innerHTML)) {
              return -1;
            }
            if ((a.cells[4].innerHTML) < (b.cells[4].innerHTML)) {
              return 1;
            }
        });
        document.getElementById('pa').textContent = 'Pace ↓';
        asc3 = true;
      }
      rows.forEach(function(ele) {
          tbody.appendChild(ele);
      });
    });
  }
///////////////////////////////////////////////////////////
//EVENT SORT
///////////////////////////////////////////////////////////
  asc4 = true;
document.addEventListener("DOMContentLoaded", events);
  function events() {
    const sortEx = document.getElementById('evnt');
    sortEx.addEventListener('click', function (evt) {
      evt.preventDefault();
      const tbody = document.getElementById('tb');
      const rows = [].slice.call(tbody.querySelectorAll("tr"));
      if(asc4){
        rows.sort(function(a,b) {
            if ((a.cells[2].innerHTML) < (b.cells[2].innerHTML)) {
              return -1;
            }
            if ((a.cells[2].innerHTML) > (b.cells[2].innerHTML)) {
              return 1;
            }
        });
        document.getElementById('evnt').textContent = 'Event ↑';
        asc4 = false;
      }
      else{
        rows.sort(function(a,b) {
            if ((a.cells[2].innerHTML) > (b.cells[2].innerHTML)) {
              return -1;
            }
            if ((a.cells[2].innerHTML) < (b.cells[2].innerHTML)) {
              return 1;
            }
        });
        document.getElementById('evnt').textContent = 'Event ↓';
        asc4 = true;
      }
      rows.forEach(function(ele) {
          tbody.appendChild(ele);
      });
    });
  }
///////////////////////////////////////////////////////////
//TIME SORT
///////////////////////////////////////////////////////////
asc5 = true;
document.addEventListener("DOMContentLoaded", times);
  function times() {
    const sortEx = document.getElementById('ti');
    sortEx.addEventListener('click', function (evt) {
      evt.preventDefault();
      const tbody = document.getElementById('tb');
      const rows = [].slice.call(tbody.querySelectorAll("tr"));
      if(asc5){
        rows.sort(function(a,b) {
            if ((a.cells[3].innerHTML) < (b.cells[3].innerHTML)) {
              return -1;
            }
            if ((a.cells[3].innerHTML) > (b.cells[3].innerHTML)) {
              return 1;
            }
        });
        document.getElementById('ti').textContent = 'Time ↑';
        asc5 = false;
      }
      else{
        rows.sort(function(a,b) {
            if ((a.cells[3].innerHTML) > (b.cells[3].innerHTML)) {
              return -1;
            }
            if ((a.cells[3].innerHTML) < (b.cells[3].innerHTML)) {
              return 1;
            }
        });
        document.getElementById('ti').textContent = 'Time ↓';
        asc5 = true;
      }
      rows.forEach(function(ele) {
          tbody.appendChild(ele);
      });
    });
  }
///////////////////////////////////////////////////////////
//SEARCH FILTER
///////////////////////////////////////////////////////////
asc6 = true;
document.addEventListener("DOMContentLoaded", exercise);
  function exercise() {
    const sortEx = document.getElementById('exer');
    sortEx.addEventListener('click', function (evt) {
      evt.preventDefault();
      const tbody = document.getElementById('tb');
      const rows = [].slice.call(tbody.querySelectorAll("tr"));
      if(asc6){
        rows.sort(function(a,b) {
            if ((a.cells[7].innerHTML) < (b.cells[7].innerHTML)) {
              return -1;
            }
            if ((a.cells[7].innerHTML) > (b.cells[7].innerHTML)) {
              return 1;
            }
        });
        document.getElementById('exer').textContent = 'Exercised ↑';
        asc6 = false;
      }
      else{
        rows.sort(function(a,b) {
            if ((a.cells[7].innerHTML) > (b.cells[7].innerHTML)) {
              return -1;
            }
            if ((a.cells[7].innerHTML) < (b.cells[7].innerHTML)) {
              return 1;
            }
        });
        document.getElementById('exer').textContent = 'Exercised ↓';
        asc6 = true;
      }
      rows.forEach(function(ele) {
          tbody.appendChild(ele);
      });
    });
  }
///////////////////////////////////////////////////////////
//SEARCH FILTER
///////////////////////////////////////////////////////////
//Reference: HOF: https://stackoverflow.com/questions/43622127/filtering-table-multiple-columns
//https://www.w3schools.com/jsref/jsref_indexof_array.asp HOF
function search(search, id){
  const table = document.getElementById(id);
  const words = search.value.toLowerCase().split(" ");
  for (let i = 1; i < table.rows.length; i++){
     const ele = table.rows[i].innerHTML.replace(/<[^>]+>/g,"");
    let displayStyle = 'none';
    for (let j = 0; j < words.length; j++) {
      if (ele.toLowerCase().indexOf(words[j])>=0){
        displayStyle = '';
      }
      else {
        displayStyle = 'none';
        break;
      }
    }
    table.rows[i].style.display = displayStyle;
  }
}
///////////////////////////////////////////////////////////
//CALORIE CALC
///////////////////////////////////////////////////////////
//A very reaching use of reduce HOF and good use of map HOF
function cals() {
  let age = document.getElementById("age").value;
  let height = document.getElementById("height").value * 2.54;
  let weight = document.getElementById("weight").value / 2.2;
  let resul = 0;
  let BMR
  const numbers = [ height, age, weight ];
  if (document.getElementById("male").checked){
     BMR= numbers.reduce(function(total, curr, index){
       if(index === 0){
           total+= (12.7 * curr);
       }
       if(index === 1){
           total+= (6.8 * curr);
       }
       if(index === 2){
           total+= (6.23 * curr) + 622;
       }
       return total;
     });
  }
 else if (document.getElementById("female").checked){
    BMR= numbers.reduce(function(total, curr, index){
      if(index === 0){
          total+= (4.7 * curr);
        }
      if(index === 1){
          total+= (4.7 * curr);
      }
      if(index === 2){
          total+= (4.35 * curr) + 655;
      }
      return total;
    });
  }
  result = [1.2, 1.375,1.55,1.725,1.9].map( function(num) {
    return Math.round(num * BMR);
  });
  document.getElementById("totalCals").innerHTML ="<u><b>" + result[0] + "</u></b> kcal per day if you are sedentary (little or no exercise)<br><u><b>"
  + result[1] + "</u></b> kcal per day if you are lightly active (light exercise/sports 1-3 days/week)<br><u><b>" 
  + result[2] + "</u></b> kcal per day if you are moderatetely active (moderate exercise/sports 3-5 days/week)<br><u><b>" 
  + result[3] + "</u></b> kcal per day if you are very active (hard exercise/sports 6-7 days a week)<br><u><b>" 
  + result[4] + "</u></b> kcal per day if you are extra active (very hard exercise/sports & physical job or 2x training)<br><u><b>";
}
///////////////////////////////////////////////////////////
//SIGNUP PASSWORD VALIDATION
///////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", signupVal);
function signupVal() {
  const signup = document.getElementById('signupBtn');
      signup.addEventListener('click', function (evt) {
          if((document.getElementsByName('password')[0].value !== document.getElementsByName('confirm_password')[0].value)) {
              evt.preventDefault();
              const s = document.getElementById('signup-err')
              s.innerHTML = "<center>Passwords don't match </center>";
              s.style.color = "red";
          }
    });
}
///////////////////////////////////////////////////////////
//LOGIN VALIDATION
///////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", loginVal);
function loginVal() {
  const login = document.getElementById('loginBtn');
  login.addEventListener('click', function (evt) {
    if( (document.getElementsByName('username')[0].value == "") || (document.getElementsByName('password')[0].value == "") ) {
      evt.preventDefault();
      const s = document.getElementById('login-err');
      s.innerHTML = "<center> Please enter a valid  <br> username and password </center>";
      s.style.color = "red";
    }
 });
}
///////////////////////////////////////////////////////////
//DATE VALIDATION
///////////////////////////////////////////////////////////
/*Referenced:https://stackoverflow.com/questions/33360233/validate-date-to-mm-dd-yyyy-format-in-javascript*/
document.addEventListener("DOMContentLoaded", dateVal);
  function dateVal() {
    const submit = document.getElementById('submitBtn');
    submit.addEventListener('click', function (evt) {
      const reg = /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/;
      const date = document.getElementById('date')
      const M = date.value.match(reg);
      if(!M){
      evt.preventDefault();
        const s = document.getElementById('dateError')
        s.innerHTML = "Invalid date format : mm/dd/yyyy";
        s.style.color = "red";
      }
    });
}