---
title: Templates
page_title: MultiColumnComboBox Column Templates
description: Column Templates in MultiColumnComboBox for Blazor.
slug: multicolumncombobox-columns-templates
tags: telerik,blazor,multicolumncombobox,combo,columns,headertemplate,celltemplate,templates
published: True
position: 10
components: ["multicolumncombobox"]
---
# MultiColumnComboBox Column Templates

This article explains the available templates for the Columns of the MultiColumnComboBox for Blazor.

* [`HeaderTemplate`](#headertemplate)
* [`Template`](#template)


## HeaderTemplate

The `HeaderTemplate` allows you to control the rendering of the column's header. You can define it for each of the columns of the MultiColumnComboBox.

>caption Use the HeaderTemplate to add an icon to the header cells

````RAZOR
<TelerikMultiColumnComboBox Data="@MultiComboData"
                            @bind-Value="@BoundValue"
                            ValueField="@nameof(SampleData.Id)"
                            TextField="@nameof(SampleData.Name)"
                            Width="300px">
    <MultiColumnComboBoxColumns>
        <MultiColumnComboBoxColumn Field="@nameof(SampleData.Id)">
            <HeaderTemplate>
                <TelerikSvgIcon Icon="@SvgIcon.InfoCircle"></TelerikSvgIcon>
                Unique identifier
            </HeaderTemplate>
        </MultiColumnComboBoxColumn>
        <MultiColumnComboBoxColumn Field="@nameof(SampleData.Name)">
            <HeaderTemplate>
                <TelerikSvgIcon Icon="@SvgIcon.StarOutline"></TelerikSvgIcon>
                Employee Name
            </HeaderTemplate>
        </MultiColumnComboBoxColumn>
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

## Template

The `Template` (Cell Template) allows you to control the rendering of the cells in the MultiColumnComboBox column. You can access the `context` object and cast it to the bound model to employ some custom business logic. The `contenxt` represents the current data item in the cell.

>caption Use the Template to visually distinguish some Ids

````RAZOR
<TelerikMultiColumnComboBox Data="@MultiComboData"
                            @bind-Value="@BoundValue"
                            ValueField="@nameof(SampleData.Id)"
                            TextField="@nameof(SampleData.Name)"
                            Width="300px">
    <MultiColumnComboBoxColumns>
        <MultiColumnComboBoxColumn Field="@nameof(SampleData.Id)">
            <Template>
                @{
                    var currentEmployee = context as SampleData;

                    @if(currentEmployee.Id % 3 == 0)
                    {
                        <span style="font-weight:bold">Important id: @currentEmployee.Id</span>
                    }
                    else
                    {
                        <span style="font-style:italic">@currentEmployee.Id</span>
                    }
                }
            </Template>
        </MultiColumnComboBoxColumn>
        <MultiColumnComboBoxColumn Field="@nameof(SampleData.Name)">
        </MultiColumnComboBoxColumn>
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
