---
title: Pre-Selecting Item
page_title: DropDownList Pre-Selecting Item
description: Learn how to pre-select an item for the user by exploring a practical example.
slug: dropdownlist-pre-select-item
tags: telerik,blazor,dropdownlist,pre-selects
published: True
position: 8
---


# Pre-Selecting Item

This article provides an example that demonstrates how to pre-select an item for the end-user when the component initializes. The described approach allows you to pre-select an item only if it exists in the data source.

>caption Pre-select item for the user

````RAZOR
@* Pre-select an item. *@

Selected value: @selectedValue
<br />

<TelerikDropDownList Data="@myDdlData" TextField="MyTextField" ValueField="MyValueField" @bind-Value="selectedValue">
</TelerikDropDownList>

@code {

    int selectedValue { get; set; }

    //Define a preselected value when the component initializes.
    //DefaultText will not be shown as the selected value is defined.
    protected override void OnInitialized()
    {
        selectedValue = 3;
    }

    //in a real case, the model is usually in a separate file
    //the model type and value field type must be provided to the dropdpownlist
    public class MyDdlModel
    {
        public int MyValueField { get; set; }
        public string MyTextField { get; set; }
    }
    
    IEnumerable<MyDdlModel> myDdlData = Enumerable.Range(1, 20).Select(x => new MyDdlModel { MyTextField = "item " + x, MyValueField = x });
}
````

## See Also

* [Blazor DropDownList](slug:components/dropdownlist/overview)