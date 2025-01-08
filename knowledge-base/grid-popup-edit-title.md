---
title: Set Popup Edit Form Title to Model Value
description: How to set the Grid popup edit form's title to a field from the edited data item.
type: how-to
page_title: How to Set Popup Edit Form Title to Model Value
slug: grid-kb-popup-edit-title
position: 
tags: grid, popup, editing
ticketid:
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td> Grid for Blazor, <br /> TreeList for Blazor </td>
        </tr>
    </tbody>
</table>


## Description

How to set the title of a pop up editing window to the value of one of the model's fields?

How to customize the Grid popup edit form title, so that it matches the a property value of the edited data item?

How to dynamically set the Grid popup edit Window title?


## Solution

1. Add a [`<GridPopupEditSettings>` tag](slug://components/grid/editing/popup#popup-customization) inside a `<GridSettings>` tag in the Grid declaration.
1. Set the `Title` parameter of `GridPopupEditSettings` to a string property.
1. Handle the [Grid `OnEdit` event](slug://components/grid/editing/overview#events) and set the popup title to the desired data item value.
1. Handle the `OnClick` event of the button that adds new items. Usually this is a [command button in the Grid toolbar](slug://components/grid/features/toolbar). Set the popup title to the desired string label.

>caption Dynamic Grid Popup Edit Form Title

````RAZOR
<TelerikGrid Data="@GridData"
             TItem="@Product"
             EditMode="@GridEditMode.Popup"
             OnEdit="@OnGridEdit"
             OnUpdate="@OnGridUpdate"
             OnCreate="@OnGridCreate">
    <GridSettings>
        <GridPopupEditSettings Title="@PopupTitle" />
    </GridSettings>
    <GridToolBarTemplate>
        <GridCommandButton Command="Add" Icon="@SvgIcon.Plus"
                           OnClick="@( _ => { PopupTitle = "Adding New Product"; } )">
            Add Product
        </GridCommandButton>
    </GridToolBarTemplate>
    <GridColumns>
        <GridColumn Field=@nameof(Product.Name) Title="Name" />
        <GridCommandColumn>
            <GridCommandButton Command="Edit" Icon="@SvgIcon.Pencil">Edit</GridCommandButton>
        </GridCommandColumn>
    </GridColumns>
</TelerikGrid>

@code {
    private string PopupTitle { get; set; }

    private List<Product> GridData { get; set; }

    private void OnGridEdit(GridCommandEventArgs args)
    {
        var item = args.Item as Product;

        PopupTitle = "Editing " + item.Name;
    }

    private void OnGridUpdate(GridCommandEventArgs args)
    {
        var item = args.Item as Product;

        var index = GridData.FindIndex(i => i.Id == item.Id);
        if (index != -1)
        {
            GridData[index] = item;
        }
    }

    private void OnGridCreate(GridCommandEventArgs args)
    {
        var item = args.Item as Product;

        item.Id = GridData.Count + 1;

        GridData.Insert(0, item);
    }

    protected override void OnInitialized()
    {
        GridData = new List<Product>();

        for (int i = 1; i <= 3; i++)
        {
            GridData.Add(new Product()
            {
                Id = i,
                Name = "Product " + i
            });
        }
    }

    private class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
````

## See Also

* [Grid Popup Editing](slug://components/grid/editing/popup)
