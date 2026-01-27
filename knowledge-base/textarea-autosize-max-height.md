---
title: How to Limit TextArea AutoSize and Show Scrollbar
description: Limit the TextArea automatic resizing and display a vertical scrollbar once a set max height is reached.
type: how-to
page_title: How to limit TextArea AutoSize and show scrollbar beyond a max height
slug: textarea-kb-autosize-max-height
position: 
tags: telerik, blazor, textarea, autosize, css
ticketid: 1636831
res_type: kb
components: ["textarea"]
---
## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>TextArea for Blazor</td>
        </tr>
    </tbody>
</table>


## Description

This KB article answers the following questions:

* How to limit the TextArea auto size area and have a scrollbar when the component needs to expand more.
* How to use the TextArea's `AutoSize` up to a point, and have a vertical scrollbar if the text grows beyond that.
* How to make the `TelerikTextArea` show a scrollbar if a max height is hit.


## Solution

1. Set a [`Class` to the TextArea](slug:textarea-overview#textarea-parameters).
1. Apply a `max-height` style and `overflow-y: auto !important;` to the `textarea` children of the CSS class from the previous step.

>caption AutoSize TextArea up to a maximum height

````RAZOR
<TelerikTextArea @bind-Value="@TextValue"
                 Width="500px"
                 ResizeMode="TextAreaResizeMode.Auto"
                 Class="max-height-200" />

<style>
    .max-height-200 > textarea {
        max-height: 200px;
        overflow-y: auto !important;
    }
</style>

@code {
    private string TextValue { get; set; } = string.Empty;
}
````

> Use `AutoSize="true"` instead of `ResizeMode="TextAreaResizeMode.Auto"` with Telerik UI for Blazor versions `6.x` and earlier.

## See Also

* [TextArea Overview](slug:textarea-overview)
* [TextArea Appearance](slug:TextArea-appearance)
