---
title: Keyboard Navigation
page_title: Keyboard Navigation
description: Support for keyboard navigation in the Telerik UI for Blazor suite.
slug: accessibility-keyboard-navigation
tags: telerik,blazor,accessibility,keyboard,navigation,support
published: True
position: 2
---

# Keyboard Navigation

The Telerik UI for Blazor components support keyboard navigation so the end users can use the keyboard to walk through them and invoke actions such as clicking buttons, paging the grid and so on.

Generally, to focus a component use the `Tab` key as the keyboard support of the page follows the normal flow of the content. Once in a component, you can use specific keyboard shortcuts to trigger specific actions (such as using the arrow keys to focus different cells in the grid, or the `Enter` key to click a button).

By default, users can only navigate to links, buttons, and form controls with a keyboard, and we also made our components focusable so the user can interact with them too, even though they are complex structures. The navigation order in which interactive items receive keyboard focus has to be logical and intuitive. Generally, it needs to follow the visual horizontal and vertical flow of the page. For example, left to right and top to bottom, header first followed by the main and then page navigation.

The following list shows the Telerik components that support specific keyboard combinations and links to live demos where you can see the behavior in action, together with the available keyboard shortcuts:

* [AutoComplete](https://demos.telerik.com/blazor-ui/autocomplete/keyboard-navigation)

* [Button](https://demos.telerik.com/blazor-ui/button/keyboard-navigation)

* [ButtonGroup](https://demos.telerik.com/blazor-ui/buttongroup/keyboard-navigation)

* [Calendar](https://demos.telerik.com/blazor-ui/calendar/keyboard-navigation)

* Chart - not applicable, the chart is a visualization component only.

* Checkbox - not applicable, it is a simple input with the standard behavior.

* ChunkProgressBar - not applicable, it is merely a visualization component the user cannot interact with.

* [Context Menu](https://demos.telerik.com/blazor-ui/contextmenu/keyboard-navigation)

* [ComboBox](https://demos.telerik.com/blazor-ui/combobox/keyboard-navigation)

* [DateInput](https://demos.telerik.com/blazor-ui/dateinput/keyboard-navigation)

* [DatePicker](https://demos.telerik.com/blazor-ui/datepicker/keyboard-navigation)

* [DateRangePicker](https://demos.telerik.com/blazor-ui/daterangepicker/keyboard-navigation)

* [DateTimePicker](https://demos.telerik.com/blazor-ui/datetimepicker/keyboard-navigation)

* [Drawer](https://demos.telerik.com/blazor-ui/drawer/keyboard-navigation)

* [DropDownList](https://demos.telerik.com/blazor-ui/dropdownlist/keyboard-navigation)

* Editor - will have keyboard navigation in an upcoming release.

* [Grid](https://demos.telerik.com/blazor-ui/grid/keyboard-navigation) (set `Navigable="true"`)

* MaskedTextbox - not applicable, it is a simple input with the standard behavior.

* [Menu](https://demos.telerik.com/blazor-ui/menu/keyboard-navigation)

* ListView - not applicable, its entire rendering is up to the app. Its pager is a separate component that offers accessibility and keyboard navigation.

* Loader - not applicable, it is merely a visualization component the user cannot interact with.

* LoaderContainer - not applicable, it is merely a visualization component the user cannot interact with.

* [MultiSelect](https://demos.telerik.com/blazor-ui/multiselect/keyboard-navigation)

* Notification - not applicable, it is a visualization component. 

* [NumericTextBox](https://demos.telerik.com/blazor-ui/numerictextbox/keyboard-navigation)

* [Pager](https://demos.telerik.com/blazor-ui/pager/keyboard-navigation)

* ProgressBar - not applicable, it is merely a visualization component the user cannot interact with.

* [RadioGroup](https://demos.telerik.com/blazor-ui/radiogroup/keyboard-navigation) - has the standard behavior of radio buttons with the same `name`.

* [RangeSlider](https://demos.telerik.com/blazor-ui/rangeslider/keyboard-navigation)

* [Scheduler](https://demos.telerik.com/blazor-ui/scheduler/keyboard-navigation)

* [Slider](https://demos.telerik.com/blazor-ui/slider/keyboard-navigation)

* [Splitter](https://demos.telerik.com/blazor-ui/splitter/keyboard-navigation)

* [Switch](https://demos.telerik.com/blazor-ui/switch/keyboard-navigation)

* [TabStrip](https://demos.telerik.com/blazor-ui/tabstrip/keyboard-navigation)

* TextArea - not applicable, it is a simple input with the standard behavior.

* Textbox - not applicable, it is a simple input with the standard behavior.

* TileLayout - not applicable, the resize and drag actions apply to mouse/touch gestures only.

* [TimePicker](https://demos.telerik.com/blazor-ui/timepicker/keyboard-navigation)

* [ToolBar](https://demos.telerik.com/blazor-ui/toolbar/keyboard-navigation)

* [ToggleButton](https://demos.telerik.com/blazor-ui/togglebutton/keyboard-navigation)

* [TreeList](https://demos.telerik.com/blazor-ui/treelist/keyboard-navigation) (set `Navigable="true"`)

* [TreeView](https://demos.telerik.com/blazor-ui/treeview/keyboard-navigation)

* [Upload](https://demos.telerik.com/blazor-ui/upload/keyboard-navigation)

* [Window](https://demos.telerik.com/blazor-ui/window/keyboard-navigation)



## See Also

  * [Accessibility Overview]({%slug accessibility-overview%})
  * [Globalization Overview]({%slug globalization-overview%})
  * [Telerik UI for Blazor Accessibility Compliance]({%slug accessibility-compliance%})
