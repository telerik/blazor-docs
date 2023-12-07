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

By default, each Grid cell renders the value of the respective column `Field` of the current data item (row). You can change this behavior by using the `Template` of the column and adding your own content or logic.

The column template (the `<Template>` tag under the column definition) is what the Grid uses to show the "view" representation of the cell. This also includes a column that is marked as `Editable="false"` and is in edit mode.

>tip If you only want to format numbers, dates, enums, you can do so with the [DisplayFormat feature]({%slug grid-columns-displayformat%}) without the need to declare a template.

The example below shows how to:

* Set the `Template` (make sure to use the tag with a capital `T`. The Visual Studio autocomplete tends to use the lowercase `t` which breaks the template logic and does not allow you to access the context).
* Access the template `context`, which is a data item object from the Grid `Data`. You need to cast the `context` to access the data item properties.
* Render HTML or nest components in the column template.
* Use inline or multi-line template.

>caption Using Grid cell (column) template

````CSHTML
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

>tip The above example renders read-only checkboxes to display boolean values. It is possible to [use checkboxes in display mode and directly change the underlying data source values]({%slug grid-kb-checkbox-editing%}). This can make boolean value editing faster, because the Grid doesn't go into edit mode.

## See Also

* [Live Demo: Grid Templates](https://demos.telerik.com/blazor-ui/grid/templates)
* [Live Demo: Grid Custom Editor Template](https://demos.telerik.com/blazor-ui/grid/custom-editor)
