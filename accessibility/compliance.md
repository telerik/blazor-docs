---
title: Compliance
page_title: Accessibility Compliance
description: Compliance with the accessibility standards and requirements in the Telerik UI for Blazor suite.
slug: accessibility-compliance
tags: telerik,blazor,accessibility,standards,compliance
published: True
position: 4
---

# Accessibility Standards Compliance

This article lists the compliance with the various accessibility standards that the Telerik UI for Blazor components provide.

For details on the keyboard support, see the [Keyboard Navigation]({%slug accessibility-keyboard-navigation%}) article.

All components implement the required WAI-ARIA attributes without the need for any extra configuration.

Due to the complexity of some of the components in the suite, we sometimes run into scenarios not covered by the WAI-ARIA specification. In those cases, we tap into the web development accessibility know-how of the rest of the Progress organization, including feedback from accessibility-minded users, for expertise and feedback based on 10 years of creating web component libraries. This knowledge-sharing across internal teams and clients helps us ensure that UI for Blazor can reach a certain level of accessibility compliance even with its most advanced components.

This article will be updated with details on the Section 508 and WCAG 2.2 compatibility levels.

<!--
>caption Accessibility compliance levels support provided by the Telerik UI for Blazor components.
-->






The Telerik UI for Blazor components are highly extensible and customizable. This means that, depending on the level of customization applied, you may be introducing rendering that is not accessible. Therefore, it is recommended that you test any modifications and templates you create to ensure the components still meet the desired level of accessibility standards. Additionally, be mindful of components working with custom input (images, text, HTML content, and so on) and make sure your content is accessible, too.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Component | Section 508 | WCAG 2.2 | Keyboard Navigation | Accessibility Documentation |
| --- | --- | --- | --- | --- |
| AIPrompt | Yes | AA | Enhanced | TBA |
| AppBar | N/A | N/A | N/A | N/A |
| ArcGauge | N/A | AA | N/A | N/A |
| AutoComplete | Yes | AA | [Enhanced](https://demos.telerik.com/blazor-ui/autocomplete/keyboard-navigation) | [Documentation]({%slug autocomplete-wai-aria-support%}) |
| Avatar | Yes | AA | N/A | N/A |
| Badge | N/A | N/A | N/A | N/A |
| Barcode | N/A | N/A | N/A | N/A |
| Breadcrumb | Yes | AAA | [Enhanced](https://demos.telerik.com/blazor-ui/breadcrumb/keyboard-navigation) | [Documentation]({%slug breadcrumb-wai-aria-support%}) |
| Button | Yes | AAA | [Standard](https://demos.telerik.com/blazor-ui/button/keyboard-navigation) | [Documentation]({%slug button-wai-aria-support%}) |
| ButtonGroup | Yes | AAA | [Standard](https://demos.telerik.com/blazor-ui/buttongroup/keyboard-navigation) | [Documentation]({%slug buttongroup-wai-aria-support%}) |
| Calendar | Yes | AAA | [Enhanced](https://demos.telerik.com/blazor-ui/calendar/keyboard-navigation) | [Documentation]({%slug calendar-wai-aria-support%}) |
| Card | No | N/A | N/A | N/A |
| Carousel | Yes | AA | [Enhanced](https://demos.telerik.com/blazor-ui/carousel/keyboard-navigation) | [Documentation]({%slug carousel-wai-aria-support%}) |
| Chart | Yes | AA | [Enhanced](https://demos.telerik.com/blazor-ui/chart/keyboard-navigation) | Documentation |
| CheckBox | Yes | AA | Standard | [Documentation]({%slug checkbox-wai-aria-support%}) |
| Chip | Yes | AA | [Enhanced](https://demos.telerik.com/blazor-ui/chip/keyboard-navigation) | TBA |
| ChipList | Yes | AA | [Enhanced](https://demos.telerik.com/blazor-ui/chiplist/keyboard-navigation) | TBA |
| ChunkProgressBar | Yes | AA | N/A | [Documentation]({%slug chunkprogressbar-wai-aria-support%}) |
| CircularGauge | N/A | N/A | N/A | N/A |
| ColorGradient | Yes | AA | [Enhanced](https://demos.telerik.com/blazor-ui/colorgradient/keyboard-navigation) | [Documentation]({%slug colorgradient-wai-aria-support%}) |
| ColorPalette | Yes | AA | [Enhanced](https://demos.telerik.com/blazor-ui/colorpalette/keyboard-navigation) | [Documentation]({%slug colorpalette-wai-aria-support%}) |
| ColorPicker | Yes | AA | Enhanced | [Documentation]({%slug colorpicker-wai-aria-support%}) |
| ComboBox | Yes | AA | [Enhanced](https://demos.telerik.com/blazor-ui/combobox/keyboard-navigation) | [Documentation]({%slug combobox-wai-aria-support%}) |
| ContextMenu | Yes | AA | [Enhanced](https://demos.telerik.com/blazor-ui/contextmenu/keyboard-navigation) | [Documentation]({%slug contextmenu-wai-aria-support%}) |
| DateInput | Yes | AA | [Enhanced](https://demos.telerik.com/blazor-ui/dateinput/keyboard-navigation) | [Documentation]({%slug dateinput-wai-aria-support%}) |
| DatePicker | Yes | AA | [Enhanced](https://demos.telerik.com/blazor-ui/datepicker/keyboard-navigation) | [Documentation]({%slug datepicker-wai-aria-support%}) |
| DateRangePicker | Yes | AA | [Enhanced](https://demos.telerik.com/blazor-ui/daterangepicker/keyboard-navigation) | [Documentation]({%slug daterangepicker-wai-aria-support%}) |
| DateTimePicker | Yes | AA | [Enhanced](https://demos.telerik.com/blazor-ui/datetimepicker/keyboard-navigation) | [Documentation]({%slug datetimepicker-wai-aria-support%}) |
| Dialog | Yes | AA | Enhanced | [Documentation]({%slug dialog-wai-aria-support%}) |
| Drawer | Yes | AA | [Enhanced](https://demos.telerik.com/blazor-ui/drawer/keyboard-navigation) | [Documentation]({%slug drawer-wai-aria-support%}) |
| DropDownButton | Yes | AA | [Enhanced](https://demos.telerik.com/blazor-ui/dropdownbutton/keyboard-navigation) | TBA |
| DropDownList | Yes | AA | [Enhanced](https://demos.telerik.com/blazor-ui/dropdownlist/keyboard-navigation) | [Documentation]({%slug dropdownlist-wai-aria-support%}) |
| DropZone | N/A | N/A | N/A | N/A |
| Editor | Yes | AA | [Enhanced](https://demos.telerik.com/blazor-ui/editor/keyboard-navigation) | [Documentation]({%slug editor-wai-aria-support%}) |
| FileManager | No | AA | Enhanced | TBA |
| FileSelect | No | N/A | [Enhanced](https://demos.telerik.com/blazor-ui/fileselect/keyboard-navigation) | TBA |
| Filter | Yes | AA | [Enhanced](https://demos.telerik.com/blazor-ui/filter/keyboard-navigation) | [Documentation]({%slug filter-wai-aria-support%}) |
| FlatColorPicker | Yes | AA | Enhanced | [Documentation]({%slug flatcolorpicker-wai-aria-support%}) |
| FloatingLabel | N/A | N/A | N/A | N/A |
| Form | No | AA | Standard | N/A |
| Gantt | Yes | AA | [Enhanced](https://demos.telerik.com/blazor-ui/gantt/keyboard-navigation) | [Documentation]({%slug gantt-wai-aria-support%}) |
| Gauge | No | N/A | N/A | N/A |
| Grid | Yes | AA | [Enhanced](https://demos.telerik.com/blazor-ui/grid/keyboard-navigation) | [Documentation]({%slug grid-wai-aria-support%}) |
| GridLayout | No | N/A | N/A | N/A |
| LinearGauge | N/A | AA | N/A | N/A |
| ListView | Yes | AAA | [Enhanced](https://demos.telerik.com/blazor-ui/listview/keyboard-navigation) | [Documentation]({%slug listview-wai-aria-support%}) |
| Loader | No | N/A | N/A | N/A |
| LoaderContainer | No | N/A | N/A | N/A |
| Map | No | N/A | Enhanced | N/A |
| MaskedTextbox | Yes | AA | Standard | [Documentation]({%slug maskedtextbox-wai-aria-support%}) |
| MediaQuery | N/A | N/A | N/A | N/A |
| Menu | Yes | AA | [Enhanced](https://demos.telerik.com/blazor-ui/menu/keyboard-navigation) | [Documentation]({%slug menu-wai-aria-support%}) |
| MultiColumnComboBox | No | N/A | [Enhanced](https://demos.telerik.com/blazor-ui/multicolumncombobox/keyboard-navigation) | N/A |
| MultiSelect | Yes | AA | [Enhanced](https://demos.telerik.com/blazor-ui/multiselect/keyboard-navigation) | [Documentation]({%slug multiselect-wai-aria-support%}) |
| Notification | Yes | AA | N/A | [Documentation]({%slug notification-wai-aria-support%}) |
| NumericTextbox | Yes | AA | [Enhanced](https://demos.telerik.com/blazor-ui/numericTextbox/keyboard-navigation) | [Documentation]({%slug numerictextbox-wai-aria-support%}) |
| Pager | Yes | AA | [Enhanced](https://demos.telerik.com/blazor-ui/pager/keyboard-navigation) | [Documentation]({%slug pager-wai-aria-support%}) |
| PanelBar | Yes | AA | [Enhanced](https://demos.telerik.com/blazor-ui/panelbar/keyboard-navigation) | N/A |
| PdfViewer | Yes | AA | [Enhanced](https://demos.telerik.com/blazor-ui/pdfviewer/overview) | N/A |
| ProgressBar | Yes | AA | N/A | [Documentation]({%slug progressbar-wai-aria-support%}) |
| QRCode | N/A | N/A | N/A | N/A |
| RadialGauge | N/A | AA | N/A | N/A |
| RadioGroup | Yes | AA | [Standard](https://demos.telerik.com/blazor-ui/radiogroup/keyboard-navigation) | [Documentation]({%slug radiogroup-wai-aria-support%}) |
| RangeSlider | Yes | AA | [Enhanced](https://demos.telerik.com/blazor-ui/rangeslider/keyboard-navigation) | [Documentation]({%slug rangeslider-wai-aria-support%}) |
| Scheduler | Yes | AA | [Enhanced](https://demos.telerik.com/blazor-ui/scheduler/keyboard-navigation) | [Documentation]({%slug scheduler-wai-aria-support%}) |
| Signature | Yes | AA | N/A | [Documentation]({%slug signature-wai-aria-support%}) |
| Skeleton | No | N/A | N/A | N/A |
| Slider | Yes | AA | [Enhanced](https://demos.telerik.com/blazor-ui/slider/keyboard-navigation) | [Documentation]({%slug slider-wai-aria-support%}) |
| SplitButton | Yes | AA | [Enhanced](https://demos.telerik.com/blazor-ui/splitbutton/keyboard-navigation) | [Documentation]({%slug splitbutton-wai-aria-support%}) |
| Splitter | Yes | AA | [Enhanced](https://demos.telerik.com/blazor-ui/splitter/keyboard-navigation) | [Documentation]({%slug splitter-wai-aria-support%}) |
| StackLayout | N/A | N/A | N/A | N/A |
| Stepper | Yes | AA | [Enhanced](https://demos.telerik.com/blazor-ui/stepper/keyboard-navigation) | [Documentation]({%slug stepper-wai-aria-support%}) |
| StockChart | No | N/A | N/A | N/A |
| Switch | Yes | AA | [Enhanced](https://demos.telerik.com/blazor-ui/switch/keyboard-navigation) | [Documentation]({%slug switch-wai-aria-support%}) |
| TabStrip | Yes | AA | [Enhanced](https://demos.telerik.com/blazor-ui/tabstrip/keyboard-navigation) | [Documentation]({%slug tabstrip-wai-aria-support%}) |
| TextArea | Yes | AAA | [Standard](https://demos.telerik.com/blazor-ui/textarea/overview) | [Documentation]({%slug textarea-wai-aria-support%}) |
| TextBox | Yes | AA | [Standard](https://demos.telerik.com/blazor-ui/textbox/overview) | [Documentation]({%slug textbox-wai-aria-support%}) |
| TileLayout | Yes | AAA | N/A | [Documentation]({%slug tilelayout-wai-aria-support%}) |
| TimePicker | Yes | AA | [Enhanced](https://demos.telerik.com/blazor-ui/timepicker/keyboard-navigation) | [Documentation]({%slug timepicker-wai-aria-support%}) |
| ToggleButton | Yes | AA | [Enhanced](https://demos.telerik.com/blazor-ui/togglebutton/keyboard-navigation) | [Documentation]({%slug togglebutton-wai-aria-support%}) |
| ToolBar | Yes | AA | [Enhanced](https://demos.telerik.com/blazor-ui/toolbar/keyboard-navigation) | [Documentation]({%slug toolbar-wai-aria-support%}) |
| Tooltip | Yes | AA | N/A | [Documentation]({%slug tooltip-wai-aria-support%}) |
| TreeList | No | N/A | [Enhanced](https://demos.telerik.com/blazor-ui/treelist/keyboard-navigation) | N/A |
| TreeView | Yes | AA | [Enhanced](https://demos.telerik.com/blazor-ui/treeview/keyboard-navigation) | [Documentation]({%slug treeview-wai-aria-support%}) |
| Upload | No | N/A | [Enhanced](https://demos.telerik.com/blazor-ui/upload/keyboard-navigation) | TBA |
| Window | Yes | AA | [Enhanced](https://demos.telerik.com/blazor-ui/window/keyboard-navigation) | [Documentation]({%slug window-wai-aria-support%}) |
| Wizard | Yes | AA | [Enhanced](https://demos.telerik.com/blazor-ui/wizard/keyboard-navigation) | [Documentation]({%slug wizard-wai-aria-support%}) |



## See Also

* [Accessibility Overview]({%slug accessibility-overview%})
* [Globalization Overview]({%slug globalization-overview%})
