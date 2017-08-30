
/*! CellEdit 1.0.19
 * ©2017 Elliott Beaty - datatables.net/license
 */

/**
 * @summary     DataTables CustomControls
 * @description Allows enhanced customization of DataTables.net pagelength and table info placement
 * @version     1.0.0
 * @file        dataTables.customControls.js
 * @author      Elliott Beaty
 * @contact     elliott@elliottbeaty.com
 * @copyright   Copyright 2017 Elliott Beaty
 *
 * This source file is free software, available under the following license:
 *   MIT license - http://datatables.net/license/mit
 *
 * This source file is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
 *
 * For details please refer to: http://www.datatables.net
 */

jQuery.fn.dataTable.Api.register('CustomControls()', function (settings) {
    var table = this.table();

    // Destroy
    if (settings === "destroy") {
        $(table.body()).off("click", "td");
        table = null;
    }

    if (table != null) {
        drawAll();

        table.on('page.dt length.dt search.dt ejb_pagination', function () {
            drawInfoText();
            drawPageLength();
        });

        

        function drawAll() {
            drawInfoText();
            drawPageLength();
            drawSearch()
        }
        function drawInfoText() {
            var recordsDisplayed = table.page.info().length;
            var recordsFound = table.page.info().recordsDisplay;

            if (recordsDisplayed > recordsFound || recordsDisplayed < 0) {
                recordsDisplayed = recordsFound;
            }

            var setting = getInfoTextSetting();

            var infoText = setting.text.replace('{recordsDisplayed}', recordsDisplayed);
            var infoText = infoText.replace('{recordsFound}', recordsFound);

            var target = setting.target;
           
            $(target).html(infoText); 
        }
        function drawPageLength() {
            
            var pageLength = table.settings().page.len();

            var lengthMenu = $(table).dataTable().context[0].aLengthMenu;
            
            // When we have a two-dimensional array it means we have a set of display values and a set of actual values (basically it contains "All"/-1).
            // otherwise, we assume it's a one-dimensional array containing one set of values representing both and we need to convert it
            // to a two dimensional array for consistency in the for loop below
            if (typeof lengthMenu[0] !=='object') {
                lengthMenu = [ lengthMenu, lengthMenu ]
            }
            var setting = getPageLengthSetting();

            var optionClass = setting.optionClass;

            var html = '';
            for (var i = 0; i < lengthMenu[0].length; i++) {
                var value = lengthMenu[0][i];
                var display = lengthMenu[1][i];
                
                if (lengthMenu[0][i] == pageLength) {
                    html = html + '<option selected="selected" class="' + optionClass +'" value="' + value + '">' + display + '</option>';
                } else {
                    html = html + '<option class="' + optionClass +'" value="' + value + '">' + display + '</option>';
                }
            }

            var target = setting.target;
            
            if ($(target).length > 0) {
               
                var elementType = $(target).prop('nodeName').toLowerCase();
                if (elementType !== 'select') {
                    throw "The DataTables pageLength.target must be a SELECT element"
                }
                $(target).html(html);
                $(target).on('change', function () {
                    var newPageLength = $(this).val();
                    table.page.len(newPageLength).draw();
                });
            }
            
        }
        function drawSearch() {

            var setting = getSearchSetting();
            var target = setting.target;

            if ($(target).length > 0) {

                $(target).on('keyup input propertychange', function () {
                    table.search($(this).val()).draw();
                });
            }

        }
       

        
    }
    function getInfoTextSetting() {
        var infoTextSetting = {
            target: '',
            text: 'Displaying {recordsDisplayed} of {recordsFound} records.'
        }
        if (typeof settings !== 'undefined' && typeof settings.infoText !== 'undefined') {

            // If only target was given
            if (typeof settings.infoText === 'string') {
                infoTextSetting.target = settings.infoText;
                return infoTextSetting;
            }

            // If object was given
            // Target
            if (typeof settings.infoText.target === 'string') {
                infoTextSetting.target = settings.infoText.target;
            }
            // Text Template
            if (typeof settings.infoText.text === 'string') {
                infoTextSetting.text = settings.infoText.text;
            }
        }

        return infoTextSetting;

    }

    function getPageLengthSetting() {
        var pageLengthSetting = {
            target: '',
            optionClass: ''
        }
        if (typeof settings !== 'undefined' && typeof settings.pageLength !== 'undefined') {

            // If only target was given
            if (typeof settings.pageLength === 'string') {
                pageLengthSetting.target = settings.pageLength;
                return pageLengthSetting;
            }

            // If object was given
            // Target
            if (typeof settings.pageLength.target === 'string') {
                pageLengthSetting.target = settings.pageLength.target;
            }

            // CSS Class
            if (typeof settings.pageLength.optionClass === 'string') {
                pageLengthSetting.optionClass = settings.pageLength.optionClass;
            }
        }
        return pageLengthSetting;
    }

    function getSearchSetting() {
        var searchSetting = {
            target: ''
        }
        if (typeof settings !== 'undefined' && typeof settings.search !== 'undefined') {

            // If only target was given
            if (typeof settings.search === 'string') {
                searchSetting.target = settings.search;
                return searchSetting;
            }

            // If object was given
            // Target
            if (typeof settings.search.target === 'string') {
                searchSetting.target = settings.search.target;
            }
        }
        return searchSetting;
    }

    function getPaginationSetting() {
        var searchSetting = {
            target: ''
        }
        if (typeof settings !== 'undefined' && typeof settings.pagination !== 'undefined') {

            // If only target was given
            if (typeof settings.search === 'string') {
                searchSetting.target = settings.pagination;
                return searchSetting;
            }

            // If object was given
            // Target
            if (typeof settings.pagination.target === 'string') {
                searchSetting.target = settings.search.target;
            }
        }
        return searchSetting;
    }
});