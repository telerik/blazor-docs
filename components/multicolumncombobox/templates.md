---
title: Templates
page_title: MultiColumnComboBox - Templates
description: Templates in the ComboBox for Blazor.
slug: components/combobox/templates
tags: telerik,blazor,combo,combobox,templates
published: True
position: 25
---

# MultiColumnComboBox Templates

The MultiColumnComboBox component allows you to change what is rendered in its header and footer through templates.

List of the available templates:

<style>
    article style + table {
        table-layout: auto;
        word-break: normal;
    }
</style>
| Template | Description |
| --- | --- |
| [`Header`](#header) | Controls the rendering of the element above the list of items in the dropdown. |
| [`Footer`](#footer) | Controls the rendering of the element below the list of items in the dropdown. |

## Header

The header is content that you can place above the list of items inside the dropdown element. It is always visible when the MultiColumnComboBox is expanded. By default it is empty.

>caption Header Example

````CSHTML
@* Define a header in the dropdown *@

<TelerikMultiColumnComboBox Data="@MultiComboData"
                            @bind-Value="@BoundValue"
                            ValueField="@nameof(SampleData.Id)"
                            TextField="@nameof(SampleData.Name)">
    <HeaderTemplate>
        <div style="font-weight: bold">Header</div>
    </HeaderTemplate>
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

## Footer

The footer is content that you can place below the list of items inside the dropdownlist element. It is always visible when the dropdown is expanded. By default it is empty.

>caption Footer Example

````CSHTML
@* Define dropdown footer *@

<TelerikMultiColumnComboBox Data="@MultiComboData"
                            @bind-Value="@BoundValue"
                            ValueField="@nameof(SampleData.Id)"
                            TextField="@nameof(SampleData.Name)">
    <FooterTemplate>
        <div style="font-weight: bold">Footer</div>
    </FooterTemplate>
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

## See Also

  * [Live Demo: MultiColumnComboBox Templates](https://demos.telerik.com/blazor-ui/multicolumncombobox/templates)
   
  
