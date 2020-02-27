---
title: Preserve multiselect option and limit total items
description: How to have an item that is always selected, and how to limit the number of selections
type: how-to
page_title: Always selected option and items limit
slug: multiselect-kb-always-select-limit
position: 
tags: 
ticketid: 1455515
res_type: kb
---

## Environment

<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>MultiSelect for Blazor</td>
		</tr>
	</tbody>
</table>


## Description

I am trying to accomplish the following with the Blazor server multiselect component:

* Pre-populate one value
* Allow additional selections up to a total of three selections (including the pre-populated value)

## Solution

To pre-populate an item, add it to the collection you provide to the `Data` parameter.

To limit the number of selected items, you can either use validation, or the ValueChanged event to modify the user choice as needed. You can also combine both approaches.

To have a "static" item that is always selected, you need to use the component event and ensure that this item is always present in the Value collection.

You can find two examples below that showcase doing this:
* in a simple scenario
* with form validation (which also lets you show messages to the user)


>caption Static (always selected) item, limit number of selections - plain scenario

````CSHTML
@* The logic is in the MyValueChangeHandler method *@

<TelerikMultiSelect Data="@Roles"
                    Value="@TheValues" 
                    ValueChanged="@( (List<string> v) => MyValueChangeHandler(v) )" 
                    ClearButton="false">
</TelerikMultiSelect>

<ul>
    @foreach (var item in TheValues)
    {
        <li>@item</li>
    }
</ul>

@code{
    string StaticSelection = "Sales Agent";
    int MaxItems = 3;
    List<string> TheValues { get; set; } = new List<string>();
    List<string> Roles { get; set; } = new List<string> {
        "Manager", "Developer", "QA", "Technical Writer", "Support Engineer", "Sales Agent", "Architect", "Designer"
    };

    protected override void OnInitialized()
    {
        TheValues.Add(StaticSelection);
    }

    void MyValueChangeHandler(List<string> values)
    {
        // ensure that a certain item is always selected
        if (!values.Contains(StaticSelection))
        {
            values.Insert(0, StaticSelection);
        }

        // ensure that the total selection count does not exceed a certain number
        TheValues = values.Take(MaxItems).ToList();
    }
}
````

>caption Static (always selected) item, limit number of selections - with validation and validation messages

````CSHTML
@using System.ComponentModel.DataAnnotations
@* for the model only *@

<EditForm Model="@myFormModel" OnValidSubmit="@HandleValidSubmit">
    <DataAnnotationsValidator />
    <ValidationSummary />
    <TelerikMultiSelect Data="@Roles"
                        Value="@myFormModel.TheValues"
                        ValueChanged="@( (List<string> v) => MyValueChangeHandler(v) )"
                        ValueExpression="@( () => myFormModel.TheValues )"
                        ClearButton="false">
    </TelerikMultiSelect>
    <br />
    <TelerikButton ButtonType="@ButtonType.Submit">Submit</TelerikButton>
</EditForm>

<ul>
    @foreach (var item in myFormModel?.TheValues)
    {
        <li>@item</li>
    }
</ul>

@code{
    TheModel myFormModel { get; set; }
    string StaticSelection = "Sales Agent";
    public class TheModel
    {
        [Required(ErrorMessage = "You must choose a role")]
        [MaxLength(3, ErrorMessage = "Choose up to three roles")]
        [MinLength(2, ErrorMessage = "Choose at least two roles")]
        public List<string> TheValues { get; set; } = new List<string>();
    }

    List<string> Roles { get; set; } = new List<string> {
        "Manager", "Developer", "QA", "Technical Writer", "Support Engineer", "Sales Agent", "Architect", "Designer"
    };

    protected override void OnInitialized()
    {
        myFormModel = new TheModel();
        myFormModel.TheValues.Add(StaticSelection);
    }

    void MyValueChangeHandler(List<string> values)
    {
        // update the model. Also shows validation messages
        myFormModel.TheValues = new List<string>(values);
        
        // implement static item selection
        if (!myFormModel.TheValues.Contains(StaticSelection))
        {
            myFormModel.TheValues.Insert(0, StaticSelection);
        }
    }

    void HandleValidSubmit()
    {
        Console.WriteLine("OnValidSubmit");
    }
}
````