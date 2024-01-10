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

The Telerik UI for Blazor components may provide enhanced, standard, or no keyboard support.

* *Standard keyboard support* implies similar keyboard navigation capabilities as standard HTML elements. For example, the Button components support `Enter` and `Space` for clicking them. All components with standard keyboard support are reachable through the `Tab` key and provide focus styles.
* *Enhanced keyboard support* builds on top of the standard key combinations and provides additional shortcuts for improved flexibility and user experience.
* The components with no keyboard support serve a purely visualization purpose, are just content containers, provide no interaction, or provide only mouse and touch interaction by design.

## Right-to-Left Support

When the [right-to-left direction is enabled]({%slug rtl-support%}), the keyboard shortcuts for the components that support keyboard navigation remain unchanged except for the `Left arrow` and `Right arrow` keys—their functionality is reversed to follow the right-to-left direction.


## Keyboard Support per Component

The following table lists the available Telerik UI for Blazor components with the type of keyboard support they provide. To see the combinations in action, click the desired component to see its keyboard navigation demo.   

| Component | Keyboard Navigation | Notes |
| --- | --- | --- |
| ArcGauge | - | |
| [AutoComplete](https://demos.telerik.com/blazor-ui/autocomplete/keyboard-navigation) | **Enhanced** | |
| [Breadcrumb](https://demos.telerik.com/blazor-ui/breadcrumb/keyboard-navigation) | **Enhanced** | |
| [Button](https://demos.telerik.com/blazor-ui/button/keyboard-navigation) | Standard | |
| [ButtonGroup](https://demos.telerik.com/blazor-ui/buttongroup/keyboard-navigation) | Standard | |
| [Calendar](https://demos.telerik.com/blazor-ui/calendar/keyboard-navigation) | **Enhanced** | |
| [Carousel](https://demos.telerik.com/blazor-ui/carousel/keyboard-navigation) | **Enhanced** | |
| [Chart](https://demos.telerik.com/blazor-ui/chart/keyboard-navigation) | **Enhanced** | |
| [CheckBox](https://demos.telerik.com/blazor-ui/checkbox/overview) | Standard | |
| [Chip](https://demos.telerik.com/blazor-ui/chip/keyboard-navigation) | **Enhanced** | |
| [ChipList](https://demos.telerik.com/blazor-ui/chiplist/keyboard-navigation) | **Enhanced** | |
| CircularGauge | - | |
| [ColorGradient](https://demos.telerik.com/blazor-ui/colorgradient/keyboard-navigation) | **Enhanced** | |
| [ColorPalette](https://demos.telerik.com/blazor-ui/colorpalette/keyboard-navigation) | **Enhanced** | |
| [ColorPicker](https://demos.telerik.com/blazor-ui/colorpicker/overview) | **Enhanced** | See also the [ColorGradient](https://demos.telerik.com/blazor-ui/colorgradient/keyboard-navigation) and [ColorPalette](https://demos.telerik.com/blazor-ui/colorpalette/keyboard-navigation). |
| [ComboBox](https://demos.telerik.com/blazor-ui/combobox/keyboard-navigation) | **Enhanced** | |
| [ContextMenu](https://demos.telerik.com/blazor-ui/contextmenu/keyboard-navigation) | **Enhanced** | |
| [DateInput](https://demos.telerik.com/blazor-ui/dateinput/keyboard-navigation) | **Enhanced** | |
| [DatePicker](https://demos.telerik.com/blazor-ui/datepicker/keyboard-navigation) | **Enhanced** | |
| [DateRangePicker](https://demos.telerik.com/blazor-ui/daterangepicker/keyboard-navigation) | **Enhanced** | |
| [DateTimePicker](https://demos.telerik.com/blazor-ui/datetimepicker/keyboard-navigation) | **Enhanced** | |
| [Dialog](https://demos.telerik.com/blazor-ui/dialog/overview) | **Enhanced** | Tab to reach and use its buttons. The Dialog restricts the focus within itself during tabbing. |
| [Drawer](https://demos.telerik.com/blazor-ui/drawer/keyboard-navigation) | **Enhanced** | |
| [DropDownButton](https://demos.telerik.com/blazor-ui/dropdownbutton/keyboard-navigation) | **Enhanced** | |
| [DropDownList](https://demos.telerik.com/blazor-ui/dropdownlist/keyboard-navigation) | **Enhanced** | |
| DropZone | - | |
| [Editor](https://demos.telerik.com/blazor-ui/editor/keyboard-navigation) | **Enhanced** | |
| [FileManager](https://demos.telerik.com/blazor-ui/filemanager/overview) | **Enhanced** | Tab to focus the different nested components. Keyboard navigation for the file list is not available yet. |
| [FileSelect](https://demos.telerik.com/blazor-ui/fileselect/keyboard-navigation) | **Enhanced** | |
| [Filter](https://demos.telerik.com/blazor-ui/filter/keyboard-navigation) | **Enhanced** | |
| [FlatColorPicker](https://demos.telerik.com/blazor-ui/flatcolorpicker/overview) | **Enhanced** | Tab to focus the different nested components. See also the [ColorGradient](https://demos.telerik.com/blazor-ui/colorgradient/keyboard-navigation) and [ColorPalette](https://demos.telerik.com/blazor-ui/colorpalette/keyboard-navigation). |
| FloatingLabel | - | |
| [Form](https://demos.telerik.com/blazor-ui/form/overview) | Standard | |
| [Gantt](https://demos.telerik.com/blazor-ui/gantt/overview) | **Enhanced** | Keyboard navigation is available for the nested [TreeList](https://demos.telerik.com/blazor-ui/treelist/keyboard-navigation). |
| [Grid](https://demos.telerik.com/blazor-ui/grid/keyboard-navigation) | **Enhanced** | Set `Navigable="true"` |
| GridLayout | - | |
| Icons | - | |
| LinearGauge | - | |
| ListView | - | | The built-in [Pager component provides keyboard navigation](https://demos.telerik.com/blazor-ui/pager/keyboard-navigation). |
| Loader | - | |
| LoaderContainer | - | |
| [Map](https://demos.telerik.com/blazor-ui/map/overview) | **Enhanced** | |
| [MaskedTextBox](https://demos.telerik.com/blazor-ui/maskedtextbox/overview) | Standard | |
| MediaQuery | - | |
| [Menu](https://demos.telerik.com/blazor-ui/menu/keyboard-navigation) | **Enhanced** | |
| [MultiColumnComboBox](https://demos.telerik.com/blazor-ui/multicolumncombobox/keyboard-navigation) | **Enhanced** | |
| [MultiSelect](https://demos.telerik.com/blazor-ui/multiselect/keyboard-navigation) | **Enhanced** | |
| Notification | - | |
| [NumericTextBox](https://demos.telerik.com/blazor-ui/numerictextbox/keyboard-navigation) | **Enhanced** | |
| [Pager](https://demos.telerik.com/blazor-ui/pager/keyboard-navigation) | **Enhanced** | |
| [PanelBar](https://demos.telerik.com/blazor-ui/panelbar/keyboard-navigation) | **Enhanced** | |
| [PdfViewer](https://demos.telerik.com/blazor-ui/pdfviewer/overview) | **Enhanced** | Tab to focus the different components in the toolbar. The built-in [Pager provides keyboard navigation](https://demos.telerik.com/blazor-ui/pager/keyboard-navigation). |
| PivotGrid | - | Not Supported <br /> (upcoming support) |
| ProgressBar | - | |
| QRCode | - | |
| RadialGauge | - | |
| [RadioGroup](https://demos.telerik.com/blazor-ui/radiogroup/keyboard-navigation) | Standard | |
| [RangeSlider](https://demos.telerik.com/blazor-ui/rangeslider/keyboard-navigation) | **Enhanced** | |
| [Scheduler](https://demos.telerik.com/blazor-ui/scheduler/keyboard-navigation) | **Enhanced** | |
| Signature | - | |
| Skeleton | - | |
| [Slider](https://demos.telerik.com/blazor-ui/slider/keyboard-navigation) | **Enhanced** | |
| [SplitButton](https://demos.telerik.com/blazor-ui/splitbutton/keyboard-navigation) | **Enhanced** | |
| [Splitter](https://demos.telerik.com/blazor-ui/splitter/keyboard-navigation) | **Enhanced** | |
| StackLayout | - | |
| [Stepper](https://demos.telerik.com/blazor-ui/stepper/keyboard-navigation) | **Enhanced** | |
| StockChart | - | |
| [Switch](https://demos.telerik.com/blazor-ui/switch/keyboard-navigation) | **Enhanced** | |
| [TabStrip](https://demos.telerik.com/blazor-ui/tabstrip/keyboard-navigation) | **Enhanced** | |
| [TextArea](https://demos.telerik.com/blazor-ui/textarea/overview) | Standard | |
| [TextBox](https://demos.telerik.com/blazor-ui/textbox/overview) | Standard | |
| TileLayout | - | |
| [TimePicker](https://demos.telerik.com/blazor-ui/timepicker/keyboard-navigation) | **Enhanced** | |
| [ToggleButton](https://demos.telerik.com/blazor-ui/togglebutton/keyboard-navigation) | **Enhanced** | |
| [ToolBar](https://demos.telerik.com/blazor-ui/toolbar/keyboard-navigation) | **Enhanced** | |
| Tooltip | - | |
| [TreeList](https://demos.telerik.com/blazor-ui/treelist/keyboard-navigation) | **Enhanced** | | Set `Navigable="true"` |
| [TreeView](https://demos.telerik.com/blazor-ui/treeview/keyboard-navigation) | **Enhanced** | |
| [Upload](https://demos.telerik.com/blazor-ui/upload/keyboard-navigation) | **Enhanced** | |
| Validation | - | |
| [Window](https://demos.telerik.com/blazor-ui/window/keyboard-navigation) | **Enhanced** | |
| [Wizard](https://demos.telerik.com/blazor-ui/wizard/keyboard-navigation) | **Enhanced** | |

## See Also

* [Accessibility Overview]({%slug accessibility-overview%})
* [Globalization Overview]({%slug globalization-overview%})
* [Telerik UI for Blazor Accessibility Compliance]({%slug accessibility-compliance%})
