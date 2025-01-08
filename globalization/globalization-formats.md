---
title: Globalization Formats
page_title: Globalization Formats
description: Learn which Telerik UI for Blazor components support globalization of date and number formats.
slug: globalization-formats
tags: telerik,blazor,globalization,date,number,formats
published: True
position: 3
---

# Globalization of Date And Number Formats

The Telerik UI for Blazor components use the culture of the current thread to render the appropriate culture-specific format for dates, numbers, and currency.

| Component | Date And Number Format Specifics |
|---|---|
| [Calendar](https://demos.telerik.com/blazor-ui/calendar/globalization) | The names of the months and days of the week are taken from the current culture, and the `FirstDayOfWeek` of the culture is honored when ordering the days of the week. The Calendar uses the  `ShortestDayNames` array to get the short names for the days of the week and it expects them in the default order coming from the framework - Sunday to Saturday. |
| [Chart](https://demos.telerik.com/blazor-ui/chart/globalization) | The [Label Format Strings](slug://components/chart/label-template-format) and [Tooltip](slug://chart-tooltip-overview) allow using culture-aware content such as formatted numbers and dates. You can find examples at [How to localize numeric labels in the Chart](slug://chart-kb-localized-numeric-labels) and at [Render culture-aware date axis labels](https://feedback.telerik.com/blazor/1629173-render-culture-aware-labels-on-the-date-axis). |
| [DateInput](https://demos.telerik.com/blazor-ui/dateinput/globalization) | @[template](/_contentTemplates/common/general-info.md#date-format-per-culture) |
| [DatePicker](https://demos.telerik.com/blazor-ui/datepicker/globalization) | @[template](/_contentTemplates/common/general-info.md#date-format-per-culture) |
| [DateRangePicker](https://demos.telerik.com/blazor-ui/daterangepicker/globalization) | @[template](/_contentTemplates/common/general-info.md#date-format-per-culture) |
| [DateTimePicker](https://demos.telerik.com/blazor-ui/datetimepicker/globalization) | @[template](/_contentTemplates/common/general-info.md#date-format-per-culture) |
| [Grid](https://demos.telerik.com/blazor-ui/grid/globalization) | The various inputs and editors are Telerik components and respond to the culture. Custom code and format strings in the templates will also default to using the current culture unless you explicitly use a certain culture in them. |
| [NumericTextBox](https://demos.telerik.com/blazor-ui/numerictextbox/globalization) | The `Format` (for example, currency), decimal separator, group separator and default number of `Decimals` are taken from the current culture. |
| [RangeSlider](https://demos.telerik.com/blazor-ui/rangeslider/globalization) | The labels on the large ticks are formatted according to the current culture and its default decimals. |
| [Scheduler](https://demos.telerik.com/blazor-ui/scheduler/globalization) | Date formats are taken from the culture, in the week view the first day of the week is also taken from the culture even if it does not match the `Date`. The various inputs and editors in the edit form are Telerik components and respond to the culture. |
| [Slider](https://demos.telerik.com/blazor-ui/slider/globalization) | The labels on the large ticks are formatted according to the current culture and its default decimals. |
| [TimePicker](https://demos.telerik.com/blazor-ui/timepicker/globalization) | @[template](/_contentTemplates/common/general-info.md#date-format-per-culture) |
| [TreeList](https://demos.telerik.com/blazor-ui/treelist/globalization) | The various inputs and editors are Telerik components and respond to the culture. Custom code and format strings in the templates will also default to using the current culture unless you explicitly use a certain culture in them. |

## See Also

* [Localization](slug://globalization-localization)
* [Supported Date Formats](slug://components/dateinput/supported-formats)
