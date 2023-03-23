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

The Telerik UI for Blazor components support keyboard navigation, so the end users can use the keyboard to walk through them and invoke actions such as clicking buttons, paging the grid and so on.

## How it Works

Generally, to focus a component use the `Tab` key as the keyboard support of the page follows the normal flow of the content. Once in a component, you can use specific keyboard shortcuts to trigger specific actions (such as using the arrow keys to focus different cells in the grid, or the `Enter` key to click a button).

Normally, users can use the keyboard to navigate only to HTML links, buttons, and form controls. We have gone to the next level and made our components focusable, so users can interact with them too, even though they are complex structures. The navigation order in which interactive items receive keyboard focus has to be logical and intuitive. Generally, it needs to follow the visual horizontal and vertical flow of the page. For example, left to right and top to bottom, header first followed by the main and then page navigation.

Most of our components represent a single `Tab` stop. Once users reach and focus a component, they will leave it via one tab. If the component is more complex, users can walk though different elements inside it with the arrow keys (for example, Grid cells, Menu items, Toolbar buttons). Some complex components consist of multiple other components. For example, the Grid can host a Toolbar and a Pager. In this case, tab to move focus from one nested component to another.

The following lists show the Telerik components that support specific keyboard combinations and links to live demos where you can see the behavior in action, together with the available keyboard shortcuts.

