---
title: Remove DropDown Animations or Make Them Faster
description: How to remove the dropdown animations or increase their speed
type: how-to
page_title: How To Remove DropDown Animations or Make Them Faster
slug: common-kb-animations-decrease
position: 
tags: telerik, blazor, animations, css
ticketid: 1637172
res_type: kb
components: ["general"]
---
## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>UI for Blazor</td>
        </tr>
    </tbody>
</table>


## Description

This knowledge base article discusses the following scenarios:

* How to make the animations of the Telerik dropdowns faster for fast data entry?
* How to remove all animations for Telerik Blazor ComboBox, DropDownList, DateTimePicker and other selection components?
* I want to remove animations for the dropdowns to accommodate users who prefer no animations (e.g., for accessibility reasons).


## Solution

You can use a [CSS rule override](slug:themes-override) to change or disable the animation of the Telerik dropdowns.

>caption Disable Telerik Blazor dropdown animations

````RAZOR
<TelerikComboBox Data="@DropDownData"
                 TextField="@nameof(DropDownModel.Text)"
                 ValueField="@nameof(DropDownModel.Id)"
                 @bind-Value="@SelectedValue"
                 Width="200px">
</TelerikComboBox>

<TelerikDropDownList Data="@DropDownData"
                     TextField="@nameof(DropDownModel.Text)"
                     ValueField="@nameof(DropDownModel.Id)"
                     @bind-Value="@SelectedValue"
                     Width="200px">
</TelerikDropDownList>

<TelerikDatePicker @bind-Value="@SelectedDate"
                   Width="200px">
</TelerikDatePicker>

<style>
    /* up to version 3.5.0 */
    .k-popup.k-reset,

    /* from version 3.6.0 */
    .k-child-animation-container {
        transition: none !important;

        /* to make dropdown animations faster use the following style INSTEAD */
        /* transition-duration: 100ms !important; */
    }
</style>

@code {
    private IEnumerable<DropDownModel> DropDownData = Enumerable.Range(1, 20)
        .Select(x => new DropDownModel { Id = x, Text = $"Item {x}" });

    private int SelectedValue { get; set; }

    private DateTime SelectedDate { get; set; } = DateTime.Now;

    public class DropDownModel
    {
        public int Id { get; set; }
        public string Text { get; set; } = string.Empty;
    }
}
````

You can also wrap the custom CSS in a `@media` query to capture users who have configured their devices to display fewer animations.

>caption CSS that targets disabled animations (motion) in the device accessibility settings

<div class="skip-repl"></div>

````CSS
/* This media query captures accessibility settings, see 
   https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion#user_preferences
 */
@media screen and (prefers-reduced-motion: reduce) {
    .k-child-animation-container {
        transition: none !important;
    }
}
````


## Notes

A setting might be exposed at component level for this. Follow the feature request about [setting animation speed on popups](https://feedback.telerik.com/blazor/1586639-set-default-animation-speed-on-popups).
