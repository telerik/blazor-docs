---
title: WCAG, Section 508, WAI-ARIA
page_title: WCAG, Section 508, WAI-ARIA
description: Accessibility standards - WCAG, Section 508, WAI-ARIA.
slug: accessibility-standards
tags: telerik,blazor,accessibility,standards
published: True
position: 1
---

# WCAG, Section 508, WAI-ARIA

There are several standards, policies and principles that govern how accessible applications and components are created. This article offers an overview of them. For a list of the accessibility compliance levels support provided by the Telerik UI for Blazor components see the [Telerik UI for Blazor Accessibility Compliance]({%slug accessibility-compliance%}) article.

In this article you will find information on the general topics of accessibility:


* [Standards and Policies](#standards-and-policies)
	* [Section 508](#section-508)
	* [W3C Web Content Accessibility Guidelines (WCAG) 2.2](#w3c-web-content-accessibility-guidelines-wcag-22)
* [Technical Specifications](#technical-specifications)
	* [WAI-ARIA](#wai-aria)
	* [Keyboard Navigation](#keyboard-navigation)
* [Accessibility Compliance Components Table](#accessibility-compliance-components-table)


## Standards and Policies

Accessible websites and applications normally comply with some or all of the following standards:

* [Section 508](#section-508)
* [W3C Web Content Accessibility Guidelines (WCAG) 2.2](#w3c-web-content-accessibility-guidelines-wcag-22)

### Section 508

Since 1998, Section 508 is part of the [U.S. Rehabilitation Act of 1973](https://en.wikipedia.org/wiki/Rehabilitation_Act_of_1973). Section 508 represents a set of accessibility standards which were defined by the U.S. General Services Administration (GSA) and which initially applied to Federal agencies only with the aim to ensure that their electronic and information technology is accessible to people with disabilities.

[In 2017, Section 508 was reorganized](https://www.access-board.gov/guidelines-and-standards/communications-and-it/about-the-ict-refresh/overview-of-the-final-rule) to meet and reflect recent communication technology innovations and nowadays the Section 508 guidelines impact not only all U.S. Federal agencies, but also affect any company which does business with a Federal agency. Such companies include vendors, private contractors, financial industry, healthcare and legal organizations, and partners of those agencies which operate in the United States or abroad.

For more information, refer to:

* [Rehabilitation Act of 1973 Section 508 (Latest Amendment)](https://www.access-board.gov/the-board/laws/rehabilitation-act-of-1973#508)
* [Telerik UI for Blazor Accessibility Compliance]({%slug accessibility-compliance%})


### W3C Web Content Accessibility Guidelines (WCAG) 2.2

The Web Content Accessibility Guidelines (WCAG) which are set by the World Wide Web Consortium (W3C) define recommendations for making web content accessible to people with physical and cognitive disabilities. WCAG defines accessibility principles with their respective success criteria. Depending on the implemented success criteria by a web application, the WCAG provide the A, `AA`, and AAA levels of accessibility conformance.

For more information, refer to:

* [WCAG 2 Quick Reference Guide](https://www.w3.org/WAI/WCAG21/quickref/)
* [WCAG 2.2 Guidelines](https://www.w3.org/TR/WCAG22)
* [Dragging Movements](https://www.w3.org/WAI/WCAG22/Understanding/dragging-movements)
* [Telerik UI for Blazor Accessibility Compliance]({%slug accessibility-compliance%})


## Technical Specifications

* [WAI-ARIA](#wai-aria)
* [Keyboard navigation](#keyboard-navigation)

### WAI-ARIA

WAI-ARIA is a set of technical specifications which were developed by the W3C and which provide the semantics for the assistive technologies to access and interpret web content and web applications. The WAI-ARIA recommendations (standards) divide the semantics into roles and into states and properties which those roles support. For example, a [`checkbox` role](https://www.w3.org/TR/wai-aria-1.1/#checkbox) supports the [`aria-checked`](https://www.w3.org/TR/wai-aria-1.1/#aria-checked) state which indicates whether a checkbox, radio button, or a similar UI element is checked.

The WAI-ARIA framework targets web developers who create web applications by using AJAX, scripting, and other rich application techniques.

For more information, refer to:

* [Accessible Rich Internet Applications (WAI-ARIA) 1.1](https://www.w3.org/TR/wai-aria-1.1/)
* [WAI-ARIA Role Definitions](https://www.w3.org/TR/wai-aria-1.1/#role_definitions)
* [WAI-ARIA State and Property Definitions](https://www.w3.org/TR/wai-aria-1.1/#state_prop_def)
* [Telerik UI for Blazor Accessibility Compliance]({%slug accessibility-compliance%})

### Keyboard Navigation

By default, users can only navigate to links, buttons, and form controls with a keyboard. The navigation order in which interactive items receive keyboard focus has to be logical and intuitive. Generally, keyboard navigation logic needs to follow the visual horizontal and vertical flow of the page. For example, left to right and top to bottom, header first followed by the main and then the page navigation.

[Keyboard accessibility](https://www.w3.org/WAI/WCAG21/quickref/#keyboard-accessible) is a category under the [WCAG Operable principle](https://www.w3.org/WAI/WCAG21/quickref/#principle2).

In WCAG 2.2, the keyboard accessible category provides the following success criteria:

* [Keyboard](https://www.w3.org/WAI/WCAG21/quickref/#keyboard)
* [No Keyboard Trap](https://www.w3.org/WAI/WCAG21/quickref/#no-keyboard-trap)
* [Keyboard (No Exception)](https://www.w3.org/WAI/WCAG21/quickref/#keyboard-no-exception)
* [Character Key Shortcuts](https://www.w3.org/WAI/WCAG21/quickref/#character-key-shortcuts)

See the [Keyboard Support in Telerik UI for Blazor]({%slug accessibility-keyboard-navigation%}) article for more details on using the Telerik components with the keyboard.

> The described level of compliance in the table below is achievable with the [**Ocean Blue Sass Swatch**]({%slug themes-accessibility-swatch%}) and the **Default Ocean Blue A11Y**.

### Accessibility Compliance Components Table
The following table lists the Section 508 and WCAG 2 compliance levels of support for the Blazor UI components. 

|Component |508|WCAG 2.2| Accessibility Example | Accessibility Documentation |
|:---          |:---|:---|:---|:---
|`AutoComplete`|`Yes`|`AA`| [Demo](https://demos.telerik.com/blazor-ui/autocomplete/keyboard-navigation) | [Documentation]({%slug autocomplete-wai-aria-support%}) |
|`Barcodes`|`No`|`n/a`| `n/a` | `n/a` |
|`Breadcrumb`|`Yes`|`AAA`| [Demo](https://demos.telerik.com/blazor-ui/breadcrumb/keyboard-navigation) | [Documentation]({%slug breadcrumb-wai-aria-support%}) |
|`Button`|`Yes`|`AAA`| [Demo](https://demos.telerik.com/blazor-ui/button/keyboard-navigation) | [Documentation]({%slug button-wai-aria-support%}) |
|`ButtonGroup`|`Yes`|`AAA`| [Demo](https://demos.telerik.com/blazor-ui/buttongroup/keyboard-navigation) | [Documentation]({%slug buttongroup-wai-aria-support%}) |
|`Calendar`|`Yes`|`AAA`| [Demo](https://demos.telerik.com/blazor-ui/calendar/keyboard-navigation) | [Documentation]({%slug calendar-wai-aria-support%}) |
|`Card`|`No`|`n/a`| `n/a` | `n/a` |
|`Carousel`|`Yes`|`AA`| [Demo](https://demos.telerik.com/blazor-ui/carousel/keyboard-navigation) | [Documentation]({%slug carousel-wai-aria-support%}) |
|`Charts`|`Yes`|`AA`| [Demo](https://demos.telerik.com/blazor-ui/chart/keyboard-navigation) | Documentation |
|`CheckBox`|`Yes`|`AA`| `n/a` | [Documentation]({%slug checkbox-wai-aria-support%}) |
|`ChunkProgressBar`|`Yes`|`AA`| `n/a` | [Documentation]({%slug chunkprogressbar-wai-aria-support%}) |
|`ColorGradient`|`Yes`|`AA`| [Demo](https://demos.telerik.com/blazor-ui/colorgradient/keyboard-navigation) | [Documentation]({%slug colorgradient-wai-aria-support%}) |
|`ColorPalette`|`Yes`|`AA`| [Demo](https://demos.telerik.com/blazor-ui/colorpalette/keyboard-navigation) | [Documentation]({%slug colorpalette-wai-aria-support%}) |
|`ColorPicker`|`Yes`|`AA`| `n/a` | [Documentation]({%slug colorpicker-wai-aria-support%}) |
|`ComboBox`|`Yes`|`AA`| [Demo](https://demos.telerik.com/blazor-ui/combobox/keyboard-navigation) | [Documentation]({%slug combobox-wai-aria-support%}) |
|`Context Menu`|`Yes`|`AA`| [Demo](https://demos.telerik.com/blazor-ui/contextmenu/keyboard-navigation) | [Documentation]({%slug contextmenu-wai-aria-support%}) |
|`Date Input`|`Yes`|`AA`| [Demo](https://demos.telerik.com/blazor-ui/dateinput/keyboard-navigation) | [Documentation]({%slug dateinput-wai-aria-support%}) |
|`Date Picker`|`Yes`|`AA`| [Demo](https://demos.telerik.com/blazor-ui/datepicker/keyboard-navigation) | [Documentation]({%slug datepicker-wai-aria-support%}) |
|`DateRange Picker`|`Yes`|`AA`| [Demo](https://demos.telerik.com/blazor-ui/daterangepicker/keyboard-navigation) | [Documentation]({%slug daterangepicker-wai-aria-support%}) |
|`DateTime Picker`|`Yes`|`AA`| [Demo](https://demos.telerik.com/blazor-ui/datetimepicker/keyboard-navigation) | [Documentation]({%slug datetimepicker-wai-aria-support%}) |
|`Dialog`|`Yes`|`AA`| `n/a` | [Documentation]({%slug dialog-wai-aria-support%}) |
|`Drawer`|`Yes`|`AA`| [Demo](https://demos.telerik.com/blazor-ui/drawer/keyboard-navigation) | [Documentation]({%slug drawer-wai-aria-support%}) |
|`DropDownList`|`Yes`|`AA`| [Demo](https://demos.telerik.com/blazor-ui/dropdownlist/keyboard-navigation) | [Documentation]({%slug dropdownlist-wai-aria-support%}) |
|`Editor`|`Yes`|`AA`| [Demo](https://demos.telerik.com/blazor-ui/editor/keyboard-navigation) | [Documentation]({%slug editor-wai-aria-support%}) |
|`FileManager`|`No`|`n/a`| `n/a` | `n/a` |
|`FileSelect`|`No`|`n/a`| `n/a` | `n/a` |
|`Filter`|`Yes`|`AA`| [Demo](https://demos.telerik.com/blazor-ui/filter/keyboard-navigation) | [Documentation]({%slug filter-wai-aria-support%}) |
|`FlatColorPicker`|`Yes`|`AA`| `n/a` | [Documentation]({%slug flatcolorpicker-wai-aria-support%}) |
|`FloatingLabel`|`No`|`n/a`| `n/a` | `n/a` |
|`Form`|`No`|`n/a`| `n/a` | `n/a` |
|`Gantt`|`Yes`|`AA`| `n/a` | [Documentation]({%slug gantt-wai-aria-support%}) |
|`Gauges`|`No`|`n/a`| `n/a` | `n/a` |
|`Grid`|`Yes`|`AA`| [Demo](https://demos.telerik.com/blazor-ui/grid/keyboard-navigation) | [Documentation]({%slug grid-wai-aria-support%}) |
|`Grid Layout`|`No`|`n/a`| `n/a` | `n/a` |
|`ListView`|`Yes`|`AAA`| `n/a` | [Documentation]({%slug listview-wai-aria-support%}) |
|`Loader`|`No`|`n/a`| `n/a` | `n/a` |
|`LoaderContainer`|`No`|`n/a`| `n/a` | `n/a` |
|`Map`|`No`|`n/a`| `n/a` | `n/a` |
|`MaskedTextbox`|`Yes`|`AA`| `n/a` | [Documentation]({%slug maskedtextbox-wai-aria-support%}) |
|`MediaQuery`|`No`|`n/a`| `n/a` | `n/a` |
|`Menu`|`Yes`|`AA`| [Demo](https://demos.telerik.com/blazor-ui/menu/keyboard-navigation) | [Documentation]({%slug menu-wai-aria-support%}) |
|`MultiColumnComboBox`|`No`|`n/a`| `n/a` | `n/a` |
|`MultiSelect`|`Yes`|`AA`| [Demo](https://demos.telerik.com/blazor-ui/multiselect/keyboard-navigation) | [Documentation]({%slug multiselect-wai-aria-support%}) |
|`Notification`|`Yes`|`AA`| `n/a` | [Documentation]({%slug notification-wai-aria-support%}) |
|`NumericTextbox`|`Yes`|`AA`| [Demo](https://demos.telerik.com/blazor-ui/numericTextbox/keyboard-navigation) | [Documentation]({%slug numerictextbox-wai-aria-support%}) |
|`Pager`|`Yes`|`AA`| [Demo](https://demos.telerik.com/blazor-ui/pager/keyboard-navigation) | [Documentation]({%slug pager-wai-aria-support%}) |
|`PanelBar`|`No`|`n/a`| `n/a` | `n/a` |
|`PDF Viewer`|`No`|`n/a`| `n/a` | `n/a` |
|`ProgressBar`|`Yes`|`AA`| `n/a` | [Documentation]({%slug progressbar-wai-aria-support%}) |
|`RadioGroup`|`Yes`|`AA`| [Demo](https://demos.telerik.com/blazor-ui/radiogroup/keyboard-navigation) | [Documentation]({%slug radiogroup-wai-aria-support%}) |
|`Range Slider`|`Yes`|`AA`| [Demo](https://demos.telerik.com/blazor-ui/rangeslider/keyboard-navigation) | [Documentation]({%slug rangeslider-wai-aria-support%}) |
|`Scheduler`|`Yes`|`AA`| [Demo](https://demos.telerik.com/blazor-ui/scheduler/keyboard-navigation) | [Documentation]({%slug scheduler-wai-aria-support%}) |
|`Signature`|`Yes`|`AA`| `n/a` | [Documentation]({%slug signature-wai-aria-support%}) |
|`Skeleton`|`No`|`n/a`| `n/a` | `n/a` |
|`Slider`|`Yes`|`AA`| [Demo](https://demos.telerik.com/blazor-ui/slider/keyboard-navigation) | [Documentation]({%slug slider-wai-aria-support%}) |
|`SplitButton`|`Yes`|`AA`| [Demo](https://demos.telerik.com/blazor-ui/splitbutton/keyboard-navigation) | [Documentation]({%slug splitbutton-wai-aria-support%}) |
|`Splitter`|`Yes`|`AA`| [Demo](https://demos.telerik.com/blazor-ui/splitter/keyboard-navigation) | [Documentation]({%slug splitter-wai-aria-support%}) |
|`Stack Layout`|`No`|`n/a`| `n/a` | `n/a` |
|`Stepper`|`Yes`|`AA`| [Demo](https://demos.telerik.com/blazor-ui/stepper/keyboard-navigation) | [Documentation]({%slug stepper-wai-aria-support%}) |
|`Stock Chart`|`No`|`n/a`| `n/a` | `n/a` |
|`Switch`|`Yes`|`AA`| [Demo](https://demos.telerik.com/blazor-ui/switch/keyboard-navigation) | [Documentation]({%slug switch-wai-aria-support%}) |
|`TabStrip`|`Yes`|`AA`| [Demo](https://demos.telerik.com/blazor-ui/tabstrip/keyboard-navigation) | [Documentation]({%slug tabstrip-wai-aria-support%}) |
|`TextArea`|`Yes`|`AAA`| `n/a` | [Documentation]({%slug textarea-wai-aria-support%}) |
|`TextBox`|`Yes`|`AA`| `n/a` | [Documentation]({%slug textbox-wai-aria-support%}) |
|`TileLayout`|`Yes`|`AAA`| `n/a` | [Documentation]({%slug tilelayout-wai-aria-support%}) |
|`TimePicker`|`Yes`|`AA`| [Demo](https://demos.telerik.com/blazor-ui/timepicker/keyboard-navigation) | [Documentation]({%slug timepicker-wai-aria-support%}) |
|`ToggleButton`|`Yes`|`AA`| [Demo](https://demos.telerik.com/blazor-ui/togglebutton/keyboard-navigation) | [Documentation]({%slug togglebutton-wai-aria-support%}) |
|`ToolBar`|`Yes`|`AA`| [Demo](https://demos.telerik.com/blazor-ui/toolbar/keyboard-navigation) | [Documentation]({%slug toolbar-wai-aria-support%}) |
|`Tooltip`|`Yes`|`AA`| `n/a` | [Documentation]({%slug tooltip-wai-aria-support%}) |
|`TreeList`|`No`|`n/a`| `n/a` | `n/a` |
|`TreeView`|`Yes`|`AA`| [Demo](https://demos.telerik.com/blazor-ui/treeView/keyboard-navigation) | [Documentation]({%slug treeview-wai-aria-support%}) |
|`Upload`|`No`|`n/a`| `n/a` | `n/a` |
|`Window`|`Yes`|`AA`| [Demo](https://demos.telerik.com/blazor-ui/window/keyboard-navigation) | [Documentation]({%slug window-wai-aria-support%}) |
|`Wizard`|`Yes`|`AA`| [Demo](https://demos.telerik.com/blazor-ui/wizard/keyboard-navigation) | [Documentation]({%slug wizard-wai-aria-support%}) |

## See Also

  * [GSA Government-Wide Section 508 Accessibility Program](https://www.section508.gov/)
  * [WCAG 2 Quick Reference Guide](https://www.w3.org/WAI/WCAG21/quickref/)
  * [WAI-ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices/)
  * [WCAG Keyboard Accessible Category](https://www.w3.org/WAI/WCAG21/quickref/#keyboard-accessible)
  * [Telerik UI for Blazor Accessibility Overview]({%slug accessibility-overview%})
  * [Telerik UI for Blazor Globalization Overview]({%slug globalization-overview%})
  * [Telerik UI for Blazor Accessibility Compliance]({%slug accessibility-compliance%})