* [Enhanced Keyboard Navigation](#components-with-enhanced-keyboard-navigation)
* [Standard Keyboard Navigation](#components-with-standard-keyboard-navigation)
* [No Keyboard Navigation](#components-without-keyboard-navigation)


## Components with Enhanced Keyboard Navigation

* [AutoComplete](https://demos.telerik.com/blazor-ui/autocomplete/keyboard-navigation)
* [Breadcrumb](https://demos.telerik.com/blazor-ui/breadcrumb/keyboard-navigation)
* [Calendar](https://demos.telerik.com/blazor-ui/calendar/keyboard-navigation)
* [Carousel](https://demos.telerik.com/blazor-ui/carousel/keyboard-navigation)
* [Chip](https://demos.telerik.com/blazor-ui/chip/keyboard-navigation)
* [ChipList](https://demos.telerik.com/blazor-ui/chiplist/keyboard-navigation)
* [ColorGradient](https://demos.telerik.com/blazor-ui/colorgradient/keyboard-navigation)
* [ColorPalette](https://demos.telerik.com/blazor-ui/colorpalette/keyboard-navigation)
* [ColorPicker](https://demos.telerik.com/blazor-ui/colorpicker/overview) - also see [ColorGradient](https://demos.telerik.com/blazor-ui/colorgradient/keyboard-navigation) and [ColorPalette](https://demos.telerik.com/blazor-ui/colorpalette/keyboard-navigation).
* [ComboBox](https://demos.telerik.com/blazor-ui/combobox/keyboard-navigation)
* [ContextMenu](https://demos.telerik.com/blazor-ui/contextmenu/keyboard-navigation)
* [DateInput](https://demos.telerik.com/blazor-ui/dateinput/keyboard-navigation)
* [DatePicker](https://demos.telerik.com/blazor-ui/datepicker/keyboard-navigation)
* [DateRangePicker](https://demos.telerik.com/blazor-ui/daterangepicker/keyboard-navigation)
* [DateTimePicker](https://demos.telerik.com/blazor-ui/datetimepicker/keyboard-navigation)
* [Dialog](https://demos.telerik.com/blazor-ui/dialog/overview) - tab to reach and use its buttons. The Dialog restricts focus within itself during tabbing.
* [Drawer](https://demos.telerik.com/blazor-ui/drawer/keyboard-navigation)
* [DropDownList](https://demos.telerik.com/blazor-ui/dropdownlist/keyboard-navigation)
* [Editor](https://demos.telerik.com/blazor-ui/editor/keyboard-navigation)
* [FileManager](https://demos.telerik.com/blazor-ui/filemanager/overview) - tab to focus the different nested components. Keyboard navigation for the file list is not available yet.
* [FileSelect](https://demos.telerik.com/blazor-ui/fileselect/keyboard-navigation)
* [Filter](https://demos.telerik.com/blazor-ui/filter/keyboard-navigation)
* [FlatColorPicker](https://demos.telerik.com/blazor-ui/flatcolorpicker/overview) - tab to focus the different nested components. Also see [ColorGradient](https://demos.telerik.com/blazor-ui/colorgradient/keyboard-navigation) and [ColorPalette](https://demos.telerik.com/blazor-ui/colorpalette/keyboard-navigation).
* [Gantt](https://demos.telerik.com/blazor-ui/gantt/overview) - keyboard navigation is available for the nested [TreeList](https://demos.telerik.com/blazor-ui/treelist/keyboard-navigation)
* [Grid](https://demos.telerik.com/blazor-ui/grid/keyboard-navigation) (set `Navigable="true"`)
* [Menu](https://demos.telerik.com/blazor-ui/menu/keyboard-navigation)
* [MultiColumnComboBox](https://demos.telerik.com/blazor-ui/multicolumncombobox/keyboard-navigation)
* [MultiSelect](https://demos.telerik.com/blazor-ui/multiselect/keyboard-navigation)
* [NumericTextBox](https://demos.telerik.com/blazor-ui/numerictextbox/keyboard-navigation)
* [Pager](https://demos.telerik.com/blazor-ui/pager/keyboard-navigation)
* [PanelBar](https://demos.telerik.com/blazor-ui/panelbar/keyboard-navigation)
* [PdfViewer](https://demos.telerik.com/blazor-ui/pdfviewer/overview) - tab to focus the different components in the toolbar. The built-in [Pager provides keyboard navigation](https://demos.telerik.com/blazor-ui/pager/keyboard-navigation).
* [RangeSlider](https://demos.telerik.com/blazor-ui/rangeslider/keyboard-navigation)
* [Scheduler](https://demos.telerik.com/blazor-ui/scheduler/keyboard-navigation)
* [Slider](https://demos.telerik.com/blazor-ui/slider/keyboard-navigation)
* [SplitButton](https://demos.telerik.com/blazor-ui/splitbutton/keyboard-navigation)
* [Splitter](https://demos.telerik.com/blazor-ui/splitter/keyboard-navigation)
* [Stepper](https://demos.telerik.com/blazor-ui/stepper/keyboard-navigation)
* [Switch](https://demos.telerik.com/blazor-ui/switch/keyboard-navigation)
* [TabStrip](https://demos.telerik.com/blazor-ui/tabstrip/keyboard-navigation)
* [TimePicker](https://demos.telerik.com/blazor-ui/timepicker/keyboard-navigation)
* [ToggleButton](https://demos.telerik.com/blazor-ui/togglebutton/keyboard-navigation)
* [ToolBar](https://demos.telerik.com/blazor-ui/toolbar/keyboard-navigation)
* [TreeList](https://demos.telerik.com/blazor-ui/treelist/keyboard-navigation) (set `Navigable="true"`)
* [TreeView](https://demos.telerik.com/blazor-ui/treeview/keyboard-navigation)
* [Upload](https://demos.telerik.com/blazor-ui/upload/keyboard-navigation)
* [Window](https://demos.telerik.com/blazor-ui/window/keyboard-navigation)
* [Wizard](https://demos.telerik.com/blazor-ui/wizard/keyboard-navigation)


## Components with Standard Keyboard Navigation

The following components provide the same keyboard navigation capabilities, as their standard HTML counter-parts. For example, the buttons support `Enter` and `Space` for clicking them. All these components are reachable via `Tab` and provide focus styles.

* [Button](https://demos.telerik.com/blazor-ui/button/keyboard-navigation)
* [ButtonGroup](https://demos.telerik.com/blazor-ui/buttongroup/keyboard-navigation)
* [CheckBox](https://demos.telerik.com/blazor-ui/checkbox/overview)
* [Form](https://demos.telerik.com/blazor-ui/form/overview)
* [MaskedTextBox](https://demos.telerik.com/blazor-ui/maskedtextbox/overview)
* [RadioGroup](https://demos.telerik.com/blazor-ui/radiogroup/keyboard-navigation)
* [TextArea](https://demos.telerik.com/blazor-ui/textarea/overview)
* [TextBox](https://demos.telerik.com/blazor-ui/textbox/overview)


## Components without Keyboard Navigation

The components below don't provide keyboard navigation because they:

* Serve a purely visualization purpose;
* Are just content containers;
* Provide no interaction;
* Provide mouse and touch interaction by design.

These components are:

* AnimationContainer
* Avatar
* Barcode
* Card
* Chart
* ChunkProgressBar
* DropZone
* FloatingLabel
* Gauges - ArcGauge, CircularGauge, LinearGauge, RadialGauge
* GridLayout
* Icons
* ListView, except the built-in [Pager component, which provides keyboard navigation](https://demos.telerik.com/blazor-ui/pager/keyboard-navigation)
* Loader and LoaderContainer
* MediaQuery
* Notification
* ProgressBar
* QRCode
* Skeleton
* Signature
* StackLayout
* StockChart
* TileLayout
* Tooltip
* Validation


## See Also

* [Accessibility Overview]({%slug accessibility-overview%})
* [Globalization Overview]({%slug globalization-overview%})
* [Telerik UI for Blazor Accessibility Compliance]({%slug accessibility-compliance%})
