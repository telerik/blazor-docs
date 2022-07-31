---
title: Refresh Data
page_title: MultiColumnComboBox Refresh Data
description: Refresh MultiColumnComboBox Data using Observable Data or creating a new Collection reference.
slug: multicolumncombobox-refresh-data
tags: telerik,blazor,multicolumncombobox,observable,data,new,collection
published: True
position: 35
---

# MultiColumnComboBox - Refresh Data


To refresh the MultiColumnComboBox data you can call the `Rebind` method of the component reference. This method will fire the [`OnRead`]({%slug multicolumncombobox-events%}#onread) event and execute the business logic in the event handler. 

````CSHTML
@* Clicking on the Rebind the component button will delete the first option from the dropdown and refresh the data *@

Selected value: @BoundValue
<br />

<TelerikButton OnClick="@RebindMultiColumnComboBox">Rebind the Component</TelerikButton>

<TelerikMultiColumnComboBox Data="@MultiComboData"
                            @bind-Value="@BoundValue"
                            ValueField="@nameof(SampleData.Id)"
                            TextField="@nameof(SampleData.Name)" @ref="@MultiColumnComboReference">
    <MultiColumnComboBoxColumns>
        <MultiColumnComboBoxColumn Field="@nameof(SampleData.Id)" Title="The id"></MultiColumnComboBoxColumn>
        <MultiColumnComboBoxColumn Field="@nameof(SampleData.Name)" Title="The name"></MultiColumnComboBoxColumn>
    </MultiColumnComboBoxColumns>
</TelerikMultiColumnComboBox>

@code {
    private TelerikMultiColumnComboBox<SampleData, int> MultiColumnComboReference { get; set; }

    private void RebindMultiColumnComboBox()
    {
        var itemToBeAdded = new SampleData()
            {
                Id = 100,
                Name = "Added From Code"
            };

        MultiComboData.Add(itemToBeAdded);

        BoundValue = 100;

        MultiColumnComboReference.Rebind();
    }

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