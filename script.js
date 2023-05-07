!(readyToRun)
let infoMatrix=[];
let deletedIndex=[];
let inputInfo={};

function readyToRun(event) {
    createObject();
    //listener for remove buttons
    $('table').on('click', 'button', removeFromMatrix)
}

function createObject(event) {
    let firstName = $('#firstName').val(), lastName = $('#lastName').val(), idNumber= $('#idNumber').val(), titleInput = $('#titleInput').val(), annualSalary = $('#annualSalary').val();
    if(firstName===""||lastName===""||idNumber===""||titleInput===""&&annualSalary===""){
        alert("fields empty, please resubmit");
            return;
        }
    inputInfo={
        firstName: firstName, 
        lastName: lastName,
        id: idNumber,
        title: titleInput,
        annualSalary: annualSalary,
    };
    infoMatrix.push(inputInfo);
    console.log(infoMatrix);
    updateMonthly();
    addToMatrix();
    $('#firstName').val("");
    $('#lastName').val("");
    $('#idNumber').val("");
    $('#titleInput').val("");
    $('#annualSalary').val("");
}


function addToMatrix() {
    //attempt 1
    // !("#tableStuff").append(<tr></tr>)
    // for(let x of infoMatrix) {
    //     !("#tableStuff").append(<tr></tr>)
    // }

    //attempt 2
    // let tempTable
    // for(let x of infoMatrix) {
    //     tempTable = $('<table>').addClass(x.firstName);
    //     console.log(tempTable)
    //     for(let y in infoMatrix) {
    //         let row = $('<tr>').addClass('sameTable').text(x.y);
    //         tempTable.append(row);
    //     }
    // }
    // console.log(tempTable)

    // $('#tableStuff').append(tempTable);

    //attempt 3
    // $("table").append(
    //     `<tr class=`+infoMatrix[infoMatrix.length-1].id+`>
    //         <div class="deletableRow">
    //             <td>`+infoMatrix[infoMatrix.length-1].firstName+`</td>
    //             <td>`+infoMatrix[infoMatrix.length-1].lastName+`</td>
    //             <td class="identifierTag">`+infoMatrix[infoMatrix.length-1].id+`</td>
    //             <td>`+infoMatrix[infoMatrix.length-1].title+`</td>
    //             <td>$`+infoMatrix[infoMatrix.length-1].annualSalary+`</td>
    //             <td>
    //                 <button type="button" id=`+String(infoMatrix[infoMatrix.length-1].id)+` onclick="removeFromMatrix()">Delete</button>
    //             </td>
    //         </div>
    //     </tr>`
    // )
    
    // console.log(infoMatrix[infoMatrix.length-1].id) //this is the ID number
    // $(`#${String(infoMatrix[infoMatrix.length-1].id)}`).data(infoMatrix[infoMatrix.length-1].indexNumber, infoMatrix[infoMatrix.length-1].indexNumber);
    // let dataStored = $(`#${String(infoMatrix[infoMatrix.length-1].id)}`).data()
    // console.log(dataStored);


    $('#tableStuff').empty();
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
    let calculatedTotal=0
    for (let x of infoMatrix) {
        calculatedTotal+=x.annualSalary/12;
    }
    $('.monthlyTotal').empty();
    $('footer').append(' <div class="monthlyTotal">'+calculatedTotal+'</div>');
    if (calculatedTotal>20000) {
        $('.gridded').parent().css('background-color', 'red').css('color', 'white')
    } else {
        $('.gridded').parent().css('background-color', 'green')
    }
}


function removeFromMatrix(event) {

    event.preventDefault();

    // let indexOfDeletion = $(this).data();
    // console.log(indexOfDeletion);

    // for(let x of infoMatrix) {
    //     if ($(this).hasClass(x.id)) {
    //         console.log('YAUS')
    //     }
    // }
    let updateTotal = $(this).closest("tr").children("td.identifierTag").text();
    console.log(updateTotal);

    let infoMatrixTemporary=[];
    //need to identify row to be removed
    // let rowNumber=$(this).attr('id');
    // console.log(rowNumber);
    for (let x of infoMatrix) {
    //need to grab class name of row and replace "1"
        if (!(x.id===updateTotal)) {
                infoMatrixTemporary.push(x);
            }
        }
    infoMatrix=infoMatrixTemporary;
    console.log(infoMatrix);
    // $(this).parent().parent().remove();

    updateMonthly();
    addToMatrix();
}


