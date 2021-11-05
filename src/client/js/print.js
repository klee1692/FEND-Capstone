// Add functionality to print PDF

function printDiv() {

    var printContent = document.getElementById("printable");
    var WinPrint = window.open('', '', 'height=800,width=600');
    WinPrint.document.write(printContent.innerHTML);
    WinPrint.document.close();
    WinPrint.print();

}

export {
    printDiv
}