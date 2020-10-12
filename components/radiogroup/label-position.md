---
title: Label Position
page_title: RadioGroup Label Position
description: Label Position of the RadioButtonGroup for Blazor.
slug: radiogroup-label-position
tags: telerik,blazor,radiobuttongroup,radio,list,label,position
published: True
position: 15
---

# RadioGroup Label Position

The Blazor Radio Button Group component lets you render the labels of the radio buttons before or after the buttons themselves.

By default, the labels are after the buttons, and you can change that through the `LabelPosition` parameter that takes a member of the `Telerik.Blazor.RadioGroupLabelPosition` enum.

>caption Labels before and after the radio buttons

````CSHTML
@* If you want the labels before the buttons, you can set the value directly to the parameter *@

<select @bind="@thePosition">
   <option value="@RadioGroupLabelPosition.Before">Before</option>
   <option value="@RadioGroupLabelPosition.After">After</option>
</select>
<br />
<TelerikRadioGroup Data="@Data" @bind-Value="@SelectedValue" LabelPosition="@thePosition"></TelerikRadioGroup>
@code{
    RadioGroupLabelPosition thePosition { get; set; } = RadioGroupLabelPosition.Before;

    int SelectedValue { get; set; } = 2;
    IEnumerable<int> Data { get; set; } = Enumerable.Range(1, 5);
}
````

![Label Position in the ButtonGroup component](images/radio-group-label-position.gif)


## See Also

  * [RadioGroup Overview]({%slug radiogroup-overview%})
  * [RadioGroup Data Binding]({%slug radiogroup-databind%})
  * [Live Demo: RadioGroup Customization](https://demos.telerik.com/blazor-ui//radiogroup/customization)

