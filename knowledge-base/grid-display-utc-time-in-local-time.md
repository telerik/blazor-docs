---
title: Display UTC Time in the User's Local Time in Grid for Blazor
description: How to display UTC date and time values in a Telerik Grid according to the user's browser timezone.
type: how-to
page_title: Display UTC Time in the User's Local Time in Grid for Blazor
slug: grid-display-utc-time-in-local-time
position: 
tags: 
ticketid: 
res_type: kb
components: ["grid"]
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Grid for Blazor</td>
        </tr>
        <tr>
            <td>Version</td>
            <td>15.0.1 and above</td>
        </tr>
        <tr>
            <td>Application type</td>
            <td>Blazor Server or Blazor Web App</td>
        </tr>
    </tbody>
</table>

## Description

How can I display a UTC date and time in the Grid according to the timezone of the current user?

## Solution

The Grid `DisplayFormat` parameter formats a date and time value. It does not automatically convert a UTC value to the timezone of the browser user. In Blazor Server, .NET conversion methods such as `ToLocalTime()` use the server's local timezone.

To display the value in the browser user's local timezone, render the UTC value as an ISO 8601 string and convert it in the browser with JavaScript. The `Date` object uses the browser's timezone when you call `toLocaleString()`.

The following example uses a `time` element in a Grid column template.

>caption Display a UTC Grid value in the browser's local timezone

````RAZOR
@inject IJSRuntime JS

<TelerikGrid Data="@GridData">
    <GridColumns>
        <GridColumn Field="@nameof(RoutePlan.CreatedUtc)" Title="Created">
            <Template Context="context">
                @{
                    var routePlan = (RoutePlan)context;
                    var createdUtc = DateTime.SpecifyKind(routePlan.CreatedUtc, DateTimeKind.Utc);
                }
                <time class="local-time"
                      datetime="@createdUtc.ToString("O")">
                </time>
            </Template>
        </GridColumn>
    </GridColumns>
</TelerikGrid>

<script>
    window.localizeUtcTimes = function () {
        document.querySelectorAll("time.local-time").forEach(function (element) {
            var date = new Date(element.dateTime);

            if (!Number.isNaN(date.valueOf())) {
                element.textContent = date.toLocaleString();
            }
        });
    };
</script>

@code {
    private List<RoutePlan> GridData { get; set; } = new();

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        await JS.InvokeVoidAsync("localizeUtcTimes");
    }

    public class RoutePlan
    {
        public DateTime CreatedUtc { get; set; }
    }
}
````

The example assumes that `CreatedUtc` contains a UTC value. Use `DateTime.SpecifyKind` only when the value is known to be UTC but its `Kind` is `Unspecified`. If the property already has `DateTimeKind.Utc`, render it without calling `SpecifyKind`.

If the application uses a `DateTimeOffset`, render its round-trip string instead:

````RAZOR
<time class="local-time"
      datetime="@routePlan.CreatedUtcOffset.ToString("O")">
</time>
````

Do not use `MarkupString` for untrusted text. If the local time is displayed in a tooltip, pass the UTC value as data and render the converted text as element text after the browser performs the conversion.

## See Also

* [Grid Data Bound Columns](slug:components/grid/columns/bound)
* [Date Inputs and Pickers with DateTimeOffset](slug:date-input-picker-kb-datetimeoffset)
* [JavaScript interoperability in ASP.NET Core Blazor](https://learn.microsoft.com/en-us/aspnet/core/blazor/javascript-interoperability)
