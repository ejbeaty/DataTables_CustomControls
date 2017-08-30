$(document).ready(function () {
    var table = $('#myTable').DataTable();
    table.CustomControls({
        infoText: '#myCustomInfoText',
        pageLength: '#myCustomPageLength',
        search: "#myCustomSearch"
    });
});
