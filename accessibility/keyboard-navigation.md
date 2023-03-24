---
title: Keyboard Navigation
page_title: Keyboard Navigation
description: Support for keyboard navigation in the Telerik UI for Blazor suite and components.
slug: accessibility-keyboard-navigation
tags: telerik,blazor,accessibility,keyboard,navigation,support
published: True
position: 2
---

# Keyboard Navigation

The Telerik UI for Blazor components support keyboard navigation and the end users can use the keyboard to walk through them and invoke actions such as clicking buttons, paging the Grid, and so on.

## How it Works

Generally, to focus a component, use the `Tab` key as the keyboard support of the page follows the normal flow of the content. Once inside a component, you can use specific keyboard shortcuts to trigger specific actions such as using the `Arrow` keys to focus different cells in the Grid, or the `Enter` key to click a button.

Normally, users can use the keyboard to navigate only to HTML links, buttons, and form controls. The Telerik UI for Blazor library has gone to the next level and the components it delivers are focusable. In this way, even though the components represent complex structures, users can interact with them too.

The navigation order in which interactive items receive keyboard focus has to be logical and intuitive. Generally, the focus has to follow the visual horizontal and vertical flow of the page. For example, left-to-right and top-to-bottom, header first followed by the main and, then, page navigation.

Most of the components in the library represent a single `Tab` stop. Once users reach and focus a component, they can leave it with a single tab. If the component is more complex, users can walk though its inside elements with the `Arrow` keys, for example, Grid cells, Menu items, Toolbar buttons. Some complex components can accommodate multiple other components. For example, the Grid can host a Toolbar and a Pager. In this case, you can tab to move the focus from one nested component to another.

## Types of Keyboard Support

The Telerik UI for Blazor components provide the enhanced, standard, or no level of keyboard support.

The components delivering standard keyboard support provide the same keyboard navigation capabilities as their standard HTML counterparts. For example, the Buttons support `Enter` and `Space` for clicking them. All components with standard keyboard support are reachable through the `Tab` key and provide focus styles.

The components delivering enhanced keyboard support build on top of the standard combinations and implement additional shortcuts for improved flexibility and user experience.    

The components delivering no keyboard support serve a purely visualization purpose, are just content containers, provide no interaction, or provide mouse and touch interaction by design.

## Keyboard Support per Component

The following table lists the available Telerik UI for Blazor components with the type of keyboard support they provide. To see the combinations in action, click the desired component to see its keyboard navigation demo.   

