---
title: No Data Text in DropDownList Popup
description: Is there a way to have the "No data" text vertically aligned based on the popup height in order to have it always visible?
type: troubleshooting
page_title: No data text not visible in DropDownList popup
slug: dropdownlist-kb-nodatatext
tags: telerik, blazor, dropdownlist, popup, dropdownlistpopupsettings, css
ticketid: 1635198
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>DropDownList for Blazor, <br /> AutoComplete for Blazor, <br /> MultiSelect for Blazor, <br /> ComboBox for Blazor, <br /> MultiColumnComboBox for Blazor</td>
        </tr>
    </tbody>
</table>


## Description

When the popup is smaller than the default min-height of the no data template, the "No data" text is not visible.


## Cause

The default min-height of the .k-nodata class is 140px. The default min-height of the popup is 200px. If the Height or MaxHeight of the popup is equal to or smaller than 100px - the "No data" text will not be visible.


## Solution

The DropDownList popup setting `Class` lets you define a CSS class that will be rendered on the popup element.

>caption Use a Class to set the min-height of the .k-nodata class to auto.

````CSHTML
<div>
    Select a country (set Height):
    <TelerikDropDownList @bind-Value="@SelectedValue"
                         Data="@Countries"
                         Filterable="@Filterable">
        <DropDownListSettings>
            <DropDownListPopupSettings Height="100px" Class="no-data-min-height"></DropDownListPopupSettings>
        </DropDownListSettings>
    </TelerikDropDownList>
</div>

<div>
    Select a country (set MaxHeight):
    <TelerikDropDownList @bind-Value="@SelectedValue"
                         Data="@Countries"
                         Filterable="@Filterable">
        <DropDownListSettings>
            <DropDownListPopupSettings MaxHeight="100px" Class="no-data-min-height"></DropDownListPopupSettings>
        </DropDownListSettings>
    </TelerikDropDownList>
</div>

<style>
    .no-data-min-height .k-nodata {
        min-height: auto;
    }
</style>


@code {
    private bool Filterable { get; set; } = true;

    private string SelectedValue { get; set; } = "Austria";

    private List<string> Countries = new List<string>()
        {
        "Albania",
        "Andorra",
        "Armenia",
        "Austria",
        "Azerbaijan",
        "Belarus",
        "Belgium",
        "Bosnia & Herzegovina",
        "Bulgaria",
        "Croatia",
        "Cyprus",
        "Czech Republic",
        "Denmark",
        "Estonia",
        "Finland",
        "France",
        "Georgia",
        "Germany",
        "Greece",
        "Hungary",
        "Iceland",
        "Ireland",
        "Italy",
        "Kosovo",
        "Latvia",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Macedonia",
        "Malta",
        "Moldova",
        "Monaco",
        "Montenegro",
        "Netherlands",
        "Norway",
        "Poland",
        "Portugal",
        "Romania",
        "Russia",
        "San Marino",
        "Serbia",
        "Slovakia",
        "Slovenia",
        "Spain",
        "Sweden",
        "Switzerland",
        "Turkey",
        "Ukraine",
        "United Kingdom",
        "Vatican City"
    };
}
````


## See Also

[Override Theme Styles]({%slug override-theme-styles%})
