---
title: Cannot Open a DropDownList inside a Navigable Grid
description: Learn how to troubleshoot the inability to focus or open a Button, DropDownList, ComboBox, or other components inside a navigable Telerik Grid for Blazor.
type: troubleshooting
page_title: Cannot Open a DropDownList inside a Navigable Grid
slug: grid-kb-cannot-open-dropdown-in-navigable-grid
tags: telerik, blazor, grid, treelist
ticketid: 1623773
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>
                Grid for Blazor, <br />
                TreeList for Blazor
            </td>
        </tr>
    </tbody>
</table>

## Description

Dropdown components do not open inside a Grid column `<Template>` when the Grid has [`Navigable="true"`](https://demos.telerik.com/blazor-ui/grid/keyboard-navigation).

## Cause

When the Grid keyboard navigation is enabled, the table cells automatically gain focus when a cell is clicked. If the cell contains a focusable element, this element may lose focus unexpectedly on click.

## Solution

Normally, editor components belong to [`<EditorTemplate>`](slug://grid-templates-editor)s, but this article assumes that editor templates are not an option. Thus, other possible options include:

* If data operations like sorting and filtering are not necessary for the affected columns, place buttons or dropdown components like ComboBox or DropDownList inside a [Grid Command Column](slug://components/grid/columns/command) instead. Grid command columns do not gain focus automatically when a nested focusable element is clicked.
* If data operations for the affected columns are required, then use a container with `@onclick:stopPropagation` inside the `<GridColumn>` template. This will prevent the Grid from knowing about the clicks, so the data cell will not gain focus automatically.

>caption Using dropdowns, buttons and other focusable elements inside a navigable Grid

```RAZOR
<TelerikGrid Data="@GridData" Navigable="true">
    <GridColumns>
        <GridColumn Field="@nameof(Product.Name)" Title="Cells will steal focus on click" HeaderClass="warning">
            <Template>
                @{ var dataItem = (Product)context; }
                <span class="template-span">
                    <TelerikButton OnClick="@( () => OnButtonClick(dataItem.Id) )">@dataItem.Name</TelerikButton>
                    <TelerikDropDownList Data="@DropDownListData" @bind-Value="@dataItem.Active" />
                </span>
            </Template>
        </GridColumn>
        <GridColumn Field="@nameof(Product.Name)" Title="Template with stopPropagation" HeaderClass="success">
            <Template>
                @{ var dataItem = (Product)context; }
                <span @onclick:stopPropagation class="template-span">
                    <TelerikButton OnClick="@( () => OnButtonClick(dataItem.Id) )">@dataItem.Name</TelerikButton>
                    <TelerikDropDownList Data="@DropDownListData" @bind-Value="@dataItem.Active" />
                </span>
            </Template>
        </GridColumn>
        <GridCommandColumn Title="Command Column" HeaderClass="success">
            @{ var dataItem = (Product)context; }
            <span class="template-span">
                <TelerikButton OnClick="@( () => OnButtonClick(dataItem.Id) )">@dataItem.Name</TelerikButton>
                <TelerikDropDownList Data="@DropDownListData" @bind-Value="@dataItem.Active" />
            </span>
        </GridCommandColumn>
    </GridColumns>
</TelerikGrid>

<style>
    .template-span {
        display: flex;
        gap: 1em;
        padding: .3em;
    }

    .warning {
        background-color: var(--kendo-color-warning);
    }

    .success {
        background-color: var(--kendo-color-success);
        color: var(--kendo-color-on-success);
    }
</style>

@code {
    List<Product> GridData { get; set; } = new();

    List<bool> DropDownListData { get; set; } = new List<bool>() { true, false };

    private void OnButtonClick(int id)
    {
        Console.WriteLine($"Button click on data item {id}");
    }

    protected override void OnInitialized()
    {
        for (int i = 1; i <= 3; i++)
        {
            GridData.Add(new Product()
            {
                Id = i,
                Name = $"Name {i}",
                Active = i % 3 == 0
            });
        }
    }

    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public bool Active { get; set; }
    }
}
```

## See Also

* [Grid Keyboard Navigation Demo](https://demos.telerik.com/blazor-ui/grid/keyboard-navigation)
* [Grid Column Template](slug://grid-templates-column)
* [Grid Command Column](slug://components/grid/columns/command)
