---
title: Filter
page_title: MultiColumnComboBox - Filter
description: Filtering in the MultiColumnComboBox for Blazor.
slug: multicolumncombobox-filter
tags: telerik,blazor,multicolumncombobox.combo,combobox,filter
published: True
position: 10
---

# MultiColumnComboBox Filter

The MultiColumnComboBox component allows the user to filter the available items by their text, so they can find the one they need faster.

To enable filtering, set the `Filterable` parameter to `true`.

Filtering ignores casing and the default filter operator is `starts with`. Filtering looks in the `TextField`, and the filter is reset when the dropdown closes. You can choose a different operator through the `FilterOperator` parameter that takes a member of the `Telerik.Blazor.StringFilterOperator` enum.

By default, the filtering will be debounced with 150ms. Configure that with the [`DebounceDelay`]({%slug multicolumncombobox-overview%}#parameters) parameter of the component.

>caption Filtering in the MultiColumnComboBox

````CSHTML
@* Type something in the input to see items whose text contains only the typed string, for example "me 2" *@

<TelerikMultiColumnComboBox Data="@MultiComboData"
                            @bind-Value="@BoundValue"
                            Filterable="true"
                            ValueField="@nameof(SampleData.Id)"
                            TextField="@nameof(SampleData.Name)">
    <MultiColumnComboBoxColumns>
        <MultiColumnComboBoxColumn Field="@nameof(SampleData.Id)" Title="The id"></MultiColumnComboBoxColumn>
        <MultiColumnComboBoxColumn Field="@nameof(SampleData.Name)" Title="The name"></MultiColumnComboBoxColumn>
    </MultiColumnComboBoxColumns>
</TelerikMultiColumnComboBox>

@code {
    public int BoundValue { get; set; }

    public List<SampleData> MultiComboData { get; set; } = Enumerable.Range(0, 30).Select(x => new SampleData()
        {
            Id = x,
            Name = "Name " + x
        }).ToList();

    public class SampleData
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
````

>caption Choose Filter Operator

````CSHTML
@* Type something in the input to see items filtered. Choose a new filter operator and repeat *@

<TelerikDropDownList Data="@AvailableFilterOperators" @bind-Value=@filterOperator />

<TelerikMultiColumnComboBox Data="@MultiComboData"
                            @bind-Value="@BoundValue"
                            Filterable="true"
                            FilterOperator="@filterOperator"
                            ValueField="@nameof(SampleData.Id)"
                            TextField="@nameof(SampleData.Name)">
    <MultiColumnComboBoxColumns>
        <MultiColumnComboBoxColumn Field="@nameof(SampleData.Id)" Title="The id"></MultiColumnComboBoxColumn>
        <MultiColumnComboBoxColumn Field="@nameof(SampleData.Name)" Title="The name"></MultiColumnComboBoxColumn>
    </MultiColumnComboBoxColumns>
</TelerikMultiColumnComboBox>

@code {
    public StringFilterOperator filterOperator { get; set; }

    public List<StringFilterOperator> AvailableFilterOperators { get; set; } = new List<StringFilterOperator>()
    {
        Telerik.Blazor.StringFilterOperator.Contains,
        Telerik.Blazor.StringFilterOperator.DoesNotContain,
        Telerik.Blazor.StringFilterOperator.EndsWith,
        Telerik.Blazor.StringFilterOperator.IsContainedIn,
        Telerik.Blazor.StringFilterOperator.StartsWith,

    };

    public int BoundValue { get; set; }

    public List<SampleData> MultiComboData { get; set; } = Enumerable.Range(0, 30).Select(x => new SampleData()
        {
            Id = x,
            Name = "Name " + x
        }).ToList();

    public class SampleData
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}

````


## See Also

  * [Live Demo: MultiColumnComboBox Filtering](https://demos.telerik.com/blazor-ui/multicolumncombobox/filtering)
   
  
