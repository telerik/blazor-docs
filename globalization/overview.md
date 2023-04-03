---
title: Overview
page_title: Globalization
description: Learn which globalization features are supported in the Telerik UI for Blazor components suite.
slug: globalization-overview
tags: telerik,blazor,globalization,overview
published: True
position: 0
---

# Blazor Globalization Overview

Internationalization (I18N) is the process of making an app support different languages and regions. In the Telerik UI for Blazor suite, this will consist of the following features:

* [Localization (L10N)]({%slug globalization-localization%}) - the ability to show texts and UI elements in the components in different languages (such as button texts and ARIA attributes).

* [Globalization (G11N)](#date-and-number-formats) - the ability to react to the chosen culture where format strings are involved (such as number and date formats).

* **Right-to-Left Support** - the ability to render the components in a right-to-left direction instead of the default left-to-right direction. This feature will become available in an upcoming release.


## Internationalization Support

| Component | Globalization | Localization| Right-to-Left |
|---|---|---|---|
| `Avatar` | `n/a` | `n/a` | [`Yes`]() |
| `ArcGauge` |  | `n/a` | [`Yes`]() |
| `AutoComplete` | `n/a` | [`Yes`](https://demos.telerik.com/blazor-ui/autocomplete/localization) | [`Yes`]() |
| `Barcodes` | `n/a` | `n/a` | `n/a` |
| `Breadcrumb` | `n/a` | `n/a` | [`Yes`]() |
| `Button` | `n/a` | `n/a` | [`Yes`]() |
| `ButtonGroup` | `n/a` | `n/a` | [`Yes`]() |
| `Calendar` | [`Yes`](https://demos.telerik.com/blazor-ui/calendar/globalization) |  | [`Yes`]() |
| `Card` | `n/a` | `n/a` | [`Yes`]() |
| `Carousel` | `n/a` |  | [`Yes`]() |
| `Charts` | [`Yes`](https://demos.telerik.com/blazor-ui/chart/globalization) | `n/a` | [`Yes`]() |
| `Checkbox` | `n/a` | `n/a` | [`Yes`]() |
| `Chip` | `n/a` | `n/a` | [`Yes`]() |
| `ChipList` | `n/a` | `n/a` | [`Yes`]() |
| `ChunkProgressBar` | `n/a` | `n/a` | [`Yes`]() |
| `CircularGauge` |  | `n/a` | [`Yes`]() |
| `ColorGradient` | `n/a` |  | [`Yes`]() |
| `ColorPalette` | `n/a` |  | [`Yes`]() |
| `ColorPicker` | `n/a` |  | [`Yes`]() |
| `ComboBox` | `n/a` | [`Yes`](https://demos.telerik.com/blazor-ui/combobox/localization) | [`Yes`]() |
| `ContextMenu` | `n/a` | `n/a` | [`Yes`]() |
| `DateInput` | [`Yes`](https://demos.telerik.com/blazor-ui/dateinput/globalization) |  | [`Yes`]() |
| `DatePicker` | [`Yes`](https://demos.telerik.com/blazor-ui/datepicker/globalization) |  | [`Yes`]() |
| `DateRangePicker` | [`Yes`](https://demos.telerik.com/blazor-ui/daterangepicker/globalization) |  | [`Yes`]() |
| `DateTimePicker` | [`Yes`](https://demos.telerik.com/blazor-ui/datetimepicker/globalization) |  | [`Yes`]() |
| `Dialog` | `n/a` |  | [`Yes`]() |
| `Drawer` | `n/a` | `n/a` | [`Yes`]() |
| `DropDownList` | `n/a` |  | [`Yes`]() |
| `DropZone` | `n/a` |  | [`Yes`]() |
| `Editor` | `n/a` | [`Yes`](https://demos.telerik.com/blazor-ui/editor/localization) | [`Yes`]() |
| `FileManager` | `n/a` | [`Yes`](https://demos.telerik.com/blazor-ui/filemanager/localization) | [`Yes`]() |
| `FileSelect` | `n/a` | [`Yes`](https://demos.telerik.com/blazor-ui/fileselect/globalization) | [`Yes`]() |
| `Filter` |  | [`Yes`](https://demos.telerik.com/blazor-ui/filter/localization) | [`Yes`]() |
| `FlatColorPicker` | `n/a` |  | [`Yes`]() |
| `FloatingLabel` | `n/a` | `n/a` | [`Yes`]() |
| `FontIcon` | `n/a` | `n/a` | `n/a` |
| `Form` |  | [`Yes`](https://demos.telerik.com/blazor-ui/form/localization) | [`Yes`]() |
| `Gantt` |  |  | [`Yes`]() |
| `Grid` | [`Yes`](https://demos.telerik.com/blazor-ui/grid/globalization) | [`Yes`](https://demos.telerik.com/blazor-ui/grid/globalization) | [`Yes`]() |
| `GridLayout` | `n/a` | `n/a` | [`Yes`]() |
| `LinearGauge` |  |  | [`Yes`]() |
| `ListView` |  | `n/a` | [`Yes`]() |
| `Loader` | `n/a` | `n/a` | `n/a` |
| `LoaderContainer` | `n/a` | `n/a` | [`Yes`]() |
| `Map` | `n/a` | `n/a` | [`Yes`]() |
| `MaskedTextBox` | `n/a` | `n/a` | [`Yes`]() |
| `MediaQuery` | `n/a` | `n/a` | `n/a` |
| `Menu` | `n/a` | `n/a` | [`Yes`]() |
| `MultiColumnComboBox` | `n/a` | [`Yes`](https://demos.telerik.com/blazor-ui/multicolumncombobox/localization) | [`Yes`]() |
| `MultiSelect` | `n/a` | [`Yes`](https://demos.telerik.com/blazor-ui/multiselect/localization) | [`Yes`]() |
| `Notification` | `n/a` |  | [`Yes`]() |
| `NumericTextBox` | [`Yes`](https://demos.telerik.com/blazor-ui/numerictextbox/globalization) |  | [`Yes`]() |
| `Pager` | `n/a` | [`Yes`](https://demos.telerik.com/blazor-ui/pager/localization) | [`Yes`]() |
| `PanelBar` | `n/a` | `n/a` | [`Yes`]() |
| `PdfViewer` | `n/a` | [`Yes`](https://demos.telerik.com/blazor-ui/pdfviewer/localization) | [`Yes`]() |
| `Popup` | `n/a` | `n/a` | [`Yes`]() |
| `ProgressBar` | `n/a` | `n/a` | [`Yes`]() |
| `QRCode` | `n/a` | `n/a` | `n/a` |
| `RadialGauge` |  | `n/a` | [`Yes`]() |
| `RadioGroup` | `n/a` | `n/a` | [`Yes`]() |
| `RangeSlider` | [`Yes`](https://demos.telerik.com/blazor-ui/rangeslider/globalization) |  | [`Yes`]() |
| `Scheduler` | [`Yes`](https://demos.telerik.com/blazor-ui/scheduler/globalization) |  | [`Yes`]() |
| `Signature` | `n/a` |  | [`Yes`]() |
| `Skeleton` | `n/a` | `n/a` | [`Yes`]() |
| `Slider` | [`Yes`](https://demos.telerik.com/blazor-ui/slider/globalization) |  | [`Yes`]() |
| `SplitButton` | `n/a` |  | [`Yes`]() |
| `Splitter` | `n/a` | `n/a` | [`Yes`]() |
| `StackLayout` | `n/a` | `n/a` | [`Yes`]() |
| `Stepper` | `n/a` | [`Yes`](https://demos.telerik.com/blazor-ui/stepper/localization) | [`Yes`]() |
| `SvgIcon` | `n/a` | `n/a` | `n/a` |
| `Switch` | `n/a` | [`Yes`](https://demos.telerik.com/blazor-ui/switch/localization) | [`Yes`]() |
| `TabStrip` | `n/a` |  | [`Yes`]() |
| `TextArea` |  | `n/a` | [`Yes`]() |
| `TextBox` |  | `n/a` | [`Yes`]() |
| `TileLayout` | `n/a` | `n/a` | [`Yes`]() |
| `TimePicker` | [`Yes`](https://demos.telerik.com/blazor-ui/timepicker/globalization) |  | [`Yes`]() |
| `ToggleButton` | `n/a` | `n/a` | [`Yes`]() |
| `ToolBar` | `n/a` | `n/a` | [`Yes`]() |
| `Tooltip` | `n/a` | `n/a` | `n/a` |
| `TreeList` | [`Yes`](https://demos.telerik.com/blazor-ui/treelist/globalization) |  | [`Yes`]() |
| `TreeView` | `n/a` | `n/a` | [`Yes`]() |
| `Upload` | [`Yes`](https://demos.telerik.com/blazor-ui/upload/globalization) |  | [`Yes`]() |
| `ValidationSummary` | `n/a` | [`Yes`](https://demos.telerik.com/blazor-ui/validation/validation-summary/localization) | [`Yes`]() |
| `ValidationMessage` | `n/a` | [`Yes`](https://demos.telerik.com/blazor-ui/validation/validation-message/localization) | [`Yes`]() |
| `ValidationTooltip` | `n/a` | [`Yes`](https://demos.telerik.com/blazor-ui/validation/validation-tooltip/localization) | [`Yes`]() |
| `Window` | `n/a` | `n/a` | [`Yes`]() |
| `Wizard` | `n/a` | [`Yes`](https://demos.telerik.com/blazor-ui/wizard/localization) | [`Yes`]() |





## Date And Number Formats

The Telerik Components use the current thread culture to render the appropriate culture-specific format for dates, numbers and currency:

* [Calendar](https://demos.telerik.com/blazor-ui/calendar/globalization) - the names of the months and days of the week are taken from the current culture, and the `FirstDayOfWeek` of the culture is honored when ordering the days of the week. The Calendar uses the  `ShortestDayNames` array to get the short names for the days of the week and it expects them in the default order coming from the framework - Sunday to Saturday.

* [Chart](https://demos.telerik.com/blazor-ui/chart/globalization) - the [Label Format Strings]({%slug components/chart/label-template-format%}) and [Tooltip]({%slug chart-tooltip-overview%}) are culture aware (e.g., currency, dates). You can find examples in the [How to localize numeric labels in the Chart]({%slug chart-kb-localized-numeric-labels%}) knowledge base article.

* [DateInput](https://demos.telerik.com/blazor-ui/dateinput/globalization) - @[template](/_contentTemplates/common/general-info.md#date-format-per-culture)

* [DatePicker](https://demos.telerik.com/blazor-ui/datepicker/globalization) - @[template](/_contentTemplates/common/general-info.md#date-format-per-culture)

* [DateRangePicker](https://demos.telerik.com/blazor-ui/daterangepicker/globalization) - @[template](/_contentTemplates/common/general-info.md#date-format-per-culture)

* [DateTimePicker](https://demos.telerik.com/blazor-ui/datetimepicker/globalization) - @[template](/_contentTemplates/common/general-info.md#date-format-per-culture)

* [Grid](https://demos.telerik.com/blazor-ui/grid/globalization) - the various inputs and editors are Telerik components and respond to the culture. Custom code and format strings in the templates will also default to using the current culture unless you explicitly use a certain culture in them.

* [NumericTextBox](https://demos.telerik.com/blazor-ui/numerictextbox/globalization) - the `Format` (for example, currency), decimal separator, group separator and default number of `Decimals` are taken from the current culture.

* [RangeSlider](https://demos.telerik.com/blazor-ui/rangeslider/globalization) - The labels on the large ticks are formatted according to the current culture and its default decimals.

* [Scheduler](https://demos.telerik.com/blazor-ui/scheduler/globalization) - Date formats are taken from the culture, in the week view the first day of the week is also taken from the culture even if it does not match the `Date`. The various inputs and editors in the edit form are Telerik components and respond to the culture.

* [Slider](https://demos.telerik.com/blazor-ui/slider/globalization) - The labels on the large ticks are formatted according to the current culture and its default decimals.

* [TimePicker](https://demos.telerik.com/blazor-ui/timepicker/globalization) - @[template](/_contentTemplates/common/general-info.md#date-format-per-culture)

* [TreeList](https://demos.telerik.com/blazor-ui/treelist/globalization) - the various inputs and editors are Telerik components and respond to the culture. Custom code and format strings in the templates will also default to using the current culture unless you explicitly use a certain culture in them.

## See Also

  * [Localization]({%slug globalization-localization%})
  * [Supported Date Formats]({%slug components/dateinput/supported-formats%})
