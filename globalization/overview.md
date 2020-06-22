---
title: Overview
page_title: Globalization
description: Globalization features in the Telerik UI for Blazor suite.
slug: globalization-overview
tags: telerik,blazor,globalization,overview
published: True
position: 0
---

# Globalization Overview

Internationalization (I18N) is the process of making an app support different languages and regions. In the Telerik UI for Blazor suite, this will consist of the following features:

* [Localization (L10N)]({%slug globalization-localization%}) - the ability to show texts and UI elements in the components in different languages (such as button texts and ARIA attributes).

* [Globalization (G11N)](#date-and-number-formats) - the ability to react to the chosen culture where format strings are involved (such as number and date formats).

* **Right-to-Left Support** - the ability to render the components in a right-to-left direction instead of the default left-to-right direction. This feature will become available in an upcoming release.


## Date And Number Formats

The Telerik Components use the current thread culture to render the appropriate culture-specific format for dates, numbers and currency:

* [Calendar](https://demos.telerik.com/blazor-ui/calendar/globalization) - the names of the months and days of the week are taken from the current culture, and the `FirstDayOfWeek` of the culture is honored when ordering the days of the week. The Calendar uses the  `ShortestDayNames` array to get the short names for the days of the week and it expects them in the default order coming from the framework - Sunday to Saturday.

* [Chart](https://demos.telerik.com/blazor-ui/chart/globalization) - the [Label Format Strings]({%slug components/chart/label-template-format%}) and [Tooltip]({%slug chart-tooltip-overview%}) are culture aware (e.g., currency, dates).

* [DateInput](https://demos.telerik.com/blazor-ui/dateinput/globalization) - @[template](/_contentTemplates/common/general-info.md#date-format-per-culture)

* [DatePicker](https://demos.telerik.com/blazor-ui/datepicker/globalization) - @[template](/_contentTemplates/common/general-info.md#date-format-per-culture)

* [DateTimePicker](https://demos.telerik.com/blazor-ui/datetimepicker/globalization) - @[template](/_contentTemplates/common/general-info.md#date-format-per-culture)

* [Grid](https://demos.telerik.com/blazor-ui/grid/globalization) - the various inputs and editors are Telerik components and respond to the culture. Custom code and format strings in the templates will also default to using the current culture unless you explicitly use a certain culture in them.

* [NumericTextBox](https://demos.telerik.com/blazor-ui/numerictextbox/globalization) - the `Format` (for example, currency), decimal separator, group separator and default number of `Decimals` are taken from the current culture.

* [Scheduler](https://demos.telerik.com/blazor-ui/scheduler/globalization) - Date formats are taken from the culture, in the week view the first day of the week is also taken from the culture even if it does not match the `Date`. The various inputs and editors in the edit form are Telerik components and respond to the culture.

* [TimePicker](https://demos.telerik.com/blazor-ui/timepicker/globalization) - @[template](/_contentTemplates/common/general-info.md#date-format-per-culture)



## See Also

  * [Localization]({%slug globalization-localization%})
  * [Supported Date Formats]({%slug components/dateinput/supported-formats%})
