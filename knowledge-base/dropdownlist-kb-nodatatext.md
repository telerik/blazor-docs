---
title: No Data Text Missing in DropDownList Popup
description: How to make the No Data text vertically aligned based on the dropdown height in order to have it always visible?
type: troubleshooting
page_title: No Data Text Not Visible in the DropDownList Popup
slug: dropdownlist-kb-nodatatext
tags: telerik, blazor, dropdownlist, popup, dropdownlistpopupsettings, css
ticketid: 1635198
res_type: kb
components: ["dropdownlist"]
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

When the dropdown is smaller than the default `min-height` of the no data template, the "No Data" text is not visible.


## Cause

The default `min-height` of the `.k-nodata` class is `140px`. The default `height` of the dropdown is `200px`. If the `Height` or `MaxHeight` of the dropdown is equal to or smaller than `100px`, the "No Data" text is not visible.


## Solution

You need to change the default minimum height of the popup element. The DropDownList [popup setting `Class`](slug:components/dropdownlist/overview#popup-settings) lets you define a CSS class. The defined rules from the CSS will change the appearance and properties of the popup element. With the CSS rule `min-height: auto` the popup element's height is flexible and adjusts dynamically based on its content.

>caption Use a Class to set the min-height of the .k-nodata class to auto.

````RAZOR
<div>
    Popup with Height:
    <TelerikDropDownList @bind-Value="@SelectedValue"
                         Data="@Countries"
                         Filterable="true">
        <DropDownListSettings>
            <DropDownListPopupSettings Height="100px" Class="no-data-min-height"></DropDownListPopupSettings>
        </DropDownListSettings>
    </TelerikDropDownList>
</div>

<div>
    Popup with MaxHeight:
    <TelerikDropDownList @bind-Value="@SelectedValue"
                         Data="@Countries"
                         Filterable="true">
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

[Override Theme Styles](slug:themes-override)
