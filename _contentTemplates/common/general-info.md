#event-callback-can-be-async
>tip The event is an `EventCallback`. It can be synchronous and return `void`, or asynchronous and return `async Task`. Do not use `async void`.
#end

#ensure-nuget-packge-for-upgrade
Make sure that you have a NuGet feed source with the version you want to upgrade to. This is usually the [Telerik NuGet Feed](slug:installation/nuget), but you can also use a local feed from [our MSI installer](slug:installation-msi) or [ZIP archive](slug:installation-zip).
#end

#date-format-per-culture
The `Format` is culture-specific and the same format may produce different results depending on the culture. You can find more information and examples in the [Supported Date Formats](slug:components/dateinput/supported-formats) article.
#end


#vsx-download
You can get the extension from:

* The Visual Studio Marketplace (for [Visual Studio 2022 for Windows](https://marketplace.visualstudio.com/items?itemName=TelerikInc.ProgressTelerikBlazorVSExtensions) and [Visual Studio 2019 for Windows](https://marketplace.visualstudio.com/items?itemName=TelerikInc.TelerikBlazorVSExtensions)).
* The [Telerik UI for Blazor automated installer](slug:installation-msi) (for Windows and Mac).
* Your [Telerik.com account](https://www.telerik.com/account/product-download?product=BLAZOR) (for Mac only). Download the `.mpack` file and use the "Install from file..." button on the Visual Studio Extensions dialog.

> Our extention for Visual Studio for Mac will be discontinued in 2024 [after Visual Studio for Mac is discontinued](https://learn.microsoft.com/en-us/visualstudio/mac/what-happened-to-vs-for-mac).

#end


#vs-code-x-download
You can get the extension from:

* The [Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=TelerikInc.blazortemplatewizard).

* The **Extensions** tab in Visual Studio Code - search for **Telerik UI for Blazor Productivity Tools**, select the extension, and then click **Install**.
#end


#valuebind-vs-databind-link
For details on Value Binding and Data Binding, and the differences between them, see the [Value Binding vs Data Binding](slug:get-started-value-vs-data-binding) article.
#end



#rerender-after-event
If you set the `ShouldRender` field of the event arguments to `true`, the component will re-render after the event (it will call `StateHasChanged()`). This can be useful if you need to change its parameters or state during the event execution and especially if you need to execute `async` logic in the event handler.
#end

#code-snippets-table
| Code Snippet               | Component                                |
|----------------------------|------------------------------------------|
| tb-autocomplete            | [AutoComplete](slug:autocomplete-overview) |
| tb-autocomplete-filterable | [AutoComplete with Filtering](slug:autocomplete-filter) |
| tb-barcode                 | [Barcode](slug:barcode-overview)     |
| tb-breadcrumb              | [Breadcrumb](slug:breadcrumb-overview) |
| tb-button                  | [Button](slug:components/button/overview) |
| tb-button-settings         | [Button with Appearance Settings](slug:button-appearance) |
| tb-calendar                | [Calendar](slug:components/calendar/overview) |
| tb-carousel                | [Carousel](slug:carousel-overview)   |
| tb-checkbox                | [Checkbox](slug:checkbox-overview)   |
| tb-checkbox-tristate       | [Checkbox in Indeterminate State](slug:checkbox-indeterminate-state) |
| tb-chunkprogressbar        | [ChunkProgressBar](slug:chunkprogressbar-overview) |
| tb-colorgradient           | [ColorGradient](slug:colorgradient-overview) |
| tb-colorpalette            | [ColorPalette](slug:colorpalette-overview)    |
| tb-colorpicker             | [ColorPicker](slug:colorpicker-overview) |
| tb-combobox                | [ComboBox](slug:components/combobox/overview) |
| tb-combobox-filterable     | [ComboBox with Filtering](slug:components/combobox/filter) |
| tb-contextmenu             | [ContextMenu](slug:contextmenu-overview) |
| tb-dateintput              | [DateInput](slug:components/dateinput/overview) |
| tb-datepicker              | [DatePicker](slug:components/datepicker/overview) |
| tb-daterangepicker         | [DateRangePicker](slug:daterangepicker-overview) |
| tb-datetimepicker          | [Date-Time Picker](slug:components/datetimepicker/overview) |
| tb-dialog                  | [Dialog](slug:dialog-overview)       |
| tb-drawer                  | [Drawer](slug:drawer-overview)       |
| tb-dropdownlist            | [DropDownList](slug:components/dropdownlist/overview) |
| tb-dropdownlist-filterable | [DropDownList with Filtering](slug:components/dropdownlist/filter) |
| tb-editor                  | [Editor](slug:editor-overview)       |
| tb-fileselect              | [FileSelect](slug:fileselect-overview) |
| tb-filter                  | [Filter](slug:filter-overview)       |
| tb-flatcolorpicker         | [FlatColorPicker](slug:flatcolorpicker-overview) |
| tb-form                    | [Form](slug:form-overview)           |
| tb-gantt                   | [Gantt](slug:gantt-overview)         |
| tb-gantt-editable          | [Gantt with Editing](slug:gantt-tree-editing) |
| tb-ganttcolumn             | [Gantt - Databound Column](slug:gantt-columns-bound) |
| tb-grid                    | [Grid](slug:grid-overview)           |
| tb-grid-editable           | [Grid with Editing](slug:grid-editing-overview) |
| tb-gridcolumn              | [Grid - Databound Column](slug:components/grid/columns/bound) |
| tb-gridcolumn-locked       | [Grid with Frozen Column](slug:grid-columns-frozen) |
| tb-gridlayout              | [GridLayout](slug:gridlayout-overview) |
| tb-listview                | [ListView](slug:listview-overview)   |
| tb-listview-editable       | [ListView with Editing](slug:listview-editing) |
| tb-loader                  | [Loader](slug:loader-overview)       |
| tb-loadercontainer         | [LoaderContainer](slug:loadercontainer-overview) |
| tb-maskedtextbox           | [Masked Textbox](slug:maskedtextbox-overview) |
| tb-menu                    | [Menu](slug:components/menu/overview) |
| tb-multiselect             | [MultiSelect](slug:multiselect-overview) |
| tb-multiselect-filterable  | [MultiSelect with Filtering](slug:multiselect-filter) |
| tb-numerictextbox          | [Numeric Textbox](slug:components/numerictextbox/overview) |
| tb-pager                   | [Pager](slug:pager-overview)         |
| tb-panelbar                | [PanelBar](slug:panelbar-overview)   |
| tb-progressbar             | [ProgressBar](slug:progressbar-overview) |
| tb-qrcode                  | [QRCode](slug:qrcode-overview)       |
| tb-radiogroup              | [RadioGroup](slug:radiogroup-overview) |
| tb-rangeslider             | [RangeSlider](slug:rangeslider-overview) |
| tb-scheduler               | [Scheduler](slug:scheduler-overview) |
| tb-scheduler-editable      | [Scheduler with Editing](slug:scheduler-appointments-edit) |
| tb-slider                  | [Slider](slug:slider-overview)       |
| tb-splitter                | [Splitter](slug:splitter-overview)   |
| tb-stacklayout             | [StackLayout](slug:stacklayout-overview) |
| tb-stepper                 | [Stepper](slug:stepper-overview)     |
| tb-switch                  | [Switch](slug:switch-overview)       |
| tb-tabstrip                | [TabStrip](slug:components/tabstrip/overview) |
| tb-textarea                | [TextArea](slug:textarea-overview)   |
| tb-textbox                 | [Textbox](slug:components/textbox/overview) |
| tb-tilelayout              | [TileLayout](slug:tilelayout-overview) |
| tb-timepicker              | [Time Picker](slug:components/timepicker/overview) |
| tb-togglebutton            | [ToggleButton](slug:togglebutton-overview) |
| tb-tooltip                 | [Tooltip](slug:tooltip-overview)     |
| tb-treelist                | [TreeList](slug:treelist-overview)   |
| tb-treeList-editable       | [TreeList with Editing](slug:treelist-editing-overview) |
| tb-treelistcolumn          | [TreeList - Databound Column](slug:treelist-columns-bound) |
| tb-treelistcolumn-locked   | [TreeList with Frozen Column](slug:treelist-columns-frozen) |
| tb-treeview                | [TreeView](slug:treeview-overview)   |
| tb-upload                  | [Upload](slug:upload-overview)       |
| tb-window                  | [Window](slug:window-overview) |
| tb-wizard                  | [Wizard](slug:wizard-overview)       |
#end


#status-telerik-com
## Telerik NuGet Feed Status

Visit [status.telerik.com](https://status.telerik.com) to check the status of the Telerik NuGet server. The top section shows manually logged incidents with possible updates or workaround suggestions. The [**System Metrics** section](https://status.telerik.com/#system-metrics) provides real-time automated diagnostics.
#end


#ci-cd-support
> The deployment articles in this documentation provide general guidance and fundamentals. Telerik does not provide technical support for setting up CI/CD environments or application publishing infrastructure, except for questions about [using Telerik license keys](slug:deployment-license-key).
#end
