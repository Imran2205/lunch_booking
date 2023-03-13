//disabling the Date picker
let today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();
let time = yyyy + '-' + mm + '-' + dd;

// $('#date_picker').attr('min',time);
// $('#date_picker').attr('max',time);
let tomorrow=today.setDate(today.getDate() + 1);

//variable Declaration
const checkbox=document.getElementById('lunch-book');
// const submitBtn=document.querySelector('#submit');
const url="https://script.google.com/macros/s/AKfycbxcpAF-fIojeuM6W55PFBC18kYd7QBASlb_QgvEeycG82x9nglJ6Hj9NEtKvYhH6I7jBQ/exec";
const downloadSection=document.querySelector('#date-picker-container');
const downloadBtn=document.querySelector('.btn');
const statement=document.querySelector('#booking-statement');
let selectedDate=document.querySelector('#booking-date');
const regnum = document.getElementById("radio-1");
const regnum2= document.getElementById("radio-3");

// let tbody=document.getElementById('table-body');
// submitBtn.addEventListener('click',postData);
downloadBtn.addEventListener('click',downloadData);


checkbox.addEventListener("change",postData)

function downloadData(e){
    //date and location selection from input and get the data people who booked lunch
    // let selectedDate=document.getElementById('booking-date');
    let dates=selectedDate.innerHTML.split("/")
    let newDate=dates[1]+"/"+dates[0]+"/"+dates[2];
    let date=new Date(newDate);
    date=date.getDate();
    console.log(date)
    e.preventDefault();
    let lRegnum=regnum.checked;
    const selectedLocation =lRegnum?"Regnum":"DOHS";
    //post request paraameters
    let lunchDict={download:'T',date:date,location:selectedLocation};
    let options={
        method:"POST",
    }
    //download reqeust from the database for a particular date and location
    let qs=new URLSearchParams(lunchDict);
    lunchData=fetch(`${url}?${qs}`,options)
    .then(res => res.json())
    .then(resp => {
        bookingData=[]
        let lunchData=resp['lunchData'];
        // table creation in html <can be ignored>//
        lunchData.forEach(element => {
            bookingData.push([element['id'],element['name'],"___"])
        });

        console.log(lunchData);
        generatePdf(bookingData)
        return resp
    })
    .catch(err => console.error(err));
}

//update data on the database as per request of the user
function postData(e){
    e.preventDefault();
    //locatioin selection
    let lRegnum=regnum.checked;
    const selectedLocation =lRegnum?"Regnum":"DOHS";
    let status=checkbox.checked?"Y":"N";
    let dateDict={email:cookie_email,status:status,location:selectedLocation};
    // console.log(dateDict);
    let qs=new URLSearchParams(dateDict);
    let options={
        method: "POST"
    }
    fetch(`${url}?${qs}`,options)
        .then(res => res.json())
        .then(resp => console.log(resp))
        .catch(err => console.error(err));
}


// get request to check if the user is admin or not
let dateCheck= fetch(url+"?email="+cookie_email)
.then(r=>r.json())
.then( r=>{
    r=JSON.parse(r)
    console.log(r);
    console.log(r['userType']);
    let userType=(r['userType']);
    if (userType=="Admin"){
      downloadSection.style['display']='inline-block';
    }

    if (r['status']=="Y" ){
        // statement.innerHTML="Already Booked";
        // console.log(checkbox.value)
        checkbox.checked = true;

    }
    return r
})

    // var dateString = tomorrow.toLocaleDateString();
    // var dateElement = document.getElementById("date");
    // dateElement.innerHTML = dateString;
function generatePdf(elements){

    //Convert Table to PDF.
    var doc = new jsPDF("p","pt")
    // Supply data via script
    // var res = doc.autoTableHtmlToJson(document.getElementById("table"));
    // console.log(res);
    // generate auto table with body
    console.log(elements)
    var y = 10;
    doc.setLineWidth(2);
    doc.setFont("helvetica");
    doc.setFontType("bold");
    doc.setFontSize(25);
    let title="Lunch Booking Data";
    doc.text(10, y = y + 30, title);

    doc.autoTable({
        columns:["ID","Name","__"],
        body: elements,
        startY: 70,
        theme: 'grid',
        // styles: { fontSize: 20 }

    })
    // save the data to this file
    doc.save((new Date()).toDateString());


}
