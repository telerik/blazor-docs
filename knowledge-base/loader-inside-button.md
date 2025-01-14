---
title: Loader Inside a Button
description: How to add a Telerik loading animation inside a button with the Loader component.
type: how-to
page_title: Blazor Loader Inside a Button
slug: loader-kb-inside-button
position: 
tags: loader, button
ticketid: 
res_type: kb
category: knowledge-base
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>
                Button for Blazor, <br />
                Loader for Blazor
            </td>
        </tr>
    </tbody>
</table>


## Description

How to add a loading animation inside a Button? The loader indicator show display when the button is clicked. The button should also be disabled while the application is doing some background tasks.

## Solution

1. Nest a [Telerik Loader](slug://loader-overview) inside a [Telerik Button](slug://components/button/overview).
1. Set the `Visible` parameter of the Loader to `false`.
1. Handle the [`OnClick` event](slug://button-events#onclick) of the Button.
1. Toggle the Loader's `Visible` parameter to `true` in the Button's `OnClick` handler, while the application is working in the background.

>caption Blazor Loader inside a Button

````RAZOR
<TelerikButton OnClick="@GenerateReport" Enabled="@(!IsGeneratingReport)">
    <TelerikLoader Visible="@IsGeneratingReport" />
    @( IsGeneratingReport ? "Generating Report" : "Generate Report" )
</TelerikButton>

@code {
    public bool IsGeneratingReport { get; set; }

    public async Task GenerateReport()
    {
        IsGeneratingReport = true;

        await Task.Delay(3000); // do actual work here

        IsGeneratingReport = false;
    }
}
````

## See Also

* [Blazor Loader](slug://loader-overview)
* [Blazor Button](slug://components/button/overview)
