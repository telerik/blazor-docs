---
title: Change Primary SplitButton On Click
description: How to change the primary SplitButton item when the user clicks on a button in the component dropdown.
type: how-to
page_title: How to Change Primary SplitButton Action On Click
slug: splitbutton-kb-change-primary-action-onclick
position: 
tags: telerik, blazor, splitbutton
ticketid: 
res_type: kb
components: ["splitbutton"]
---
## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>SplitButton for Blazor</td>
        </tr>
    </tbody>
</table>


## Description

This KB article answers the following questions:

* How to use dynamic primary SplitButton action that changes on click?
* How to make the clicked SplitButton item primary?
* How to switch the SplitButton's default item after click, similar to the Create Pull Request button in GitHub?
* How to create dynamic SplitButton that toggles its primary action when the user clicks on a dropdown item?


## Solution

1. Define a collection of objects that will act as a datasource for the SplitButton.
1. Define a property that will store the current primary action of the SplitButton. Use this property to render the primary button `Text` and `Icon`.
1. Remove the current primary button from the SplitButton datasource and render the remaining `<SplitButtonItem>` instances in a loop. Make sure to [set their `@key` attribute to maintain correct component references](https://learn.microsoft.com/en-us/aspnet/core/blazor/components/element-component-model-relationships).
1. Change the primary SplitButton item in the `OnClick` handler of the button items in the dropdown.

>caption Using dynamic primary SplitButton action

````RAZOR
@* Change SplitButton primary action on click *@

<p>Last click action: @SplitButtonLog</p>

<TelerikSplitButton Icon="@PrimaryButton.Icon"
                    OnClick="@( () => OnSplitButtonClick(PrimaryButton) )">
    <SplitButtonContent>@PrimaryButton.Text</SplitButtonContent>
    <SplitButtonItems>
        @{
            foreach (var button in SecondaryButtons)
            {
                <SplitButtonItem @key="@button"
                                 Icon="@button.Icon"
                                 OnClick="@( () => OnSplitButtonClick(button) )">
                    @button.Text
                </SplitButtonItem>
            }
        }
    </SplitButtonItems>
</TelerikSplitButton>

@code {
    private List<SplitButtonModel> AllSplitButtons { get; set; } = new List<SplitButtonModel>() {
        new SplitButtonModel() { Id = 1, Text = "Paste", Icon = SvgIcon.Clipboard },
        new SplitButtonModel() { Id = 2, Text = "Paste as Plain Text", Icon = SvgIcon.ClipboardText },
        new SplitButtonModel() { Id = 3, Text = "Paste as HTML", Icon = SvgIcon.ClipboardHtml },
    };

    private List<SplitButtonModel> SecondaryButtons => AllSplitButtons.Where(x => x.Id != PrimaryButton.Id).ToList();

    private SplitButtonModel PrimaryButton { get; set; } = null!;

    private string SplitButtonLog { get; set; } = string.Empty;

    private void OnSplitButtonClick(SplitButtonModel button)
    {
        PrimaryButton = button;

        var now = DateTime.Now;
        SplitButtonLog = $"{button.Text} at {now.ToString("HH:mm:ss")}.{now.Millisecond}";
    }

    protected override void OnInitialized()
    {
        PrimaryButton = AllSplitButtons.First();
    }

    public class SplitButtonModel
    {
        public int Id { get; set; }
        public string Text { get; set; } = string.Empty;
        public object Icon { get; set; } = SvgIcon.Gear;
    }
}
````


## See Also

* [SplitButton Events](slug:splitbutton-events)
* [SplitButton Icons](slug:splitbutton-icons)
