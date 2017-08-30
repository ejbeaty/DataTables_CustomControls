# DataTables CustomControls
##### A plugin for [DataTables.net](https://datatables.net) 
## Overview
This plugin allows you to easily customize the default [DataTable](https://datatables.net/) table information, page length, and search controls. 

## Usage
### CustomControls(settings);
##### Settings { JSON Object  }
Property | Type | Default | Example | Details  
:------ | :------ | :------ | :-----| :------
**infoText**  _(optional)_| object or string  | none | ```{ "target": "#someElementSelector", "text":"'Displaying {recordsDisplayed} of {recordsFound} records'"}``` | Specifies the element(s) where the text should appear (using jQuery .val()) and the desired text. {recordsDisplayed} and {recordsFound} will be replaced with the corresponding values. Alternatively, just the selector can be provided here: ```infoText:"#someElement"```
**pageLength** _(optional)_| object or string | none | ```{ "target": "#someElementSelector", "optionClass":"myCssClass"}``` | Specifies the ```<list>``` element(s) that should be bound to the DataTable table length and the css class that should be applied to the ```<option>``` elements.
**search** _(optional)_| string | none |```#myCustomSearch```| The element selector to identify the input that should be bound to the table search.

### Basic Initialization
```javascript
    var table = $('#myTable').DataTable();

    table.CustomControls({
        infoText: '#myCustomInfoText',
        pageLength: '#myCustomPageLength',
        search: '#myCustomSearch''
    });
```
### Advanced Initialization
```javascript
    var table = $('#myAdvancedTable').DataTable({
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
        search: '#myCustomSearch'
    });
```
##### Destroy
If you need to **[destroy](https://datatables.net/reference/api/destroy())** a table and then reinitialize it, you'll need to destroy the CustomControls configuration as well. You can do this by passing "destroy" to the method. An example of this can be found in the advanced example.
```javascript
	table.CustomControls("destroy");
```
