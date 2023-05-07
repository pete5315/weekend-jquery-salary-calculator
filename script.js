$(readyToRun)
//initialize array to store information
let infoMatrix=[];
//initialize object to store most recent information  
let inputInfo={}; 

function readyToRun() {
    //event handlers for buttons
    $('table').on('click', 'button', removeFromMatrix);
    $('buttonBox').on('click', '#inputButton', createObject);
}

function createObject() {
    //save data as variables
    let firstName = $('#firstName').val(), lastName = $('#lastName').val(), idNumber= $('#idNumber').val(), titleInput = $('#titleInput').val(), annualSalary = $('#annualSalary').val();
    //test if any fields were blank
    if(firstName===""||lastName===""||idNumber===""||titleInput===""||annualSalary===""){
        alert("Field(s) empty, please resubmit");
        return;
    }
    //test if ID has already been added]
    for(let x of infoMatrix) {
        if(x.id===idNumber) {
            alert("This ID has already been added, please resubmit");
            return;
        }
    }
    //update our temporary object to hold inputted data
    inputInfo={
    firstName: firstName, 
    lastName: lastName,
    id: idNumber,
    title: titleInput,
    annualSalary: annualSalary,
    };
    //add our new object to the global array
    infoMatrix.push(inputInfo);
    //update the monthly salary total on the DOM
    updateMonthly();
    //update the table on the DOM
    addToMatrix();
    //reset the form
    $('#firstName').val("");
    $('#lastName').val("");
    $('#idNumber').val("");
    $('#titleInput').val("");
    $('#annualSalary').val("");
}

function addToMatrix() {
    //empty the table
    $('#tableStuff').empty();
    //loop through objects, adding each one to the DOM
    for (let x of infoMatrix) {
        $("#tableStuff").append(
            `<tr class=`+x.id+`>
                <div class="deletableRow">
                    <td>`+x.firstName+`</td>
                    <td>`+x.lastName+`</td>
                    <td class="identifierTag">`+x.id+`</td>
                    <td>`+x.title+`</td>
                    <td>$`+x.annualSalary+`</td>
                    <td>
                        <button type="button" id=`+x.id+` onclick="removeFromMatrix()">Delete</button>
                    </td>
                </div>
            </tr>`
        )
    }

}

function updateMonthly() {
    //initialize variable that will tally total
    let calculatedTotal=0;
    //loop through objects adding their monthly salary
    for (let x of infoMatrix) {
        calculatedTotal+=x.annualSalary/12;
    }
    //remove old monthly total from the DOM
    $('.monthlyTotal').empty();
    //add new monthly total to the DOM
    $('footer').append(' <div class="monthlyTotal">'+calculatedTotal+'</div>');
    //CSS styling based on whether we are under budget or over budget
    if (calculatedTotal>20000) {
        $('.gridded').parent().css('background-color', 'red').css('color', 'white');
    } else {
        $('.gridded').parent().css('background-color', 'green');
    }
}

function removeFromMatrix(event) {
    //throws a non-fatal error but is necessary for functionality
    event.preventDefault();
    //initalize a variable and set it equal to the ID number of the 
    //row of the table that will be removed
    let updateTotal = $(this).closest("tr").children("td.identifierTag").text();
    //initialize a temporary array that will store the objects not being removed
    let infoMatrixTemporary=[];
    //loop through the objects and add any to the temporary array
    //that do no correspond to the ID of the row to be removed
    for (let x of infoMatrix) {
        if (!(x.id===updateTotal)) {
            infoMatrixTemporary.push(x);
        }
    }
    //update the global array to match the temporary one
    infoMatrix=infoMatrixTemporary;
    //update the monthly total on the DOM to not include the removed data
    updateMonthly();
    //update the table on the DOM to not include the removed data
    addToMatrix();
}