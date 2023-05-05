!(readyToRun)
let infoMatrix=[];


function readyToRun() {
    let inputInfo={};
    function createObject() {
        inputInfo={
            firstName: $('#firstName').val(), 
            lastName: $('#lastName').val(),
            id: $('#idNumber').val(),
            title: $('#titleInput').val(),
            annualSalary: $('#annualSalary').val()
        };
        infoMatrix.push(inputInfo);
        console.log(infoMatrix);
        addToMatrix();
        updateMonthly();
    }
    createObject();

    

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
    }

    function updateMonthly() {
        let calculatedTotal=0
        for (let x of infoMatrix) {
            calculatedTotal+=x.annualSalary/12;
        }
        $('.monthlyTotal').empty();
//need to put js calculated total into this div
        $('footer').append(' <div class="monthlyTotal">calculatedTotal</div>');
    }









}