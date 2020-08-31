---
title: Get model from dropodwn
description: how to get a model from a dropdown instead of a primitive value.
type: how-to
page_title: Get model from dropdown
slug: dropdowns-get-model
position: 
tags: 
ticketid: 1452556
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>MultiSelect for Blazor, DropDownList for Blazor, ComboBox for Blazor, AutoCopmlete for Blazor</td>
		</tr>
	</tbody>
</table>


## Description

I want to get an instance of my model when I select an item from a dropdown (such as a DropDownList, ComboBox, AutoComplete, MultiSelect). I can get only a primitive type that is the type of the `Value` and `ValueField`.

The dropdowns provide a primitive `Value` so that [validation]({%slug common-features/input-validation%}) can work, and so that other data source operations (such as filtering) can work. The Value and Text cannot be classes (models) because that would prevent validation from working and filtering/comparing entire classes is an operation that is not defined.

## Solution

The solution is to use the unique identifier you get from the component (the `Value`) and to get the entire model from its data source (the `Data` collection) by filtering it (e.g., by using the `Where()` operator).

The example below uses the DropDownList component, and the same approach is applicable for the others as well. For the MultiSelect you will have to loop over the selected values collection, of course, and for the AutoComplete you may want to ensure unique Text values (the autocomplete is a free text input with suggestions, not a dropdown with mandatory choices).

>caption Get model from dropdown


````ComboBox

@selectedValue

<br />

<TelerikComboBox Data="@myDdlData"
                 TextField="MyTextField"
                 ValueField="MyValueField"
                 @bind-Value="selectedValue"
                 OnChange="@OnChangeHandler">
</TelerikComboBox>

@if (selectedItem != null)
{
    <div>
        Data from the model:
        <div>
            Text Field: @selectedItem.MyTextField <br />
            Unique identifier: @selectedItem.MyValueField
        </div>
    </div>
}

@code {
    void OnChangeHandler(object value)
    {
        int userInput = (int)value;

        MyDdlModel item = myDdlData.FirstOrDefault(x => x.MyValueField == userInput);

        if (item != null)
        {
            selectedItem = new MyDdlModel();

            selectedItem = item;
        }
        else
        {
            selectedItem = null;
        }
    }

    public class MyDdlModel
    {
        public int MyValueField { get; set; } 
        public string MyTextField { get; set; }
    }

    IEnumerable<MyDdlModel> myDdlData = Enumerable.Range(1, 20).Select(x => new MyDdlModel { MyTextField = "item " + x, MyValueField = x });

    MyDdlModel selectedItem { get; set; }
    int selectedValue { get; set; } = 4;
}
````
````AutoComplete

@TheValue
<br />
<TelerikAutoComplete Data="@Suggestions"
                     ValueField="@( nameof(SuggestionsModel.Suggestion) )"
                     @bind-Value="@TheValue"
                     OnChange="@OnChangedHandler" />

@if (selectedItem != null)
{
    <div>
        Data from the model:
        <div>
            Suggestion: @selectedItem.Suggestion <br />
            Unique identifier: @selectedItem.UniqueIdentifier
        </div>
    </div>
}

@code{
    string TheValue { get; set; }
    public SuggestionsModel selectedItem { get; set; }

    void OnChangedHandler(object input)
    {
        // Extract the data model from the data collection
        SuggestionsModel item = Suggestions.FirstOrDefault(x => x.Suggestion == (string)input);

        if (item != null)
        {
            selectedItem = new SuggestionsModel();

            TheValue = (string)input;
            selectedItem = item;
        }
        else
        {
            TheValue = "no item selected";
            selectedItem = null;
        }
    }

    List<SuggestionsModel> Suggestions { get; set; } = new List<SuggestionsModel>
    {
        new SuggestionsModel { Suggestion = "first" },
        new SuggestionsModel { Suggestion = "second" },
        new SuggestionsModel { Suggestion = "third" }
    };

    public class SuggestionsModel
    {
        public string Suggestion { get; set; }//the auto complete needs only the string field
        public Guid UniqueIdentifier { get; set; } = Guid.NewGuid();
    }
}
````

````Custom DropDownList
@*This example shows how to create a custom dropdown list using the Grid to handle the selection and return the entire model *@

@if (SelectedEmployee != null)
{
    <div>Selected item: @SelectedEmployee.EmployeeId from team @SelectedEmployee.Team has a name @SelectedEmployee.Name</div>
}
<hr />
@* this is to showcase seletion as a whole model *@

