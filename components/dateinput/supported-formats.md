---
title: Supported Formats
page_title: DateInput for Blazor | Supported Formats
description: Supported date adn time formats in the DateInput for Blazor
slug: components/dateinput/supported-formats
tags: telerik,blazor,DateInput,format,formats
published: true
position: 5
---

# Supported Date Formats

This article explains the format strings and specifiers supported by the Telerik DateInput for Blazor.

The `Format` property can take a number of possible format strings, and this is a list of the supported options and their effects.

The .NET framework supports a list of format specifiers for dates that you can use to build your own format strings: [https://docs.microsoft.com/en-us/dotnet/standard/base-types/custom-date-and-time-format-strings](https://docs.microsoft.com/en-us/dotnet/standard/base-types/custom-date-and-time-format-strings). The Telerik Date Input steps on them and carries over as many as possible to the client-side to validate and facilitate user input.

>caption Using supported .NET format specifiers to define date format in the Telerik Date Input

````CSHTML
@using Telerik.Blazor.Components.DateInput

<TelerikDateInput @bind-Value="TheDate" Format="d/M/y" /> @TheDate.ToString("d/M/y")
<br />
<TelerikDateInput @bind-Value="TheDate" Format="dd/MM/yy" /> @TheDate.ToString("dd/MM/yy")
<br />
<TelerikDateInput @bind-Value="TheDate" Format="dd/MMM/yyyy" /> @TheDate.ToString("dd/MMM/yyyy")
<br />
<TelerikDateInput @bind-Value="TheDate" Format="HH:mm:ss" /> @TheDate.ToString("HH:mm:ss")
<br />
<TelerikDateInput @bind-Value="TheDate" Format="dd/MMM/yyyy H:mm:ss" /> @TheDate.ToString("dd/MMM/yyyy H:mm:ss")
<br />
<TelerikDateInput @bind-Value="TheDate" Format="dd/MMMM/yyyy HH:mm:ss" /> @TheDate.ToString("dd/MMMM/yyyy HH:mm:ss")
<br />
<TelerikDateInput @bind-Value="TheDate" Format="'dd/mm/yyyy date:' dd/MM/yyyy" /> @TheDate.ToString("'dd/mm/yyyy date:' dd/MM/yyyy")
<br />
<TelerikDateInput @bind-Value="TheDate" Format="dd-MM-yyyy" /> @TheDate.ToString("dd-MM-yyyy")
<br />
<TelerikDateInput @bind-Value="TheDate" Format="dd.MMM.yyyy" /> @TheDate.ToString("dd.MMM.yyyy")
<br />

@TheDate

@code  {
    DateTime TheDate { get; set; } = new DateTime(2019, 11, 27, 02, 03, 44);
}
````

>caption The result from the code snippet above

![](images/custom-date-formats-overview.png)

>caption Unsupported .NET format specifiers

* `m` - single digit minutes without leading zero
* `t` and `tt` - AM/PM indicators
* `g`, `gg` - epoch indicators
* `ddd`, `dddd` - day of the week names
* `z`, `zz`, `zzz` - UTC offsets
* `K` - kind


The .NET framework also has a list of standard formats for dates: [https://docs.microsoft.com/en-us/dotnet/standard/base-types/standard-date-and-time-format-strings](https://docs.microsoft.com/en-us/dotnet/standard/base-types/standard-date-and-time-format-strings). They are **not** supported with the Telerik Date Input for Blazor at this point. 

>caution While the results of unsupported format specifiers values will render correctly, editing is not supported.



## See Also

* [DateInput Overview]({%slug components/dateinput/overview%})
