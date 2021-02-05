---
title: Remove animations of dropdowns or make them faster
description: How to remove the dropdown animations or increase their speed
type: how-to
page_title: Remove animations of dropdowns or make them faster
slug: common-kb-animations-decrease
position: 
tags: 
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Grid for Blazor</td>
		</tr>
	</tbody>
</table>


## Description
I want to make the animations of the Telerik dropdowns faster for fast data entry.

I don't want animations for the dropdowns to accommodate users who prefer no animations (e.g., for accessibility reasons).

## Solution
You can use a CSS rule override to change the animation the Telerik dropdowns use.

You can also wrap it in a `@media` query to capture users who have their OS settings to prefer less animations.

````CSS
/* This media query captures accessibility settings, see 
   https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion#user_preferences
 */
@media screen and (prefers-reduced-motion: reduce) {
    .k-popup.k-reset {
        transition: none !important;
        /* to make animations faster use the following line INSTEAD */
        /* transition-duration: 100ms !important; */
    }
}
````

A few sample components to play around with

````CSHTML
A few sample components - play around with the CSS above and expand their dropdowns

<TelerikComboBox Data="@myComboData"
                 TextField="MyTextField"
                 ValueField="MyValueField"
                 @bind-Value="selectedValue"
                 Placeholder="Fast animation"
                 ClearButton="true" Filterable="true">
</TelerikComboBox>

<TelerikDropDownList Data="@myComboData"
                     TextField="MyTextField"
                     ValueField="MyValueField"
                     @bind-Value="selectedValue"
                     DefaultText="No Animation">
</TelerikDropDownList>

<TelerikDatePicker @bind-Value="@SelectedDate"></TelerikDatePicker>

@code {

    IEnumerable<MyDdlModel> myComboData = Enumerable.Range(1, 20).Select(x => new MyDdlModel { MyTextField = "item " + x, MyValueField = x });
    DateTime SelectedDate { get; set; } = DateTime.Now;
    int selectedValue { get; set; }
    public class MyDdlModel
    {
        public int MyValueField { get; set; }
        public string MyTextField { get; set; }
    }
}
````

## Notes

A setting might be exposed at the component level for this, you can track its status [here](https://feedback.telerik.com/blazor/1469662-way-to-modify-default-values-of-animations-such-as-duration-and-delay-for-a-component-such-as-combobox).