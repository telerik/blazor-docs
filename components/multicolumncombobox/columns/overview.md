---
title: Overview
page_title: MultiColumnComboBox Columns
description: Data binding and bound column properties in MultiColumnComboBox for Blazor.
slug: multicolumncombobox-columns-overview
tags: telerik,blazor,multicolumncombobox,combo,columns,bound,column,databind
published: True
position: 0
components: ["multicolumncombobox"]
---
# MultiColumnComboBox Columns

This article explains how to show data in the dropdown columns of the MultiColumnComboBox.

## Bind Data To The Columns

To bind data to the `<MultiColumnComboBoxColumn>` you can use the `Field`. This parameter points to the (case-sensitive) name of field in the data source that the column will render as a string. You can set it in plain text (`Field="SomeField"`) or let .NET extract the field name from the model (`Field="@nameof(MyModelClass.Field)"`).

## Parameters

>caption The MultiColumnComboBox provides various parameters that allow you to configure the component:

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type | Description |
| --- | --- | --- |
| `Field` | `string` | Points to the name of field in the data source that the column will render as a string (case-sensitive). |
| `Width` | `string` | Defines the width of the MultiColumnComboBox column. |
| `Class` | `string` | The CSS class that will be rendered on the column's content cells. |
| `HeaderClass` | `string` | The CSS class that will be rendered on the column's header cell. |
| `Title` | `string` | The string title rendered in the column header. If it is not explicitly declared the value of the `Field` will be rendered. |
| `HeaderTemplate` | `RenderFragment` | The HeaderTemplate allows you to control the rendering of the column's header cell. Read more in the [Templates](slug:multicolumncombobox-columns-templates#headertemplate ) article. |
| `Template` | `RenderFragment<object>` | The Template allows you to control the rendering of the column's cells. Read more in the [Templates](slug:multicolumncombobox-columns-templates#template) article. |

>caption MultiColumnComboBoxColumn with its features

````RAZOR
<TelerikMultiColumnComboBox Data="@MultiComboData"
                            @bind-Value="@BoundValue"
                            ValueField="@nameof(SampleData.Id)"
                            TextField="@nameof(SampleData.Name)"
                            Width="300px">
    <MultiColumnComboBoxColumns>
        <MultiColumnComboBoxColumn Field="@nameof(SampleData.Id)"
                                   Title="The id"
                                   Class="id-cell-class"
                                   HeaderClass="id-header-class"
                                   Width="300px">
        </MultiColumnComboBoxColumn>
        <MultiColumnComboBoxColumn Field="@nameof(SampleData.Name)"
                                   Title="The name"
                                   Class="name-cell-class"
                                   HeaderClass="name-header-class"
                                   Width="300px">
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

<style>
    .id-cell-class {
        font-weight: bold;
        font-style: italic;
    }

    .id-header-class {
        font-weight: bold;
        color: blue;
    }

    .name-cell-class {
        color: darkslategray;
        font-weight: bolder;
    }

    .name-header-class {
        font-weight: bold;
        background-color: lightblue;
    }
</style>
````


## See Also

* [Templates](slug:multicolumncombobox-templates)
* [Use Custom MultiColumnComboBox with Grid](slug:multicolumncombobox-kb-grid)
