---
title: Add Floating Label to Telerik Inputs
description: How to add floating label in the Telerik Inputs.
type: how-to
page_title: Floating Label in Telerik Inputs
slug: inputs-kb-floating-label
position:
tags:
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>TextBox for Blazor, MaskedTextBox for Blazor, NumericTextBox for Blazor, other inputs/form elements</td>
		</tr>        
		<tr>
			<td>Version</td>
			<td>3.0.0 and later before 3.2.0</td>
		</tr>
	</tbody>
</table>


## Description

I would like to show a floating label for Telerik Inputs. The label should be displayed like a placeholder when the component is empty, and should animate to top label position of the input when focused.

## Solution

>important The 3.0.0 release introduced a breaking change of removing the `Label` parameter from TextBox, MaskedTextBox, TextArea components. In 3.2.0 Floating Label component will be released to fulfill all use cases. However, in the meantime this solution can be used to implement floating label in any component.

The following code snippet shows how to add a floating label to TextBox, MaskedTextBox, TextArea, DatePicker, and DropDownList components. The example illustrates how with simple html rendering that is shipped with `Telerik UI for Blazor` you could transform the inner html label into a floating label.

````CSHTML
<div style="width: 400px;">
    <span class="k-floating-label-container @TextBoxEmptyClass">
        <TelerikTextBox Id="textbox" @bind-Value="@TextBoxValue"></TelerikTextBox>
        <label for="textbox" class="k-label">TextBox</label>
    </span>
    <br/><br/>
    <span class="k-floating-label-container @MaskedTextBoxEmptyClass">
        <TelerikMaskedTextBox Mask="###.###" Id="maskedtextbox" PlaceHolder=" " MaskOnFocus="true" @bind-Value="@MaskedTextBoxValue"></TelerikMaskedTextBox>
        <label for="maskedtextbox" class="k-label">MaskedTextBox</label>
    </span>
    <br/><br/>
    <span class="k-floating-label-container @TextAreaEmptyClass">
        <TelerikTextArea Id="textarea" @bind-Value="@TextAreaValue"></TelerikTextArea>
        <label for="textarea" class="k-label">TextArea</label>
    </span>
    <br/><br/>
    <span class="k-floating-label-container @DatePickerEmptyClass">
        <!-- Add empty space as Placeholder to show empty datepicker by default -->
        <TelerikDatePicker Id="datepicker" @bind-Value="@DatePickerValue" Placeholder=" "></TelerikDatePicker>
        <label for="datepicker" class="k-label">DatePicker</label>
    </span>
    <br/><br/>
    <span class="k-floating-label-container @DropDownListEmptyClass">
        <TelerikDropDownList Id="ddl" @bind-Value="@DropDownListValue" Data="@DropDownListData"></TelerikDropDownList>
        <label for="ddl" class="k-label">DropDownList</label>
    </span>
</div>

@code {
    public const string emptyClass = "k-state-empty";

    public string TextBoxValue { get; set; }
    public string TextBoxEmptyClass => string.IsNullOrEmpty(TextBoxValue) ? emptyClass : string.Empty;

    public string MaskedTextBoxValue { get; set; }
    public string MaskedTextBoxEmptyClass => string.IsNullOrEmpty(MaskedTextBoxValue) ? emptyClass : string.Empty;

    public string TextAreaValue { get; set; }
    public string TextAreaEmptyClass => string.IsNullOrEmpty(TextAreaValue) ? emptyClass : string.Empty;

    public DateTime? DatePickerValue { get; set; }
    public string DatePickerEmptyClass => DatePickerValue == null ? emptyClass : string.Empty;

    public string DropDownListValue { get; set; }
    public string DropDownListEmptyClass => string.IsNullOrEmpty(DropDownListValue) ? emptyClass : string.Empty;
    public List<string> DropDownListData { get; set; } = new List<string>() { "one", "two", "three" };
}

````