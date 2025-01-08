---
title: Transpose Grid
description: Learn how to show transposed Grid data in a table or a Form. The transposed data may or may not support editing.
type: how-to
page_title: How to Transpose the Telerik Grid for Blazor
slug: grid-kb-transposed
tags: telerik, blazor, grid, transposed
ticketid: 1569198, 1639288, 1660386
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Grid for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

This KB article answers the following questions:

* How to transpose the data grid component?
* How to convert the Grid columns to rows and the Grid rows to columns?
* How to achieve a horizontal Grid configuration?
* How to switch the Grid orientation? The model properties should display vertically and the model values should display horizontally.

## Solution

The Telerik Grid for Blazor does not support transposing. A transposed Grid requires a different architecture, implementation and UI. Thus, a transposed Grid must be a separate component, such as the [Telerik PropertyGrid for Blazor](https://feedback.telerik.com/blazor/1468343-propertygrid-property-grid-vertical-oriented-grid-with-cell-labels-in-column-1). Vote for the feature request and follow it to receive status updates.

## Suggested Workarounds

Here are a few possible ways to display transposed data:

* Use the [Telerik Form component for Blazor](slug://form-overview) instead of a Grid. The Form does not provide Grid features, but it can be databound to a model object and supports editing.
* Render static HTML markup, which uses the Grid CSS classes. This will produce Grid-like UI, but without any additional built-in features.
* Combine the previous two options to achieve a Form that looks like a Grid. Use the Grid's HTML markup in a [Form `FormItemsTemplate`](slug://form-formitems-formitemstemplate). Optionally, remove the [built-in Form submit button by using an empty `<FormButtons>` tag](slug://form-formitems-buttons).

Alternatively, shape the data structure, so that it's suitable to display in a regular non-transposed Grid.

The following example demonstrates all options.

>caption Implement a PropertyGrid or a transposed Grid

````RAZOR
@using System.Reflection

<h2>Form</h2>

<TelerikForm Model="@DataItem"
             Orientation="@FormOrientation.Horizontal"
             OnUpdate="@( () => { /* OnUpdate is an EventCallback, so it refreshes the UI */ } )"
             Width="300px"
             Class="bold-labels">
</TelerikForm>

<style>
    /* Emphasize the Form labels */
    .bold-labels .k-form-label {
        font-weight: bold;
    }
</style>

<h2>Editable HTML Table in Form <code>FormItemsTemplate</code></h2>

<TelerikForm Model="@DataItem"
             Orientation="@FormOrientation.Horizontal"
             OnUpdate="@( () => { /* OnUpdate is an EventCallback, so it refreshes the UI */ } )"
             Width="600px">
    <FormItems>
        <FormItem Field="@nameof(GridItem.Id)">
            <Template>
                <TelerikNumericTextBox @bind-Value="@DataItem.Id" />
            </Template>
        </FormItem>
        <FormItem Field="@nameof(GridItem.Name)">
            <Template>
                <TelerikTextBox @bind-Value="@DataItem.Name" />
            </Template>
        </FormItem>
        <FormItem Field="@nameof(GridItem.Description)">
            <Template>
                <TelerikTextBox @bind-Value="@DataItem.Description" />
            </Template>
        </FormItem>
        <FormItem Field="@nameof(GridItem.Quantity)">
            <Template>
                <TelerikNumericTextBox @bind-Value="@DataItem.Quantity" />
            </Template>
        </FormItem>
        <FormItem Field="@nameof(GridItem.Active)">
            <Template>
                <TelerikCheckBox @bind-Value="@DataItem.Active" />
            </Template>
        </FormItem>
    </FormItems>
    <FormButtons></FormButtons>
    <FormItemsTemplate>
        <div class="k-grid k-grid-md html-grid">
            <div class="k-grid-aria-root">
                <div class="k-grid-header">
                    <div class="k-grid-header-wrap">
                        <table class="k-grid-header-table k-table k-table-md">
                            <colgroup>
                                <col />
                                <col />
                            </colgroup>
                            <thead class="k-table-thead">
                                <tr class="k-table-row">
                                    <th class="k-header k-table-th"> Property Name </th>
                                    <th class="k-header k-table-th"> Editable Value </th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
                <div class="k-grid-container">
                    <div class="k-grid-content">
                        <table class="k-grid-table k-table k-table-md">
                            <colgroup>
                                <col />
                                <col />
                            </colgroup>
                            <tbody class="k-table-tbody">
                                @{ int counter = 1; }

                                @foreach (IFormItem item in context.Items)
                                {
                                    <tr class="k-master-row k-table-row k-grid-edit-row @( counter++ % 2 == 0 ? "k-table-alt-row" : "" )">
                                        <th scope="row" class="k-table-td k-table-thead"> @item.Field </th>
                                        <td class="k-table-td k-grid-edit-cell">
                                            <TelerikFormItemRenderer Item="@item" />
                                        </td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </FormItemsTemplate>
</TelerikForm>

<style>
    /* Adjust the row headers to look better one below the other */
    .html-grid tbody th.k-table-td {
        font-weight: bold;
        border-bottom-width: 0;
    }

    /* Remove unnecessary space */
    .html-grid div.k-form-field {
        margin-top: 0;
    }
</style>

<h2>Read-Only HTML Table</h2>

<div class="k-grid k-grid-md html-grid" style="width:600px">
    <div class="k-grid-aria-root">
        <div class="k-grid-header">
            <div class="k-grid-header-wrap">
                <table class="k-grid-header-table k-table k-table-md">
                    <colgroup>
                        <col />
                        <col />
                    </colgroup>
                    <thead class="k-table-thead">
                        <tr class="k-table-row">
                            <th class="k-header k-table-th"> Property Name </th>
                            <th class="k-header k-table-th"> Read-Only Value </th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
        <div class="k-grid-container">
            <div class="k-grid-content">
                <table class="k-grid-table k-table k-table-md">
                    <colgroup>
                        <col />
                        <col />
                    </colgroup>
                    <tbody class="k-table-tbody">
                        @{
                            int counter = 1;
                            foreach (var prop in GridItemProps)
                            {
                                <tr class="k-master-row k-table-row @( counter++ % 2 == 0 ? "k-table-alt-row" : "" )">
                                    <th scope="row" class="k-table-td k-table-thead"> @prop.Name </th>
                                    <td class="k-table-td"> @prop.GetValue(DataItem) </td>
                                </tr>
                            }
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

<h2>Editable Grid</h2>

<TelerikGrid @ref="@GridRef"
             Data="@GridData"
             EditMode="@GridEditMode.Incell"
             OnUpdate="@OnGridUpdate">
    <GridColumns>
        <GridColumn Field="@nameof(GridItem.Id)" />
        <GridColumn Field="@nameof(GridItem.Name)" />
        <GridColumn Field="@nameof(GridItem.Description)" />
        <GridColumn Field="@nameof(GridItem.Quantity)" />
        <GridColumn Field="@nameof(GridItem.Active)" />
    </GridColumns>
</TelerikGrid>

@code {
    private TelerikGrid<GridItem>? GridRef { get; set; }

    private List<GridItem> GridData { get; set; } = new();
    private List<PropertyInfo> GridItemProps { get; set; } = new();

    private GridItem DataItem { get; set; } = new GridItem()
    {
        Id = 1,
        Name = "Sample Name 1",
        Description = "Dummy Descrition 1",
        Quantity = 123,
        Active = true
    };

    private void OnGridUpdate(GridCommandEventArgs args)
    {
        var updatedItem = (GridItem)args.Item;

        DataItem.Active = updatedItem.Active;
        DataItem.Description = updatedItem.Description;
        DataItem.Id = updatedItem.Id;
        DataItem.Name = updatedItem.Name;
        DataItem.Quantity = updatedItem.Quantity;
    }

    protected override void OnInitialized()
    {
        GridData = new List<GridItem>() { DataItem };

        GridItemProps = typeof(GridItem).GetProperties().ToList();

        base.OnInitialized();
    }

    public class GridItem
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public bool Active { get; set; }
    }
}
````

## See Also

* [Grid Overview](slug://grid-overview)
* [Form FormItemsTemplate](slug://form-formitems-formitemstemplate)
