---
title: Autofill a Default Value on Double-Click in Grid Edit Mode
description: Learn how to autofill a default value in a Telerik Grid cell during inline editing when double-clicking the cell.
type: how-to
page_title: Automatically Fill Default Value on Double-Click in Grid Inline Editing
meta_title: Automatically Fill Default Value on Double-Click in Grid Inline Editing
slug: grid-kb-autofill-default-value-double-click
tags: grid, gridcolumn, double-click, editing
res_type: kb
ticketid: 1700794
components: ["grid"]
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

I want to autofill a default value for a specific cell in the Grid when double-clicking on it. The cell is in edit mode.

## Solution

To autofill a default value in the cell on double-click during inline editing, use the [`EditorTemplate`](slug:grid-templates-editor) of the Grid column and handle the `ondblclick` event.

````Razor
<TelerikGrid Data="@Products"
             EditMode="@GridEditMode.Inline"
             OnUpdate="@OnGridUpdate">
    <GridColumns>
        <GridColumn Field="@nameof(Product.Name)" Width="200px">
            <EditorTemplate>
                @{
                    var item = (Product)context;

                    <div ondblclick="@(() => OnEditorDoubleClick(item))" style="border: 1px solid transparent; padding: 4px;">
                        <TelerikTextBox @bind-Value="@item.Name" />
                    </div>
                }
            </EditorTemplate>
        </GridColumn>
        <GridColumn Field="@nameof(Product.Description)" Width="200px" />
        <GridCommandColumn Width="200px">
            <GridCommandButton Command="Edit" Icon="@SvgIcon.Pencil">Edit</GridCommandButton>
            <GridCommandButton Command="Save" Icon="@SvgIcon.Save" ShowInEdit="true">Save</GridCommandButton>
            <GridCommandButton Command="Cancel" Icon="@SvgIcon.Cancel" ShowInEdit="true">Cancel</GridCommandButton>
        </GridCommandColumn>
    </GridColumns>
</TelerikGrid>

@code {
    private List<Product> Products { get; set; }

    private async Task OnGridUpdate(GridCommandEventArgs args)
    {
        var item = (Product)args.Item;
        var index = Products.FindIndex(x => x.Id == item.Id);

        Products[index] = item;
    }

    private void OnEditorDoubleClick(Product product)
    {
        product.Name = $"{product.Name} (edited)";
    }

    protected override void OnInitialized()
    {
        Products = new List<Product>() {
            new Product()
            {
                Name = "Product Name",
                Description = "Description text",
            }
        };

        base.OnInitialized();
    }

    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
````

## See Also

* [Grid Overview](slug:grid-overview)
* [Grid Editor Template](slug:grid-templates-editor)
