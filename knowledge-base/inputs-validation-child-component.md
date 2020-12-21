---
title: Validate a Telerik component as child control and apply invalid border
description: How to Validate a Telerik component as child control and apply invalid border
type: how-to
page_title: Capture input keyboard events
slug: inputs-kb-handle-keyboard-events
position: 
tags: 
ticketid: 1499665
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>ComboBox for Blazor, DropDownList for Blazor, AutoComplete for Blazor, other inputs/form elements</td>
		</tr>
	</tbody>
</table>


## Description

I am wrapping a Telerik component inside a custom control for my application. When I try to validate it the red invalid border does not appear.


## Solution

Internally, our components use the `EditContext` to determine if the validation is passing. When you abstract them in a custom component you should specify the `ValueExpression` - this is the field that notifies the framework (`EditForm`) what value should pass certain criteria.

The example below shows how to wrap the ComboBox (adding two-way data binding) in a different `.razor` file and get the invalid red border when the validation does not pass.

>caption Validate the ComboBox wrapped in a custom component

````CustomComponent
@* Validate the value for the combobox. In this example the invalid value is the CEO *@

@typeparam T

@using System.Linq.Expressions

<TelerikComboBox Value="@CBValue" ValueChanged="@( (int? v) => RaiseValueChanged(v) )" ValueExpression="@CustomValueExpression"
                 Data="@MyData" TextField="@TextFiedCustom" ValueField="@ValueFiedCustom" Id="@MyId">
</TelerikComboBox>

@code {
    [Parameter]
    public int? CBValue { get; set; }
    [Parameter]
    public EventCallback<int?> CBValueChanged { get; set; }
    [Parameter]
    public Expression<System.Func<int?>> CustomValueExpression { get; set; }
    [Parameter]
    public IEnumerable<T> MyData { get; set; }
    [Parameter]
    public string TextFiedCustom { get; set; }
    [Parameter]
    public string ValueFiedCustom { get; set; }
    [Parameter]
    public string MyId { get; set; }

    void RaiseValueChanged(int? v)
    {
        CBValue = v;
        if (CBValueChanged.HasDelegate)
        {
            CBValueChanged.InvokeAsync(CBValue);
        }
    }
}
````
````Usage
@using System.ComponentModel.DataAnnotations

<EditForm Model="@person" OnValidSubmit="@HandleValidSubmit">
    <DataAnnotationsValidator />
    <ValidationSummary />
    <p class="team">
        <label for="teamCombobox">Team:</label>

        <MyCustomComponent @bind-CBValue="@person.Team"
                           MyData="@teams"
                           MyId="teamCombobox"
                           TextFiedCustom="MyTextField"
                           ValueFiedCustom="MyValueField"
                           CustomValueExpression="@( () => person.Team )">
        </MyCustomComponent>

        <ValidationMessage For="@(() => person.Team)"></ValidationMessage>
    </p>

    <TelerikButton ButtonType="@ButtonType.Submit">Submit</TelerikButton>
</EditForm>

@code {

    public class Person
    {
        [Required(ErrorMessage = "Team is mandatory.")]//the value field in the combobox model must be null for this to have effect
        [Range(1, 3, ErrorMessage = "Please select an actual team.")] //limits the fourth option just to showcase this is honored
        public int? Team { get; set; }
    }

    public class MyDdlModel
    {
        public int? MyValueField { get; set; }
        public string MyTextField { get; set; }
    }

    Person person = new Person();

    IEnumerable<MyDdlModel> teams = new List<MyDdlModel>
    {
        new MyDdlModel {MyTextField = "Team 1", MyValueField = 1},
        new MyDdlModel {MyTextField = "Team 2", MyValueField = 2},
        new MyDdlModel {MyTextField = "Team 3", MyValueField = 3},
        new MyDdlModel {MyTextField = "CEO", MyValueField = 4}
    };

    void HandleValidSubmit()
    {
        Console.WriteLine("OnValidSubmit");
    }
}
````
