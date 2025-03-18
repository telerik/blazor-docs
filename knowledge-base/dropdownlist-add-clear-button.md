---
title: How to Add a Clear Button Inside DropDownList
description: Learn how to integrate a clear button within the DropDownList for Blazor to enable users to reset the selected value easily.
type: how-to
page_title: How to Add a Clear Button Inside the DropDownList for Blazor
slug: dropdownlist-kb-add-clear-button
tags: dropdownlist, clear, button, reset
res_type: kb
ticketid: 1680480, 1612125
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>DropDownList for Blazor</td>
		</tr>
	</tbody>
</table>

## Description

This knowledge base answers the following questions:

- How can I add a reset functionality to the [DropDownList for Blazor](slug:components/dropdownlist/overview)?
- Is it possible to integrate a clear button within the DropDownList for Blazor?
- What is the approach to clear the selected item in DropDownList for Blazor?

## Solution

To add a clear button inside the DropDownList component, follow the steps below:

1. Include CSS style to position the clear button within the DropDownList.
2. Implement a method that resets the selected value upon clicking the clear button.

`````RAZOR
<style>
    .reset-button {
        margin-left: -3.5em;
        z-index: 10000;
    }
</style>

<TelerikDropDownList @bind-Value="@SelectedItem"
                     DefaultText=""
                     Data="@DropDownData"
                     Width="320px"
                     Id="country">
    <DropDownListSettings>
        <DropDownListPopupSettings Height="auto" />
    </DropDownListSettings>
</TelerikDropDownList>

<TelerikButton Class="reset-button"
               Size="sm"
               Visible="@(SelectedItem != null)"
               FillMode="@ThemeConstants.Button.FillMode.Flat"
               ButtonType="ButtonType.Reset"
               Icon="@SvgIcon.X"
               OnClick="@HandleDropDownListReset">
</TelerikButton>

@code {
    protected string? SelectedItem { get; set; }

    protected List<string> DropDownData = new List<string>() { "first", "second", "third" };

    private void HandleDropDownListReset()
    {
        SelectedItem = null;
    }
}
`````

## See Also

- [Overview of the DropDownList for Blazor](slug:components/dropdownlist/overview)
- [Overview of the DropDownList for Blazor](slug:components/button/overview)