|Component|Enhanced Navigation|Standard Navigation|None|Considerations
|:---     |:---               |:---               |:---|:---
|[AutoComplete](https://demos.telerik.com/blazor-ui/autocomplete/keyboard-navigation)| Yes|||
|[Breadcrumb](https://demos.telerik.com/blazor-ui/breadcrumb/keyboard-navigation)| Yes|||
|[Calendar](https://demos.telerik.com/blazor-ui/calendar/keyboard-navigation)| Yes|||
|[Carousel](https://demos.telerik.com/blazor-ui/carousel/keyboard-navigation)| Yes|||
|[Chip](https://demos.telerik.com/blazor-ui/chip/keyboard-navigation)| Yes|||
|[ChipList](https://demos.telerik.com/blazor-ui/chiplist/keyboard-navigation)|Yes|||
|[ColorGradient](https://demos.telerik.com/blazor-ui/colorgradient/keyboard-navigation)|Yes|||
|[ColorPalette](https://demos.telerik.com/blazor-ui/colorpalette/keyboard-navigation)|Yes|||
|[ColorPicker](https://demos.telerik.com/blazor-ui/colorpicker/overview)|Yes|||See also the [ColorGradient](https://demos.telerik.com/blazor-ui/colorgradient/keyboard-navigation) and [ColorPalette](https://demos.telerik.com/blazor-ui/colorpalette/keyboard-navigation).
|[ComboBox](https://demos.telerik.com/blazor-ui/combobox/keyboard-navigation)|Yes|||
|[ContextMenu](https://demos.telerik.com/blazor-ui/contextmenu/keyboard-navigation)|Yes|||
|[DateInput](https://demos.telerik.com/blazor-ui/dateinput/keyboard-navigation)|Yes|||
|[DatePicker](https://demos.telerik.com/blazor-ui/datepicker/keyboard-navigation)|Yes|||
|[DateRangePicker](https://demos.telerik.com/blazor-ui/daterangepicker/keyboard-navigation)|Yes|||
|[DateTimePicker](https://demos.telerik.com/blazor-ui/datetimepicker/keyboard-navigation)|Yes|||
|[Dialog](https://demos.telerik.com/blazor-ui/dialog/overview)|Yes|||Tab to reach and use its buttons. The Dialog restricts the focus within itself during tabbing.
|[Drawer](https://demos.telerik.com/blazor-ui/drawer/keyboard-navigation)|Yes|||
|[DropDownList](https://demos.telerik.com/blazor-ui/dropdownlist/keyboard-navigation)|Yes|||
|[Editor](https://demos.telerik.com/blazor-ui/editor/keyboard-navigation)|Yes|||
|[FileManager](https://demos.telerik.com/blazor-ui/filemanager/overview)|Yes|||Tab to focus the different nested components. Keyboard navigation for the file list is not available yet.
|[FileSelect](https://demos.telerik.com/blazor-ui/fileselect/keyboard-navigation)|Yes|||
|[Filter](https://demos.telerik.com/blazor-ui/filter/keyboard-navigation)|Yes|||
|[FlatColorPicker](https://demos.telerik.com/blazor-ui/flatcolorpicker/overview)|Yes|||Tab to focus the different nested components. See also the [ColorGradient](https://demos.telerik.com/blazor-ui/colorgradient/keyboard-navigation) and [ColorPalette](https://demos.telerik.com/blazor-ui/colorpalette/keyboard-navigation).
|[Gantt](https://demos.telerik.com/blazor-ui/gantt/overview)|Yes|||Keyboard navigation is available for the nested [TreeList](https://demos.telerik.com/blazor-ui/treelist/keyboard-navigation).
|[Grid](https://demos.telerik.com/blazor-ui/grid/keyboard-navigation)|Yes|||Set `Navigable="true"`.
|[Menu](https://demos.telerik.com/blazor-ui/menu/keyboard-navigation)|Yes|||
|[MultiColumnComboBox](https://demos.telerik.com/blazor-ui/multicolumncombobox/keyboard-navigation)|Yes|||
|[MultiSelect](https://demos.telerik.com/blazor-ui/multiselect/keyboard-navigation)|Yes|||
|[NumericTextBox](https://demos.telerik.com/blazor-ui/numerictextbox/keyboard-navigation)|Yes|||
|[Pager](https://demos.telerik.com/blazor-ui/pager/keyboard-navigation)|Yes|||
|[PanelBar](https://demos.telerik.com/blazor-ui/panelbar/keyboard-navigation)|Yes|||
|[PdfViewer](https://demos.telerik.com/blazor-ui/pdfviewer/overview)|Yes|||Tab to focus the different components in the toolbar. The built-in [Pager provides keyboard navigation](https://demos.telerik.com/blazor-ui/pager/keyboard-navigation).
|[RangeSlider](https://demos.telerik.com/blazor-ui/rangeslider/keyboard-navigation)|Yes|||
|[Scheduler](https://demos.telerik.com/blazor-ui/scheduler/keyboard-navigation)|Yes|||
|[Slider](https://demos.telerik.com/blazor-ui/slider/keyboard-navigation)|Yes|||
|[SplitButton](https://demos.telerik.com/blazor-ui/splitbutton/keyboard-navigation)|Yes|||
|[Splitter](https://demos.telerik.com/blazor-ui/splitter/keyboard-navigation)|Yes|||
|[Stepper](https://demos.telerik.com/blazor-ui/stepper/keyboard-navigation)|Yes|||
|[Switch](https://demos.telerik.com/blazor-ui/switch/keyboard-navigation)|Yes|||
|[TabStrip](https://demos.telerik.com/blazor-ui/tabstrip/keyboard-navigation)|Yes|||
|[TimePicker](https://demos.telerik.com/blazor-ui/timepicker/keyboard-navigation)|Yes|||
|[ToggleButton](https://demos.telerik.com/blazor-ui/togglebutton/keyboard-navigation)|Yes|||
|[ToolBar](https://demos.telerik.com/blazor-ui/toolbar/keyboard-navigation)|Yes|||
|[TreeList](https://demos.telerik.com/blazor-ui/treelist/keyboard-navigation)|Yes|||Set `Navigable="true"`.
|[TreeView](https://demos.telerik.com/blazor-ui/treeview/keyboard-navigation)|Yes|||
|[Upload](https://demos.telerik.com/blazor-ui/upload/keyboard-navigation)|Yes|||
|[Window](https://demos.telerik.com/blazor-ui/window/keyboard-navigation)|Yes|||
|[Wizard](https://demos.telerik.com/blazor-ui/wizard/keyboard-navigation)|Yes|||
|[Button](https://demos.telerik.com/blazor-ui/button/keyboard-navigation)||Yes||
|[ButtonGroup](https://demos.telerik.com/blazor-ui/buttongroup/keyboard-navigation)||Yes||
|[CheckBox](https://demos.telerik.com/blazor-ui/checkbox/overview)||Yes||
|[Form](https://demos.telerik.com/blazor-ui/form/overview)||Yes||
|[MaskedTextBox](https://demos.telerik.com/blazor-ui/maskedtextbox/overview)||Yes||
|[RadioGroup](https://demos.telerik.com/blazor-ui/radiogroup/keyboard-navigation)||Yes||
|[TextArea](https://demos.telerik.com/blazor-ui/textarea/overview)||Yes||
|[TextBox](https://demos.telerik.com/blazor-ui/textbox/overview)||Yes||
|AnimationContainer|||Yes|
|Avatar|||Yes|
|Barcode|||Yes|
|Card|||Yes|
|Chart|||Yes|
|ChunkProgressBar|||Yes|
|DropZone|||Yes|
|FloatingLabel|||Yes|
|ArcGauge|||Yes|
|CircularGauge|||Yes|
|LinearGauge|||Yes|
|RadialGauge|||Yes|
|GridLayout|||Yes|
|Icons|||Yes|
|ListView|||Yes|The built-in [Pager component provides keyboard navigation](https://demos.telerik.com/blazor-ui/pager/keyboard-navigation).
|Loader|||Yes|
|LoaderContainer|||Yes|
|MediaQuery|||Yes|
|Notification|||Yes|
|ProgressBar|||Yes|
|QRCode|||Yes|
|Skeleton|||Yes|
|Signature|||Yes|
|StackLayout|||Yes|
|StockChart|||Yes|
|TileLayout|||Yes|
|Tooltip|||Yes|
|Validation|||Yes|

## See Also

* [Accessibility Overview]({%slug accessibility-overview%})
* [Globalization Overview]({%slug globalization-overview%})
* [Telerik UI for Blazor Accessibility Compliance]({%slug accessibility-compliance%})
