---
title: Column (Cell)
page_title: Grid - Column (Cell) Template
description: Use custom column and cell templates in Grid for Blazor.
slug: grid-templates-column
tags: telerik,blazor,grid,templates,column,cell
published: True
position: 5
---

# Column Template

By default, each Grid cell renders the value of the respective column `Field` of the current data item (row). You can change this behavior by using a column `Template` and adding your own content or logic.

## Basics

To define a column template, use a `<Template>` tag inside the `<GridColumn>` tag. The Grid uses the defined `Template` to show the "view" representation of all cells in that column. This also includes cells from [columns that are marked as `Editable="false"`](slug://components/grid/columns/bound#data-operations), while the cells' parent row is in [inline edit mode](slug://components/grid/editing/inline).

Visual Studio tends to autocomplete the `<Template>` tag with a lowercase `t` which breaks the template logic and does not allow you to access the `context`. Ensure the `Template` tag uses a capital `T`. 

### Template Context

The Grid column template exposes a `context` variable, which is the respective item from the Grid data collection. Cast the `context` to your Grid model type in order to access and use its properties. [Rename the `context` variable when using nested templates, for example a Grid column `Template` inside a Grid `DetailTemplate`](slug://nest-renderfragment).

>tip If you only want to format numbers, dates, enums, you can do so with the [DisplayFormat feature](slug://grid-columns-displayformat) without the need to declare a template.

## Example

The example below shows how to:

* Define a Grid column `Template`.
* Cast and access the template `context`.
* Render HTML or nest components in the column template.
* Use inline or multi-line template.

>caption Using Grid cell (column) template

````RAZOR
<TelerikGrid Data="@GridData" Height="400px">
    <GridColumns>
        <GridColumn Field="@(nameof(FoodItem.Id))" Title="Image">
            <Template>
                @{
                    var item = (FoodItem)context;
                    <img src="@($"https://demos.telerik.com/blazor-ui/images/{item.Id}.jpg")"
                         alt="Image of @item.Name" />
                }
            </Template>
        </GridColumn>
        <GridColumn Field="@(nameof(FoodItem.Name))">
            <Template>
                Food item name:
                <br />
                <strong>@((context as FoodItem).Name)</strong>
            </Template>
        </GridColumn>
        <GridColumn Field="@nameof(FoodItem.BestBefore)" Title="Date - Default format">
        </GridColumn>
        <GridColumn Field="@nameof(FoodItem.BestBefore)" Title="Date - Custom format string">
            <Template>
                @((context as FoodItem).BestBefore.ToString("dd MMM yyyy"))
            </Template>
        </GridColumn>
        <GridColumn Field="@nameof(FoodItem.Organic)">
            <Template>
                @{
                    var item = (FoodItem)context;
                }
                Read-only Checkbox:
                <TelerikCheckBox @bind-Value="@item.Organic" Enabled="false" />
                <br />
                or Icon:
                <TelerikSvgIcon Icon="@( item.Organic ? SvgIcon.CheckboxChecked : SvgIcon.Checkbox )" />
            </Template>
        </GridColumn>
    </GridColumns>
</TelerikGrid>

@code {
    private IEnumerable<FoodItem> GridData = Enumerable.Range(1, 10).Select(x => new FoodItem
        {
            Id = x,
            Name = "Food Item " + x,
            BestBefore = DateTime.Now.AddDays(x),
            Organic = x % 2 != 0
        });

    public class FoodItem
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Quantity { get; set; }
        public DateTime BestBefore { get; set; }
        public bool Organic { get; set; }
    }
}
````

>tip The above example renders read-only checkboxes to display boolean values. You can also [use checkboxes in display mode and directly change the underlying data source values](slug://grid-kb-checkbox-editing). This can make boolean value editing faster, because the Grid doesn't go into edit mode.

## Using Components in Grid Column Templates

@[template](/_contentTemplates/grid/common-link.md#using-components-in-templates)

## See Also

* [Live Demo: Grid Templates](https://demos.telerik.com/blazor-ui/grid/templates)
* [Live Demo: Grid Custom Editor Template](https://demos.telerik.com/blazor-ui/grid/custom-editor)
* [Blazor Grid](slug://grid-overview)
