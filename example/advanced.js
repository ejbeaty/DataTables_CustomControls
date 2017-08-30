var table;
$(document).ready(function () {
    table = $('#myAdvancedTable').DataTable({
        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
        "dom":"tp"
    });
    table.CustomControls({
        infoText: {
            target: '#myCustomInfoText',
            text: 'I am showing {recordsDisplayed} of {recordsFound} records with customized text.'
        },
        pageLength: {
            target: '#myCustomPageLength',
            optionClass: 'myCssClass'
        },
        search: "#myCustomSearch"
    });
});

function destroyTable() {
    if ($.fn.DataTable.isDataTable('#myAdvancedTable')) {
        table.destroy();
        table.CustomControls("destroy");
    }
}