@if (DropDownShown)
{
    <div class="fixed-to-viewport" @onclick="@ToggleDropdown">
    </div>
}
<div style="position:relative; width:@Width">
    <span class="k-widget k-dropdown k-header" @onclick="@ToggleDropdown" style="width: 100%;">
        <span class="k-dropdown-wrap k-state-default @( DropDownShown ? "k-state-focused" : "" )">
            <span class="k-input">@SelectedItemText</span>
            <span class="k-select">
                <span class="k-icon k-i-arrow-60-down"></span>
            </span>
        </span>
    </span>
    <TelerikAnimationContainer @ref="dropdown" Width="@PopupWidth" Height="@PopupHeight" Class="k-popup">
        <TelerikGrid Data=@DdlData
                     SelectionMode="GridSelectionMode.Single"
                     SelectedItemsChanged="@((IEnumerable<Employee> employeeList) => OnSelect(employeeList))"
                     SelectedItems="@SelectedItems"
                     Height="100%" Class="ddl-mimic">
            <GridColumns>
                <GridColumn Field=@nameof(Employee.Name) />
            </GridColumns>
        </TelerikGrid>
    </TelerikAnimationContainer>
</div>

<style>
    /* you may want to extract this to a site-wide stylesheet instead of a local style element */
    .ddl-mimic .k-grid-header {
        display: none;
    }

    .fixed-to-viewport {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 10;
    }
</style>


@code {
    // you may want to make these parameters
    public List<Employee> DdlData { get; set; }
    public string Width { get; set; } = "400px";
    public string PopupWidth { get; set; } = "100%";
    public string PopupHeight { get; set; } = "300px";
    public Employee SelectedEmployee => SelectedItems.Count() > 0 ? SelectedItems.First<Employee>() : null;

    // inner workings
    public IEnumerable<Employee> SelectedItems { get; set; } = Enumerable.Empty<Employee>();
    private TelerikAnimationContainer dropdown;
    private bool DropDownShown { get; set; }

    async Task ToggleDropdown()
    {
        DropDownShown = !DropDownShown;
        await dropdown.ToggleAsync();
    }

    protected void OnSelect(IEnumerable<Employee> employees)
    {
        SelectedItems = new List<Employee> { employees.FirstOrDefault() };
        ToggleDropdown();
        // you may want to raise a SelectedItemChanged event here
    }

    // you may want to extract the selected text from a text field parameter through reflection, and/or use a parameter for the default text
    string SelectedItemText => SelectedEmployee != null ? SelectedEmployee.Name : "Select Item (default text)";

    //just data generation, in a real case it would come down as a parameter and the component might be generic instead of using hardcoded types and fields
    protected override async Task OnInitializedAsync()
    {

        DdlData = new List<Employee>();
        for (int i = 0; i < 15; i++)
        {
            DdlData.Add(new Employee()
            {
                EmployeeId = i,
                Name = "Employee " + i.ToString(),
                Team = "Team " + i % 3
            });
        }
    }

    public class Employee
    {
        public int EmployeeId { get; set; }
        public string Name { get; set; }
        public string Team { get; set; }
    }
}
````
````DropDownList
@result
<br />

<TelerikDropDownList Data="@myDdlData" TextField="MyTextField" ValueField="MyValueField"
                     Value="@DdlValue" ValueChanged="@( (int v) => ValueChangedHandler(v) )" DefaultText="Select something">
</TelerikDropDownList>

<br />

<TelerikDropDownList Data="@myDdlData" TextField="MyTextField" ValueField="MyValueField"
                     @bind-Value="@DdlValue" DefaultText="Select something">
</TelerikDropDownList>

<TelerikButton OnClick="@GetSelectedItem">Get Selected Item</TelerikButton>

@code {
    string result;
    int DdlValue { get; set; } = 5;
    
    void GetSelectedItem()
    {
        GetItemFromModelData();
    }

    void ValueChangedHandler(int v)
    {
        DdlValue = v;

        GetItemFromModelData();
    }

    void GetItemFromModelData()
    {
        // extract the data item from the data source by using the value
        MyDdlModel selectedItem = myDdlData.Where(d => d.MyValueField == DdlValue).FirstOrDefault();
        if (selectedItem != null) // e.g., custom text in a combo, or no match for an autocomplete
        {
            result = selectedItem.MyTextField;
        }
        else
        {
            result = "no item selected";
        }

        StateHasChanged();
    }

    public class MyDdlModel
    {
        public int MyValueField { get; set; }
        public string MyTextField { get; set; }
    }

    IEnumerable<MyDdlModel> myDdlData = Enumerable.Range(1, 20).Select(x => new MyDdlModel { MyTextField = "item " + x, MyValueField = x });
}
````

