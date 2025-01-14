---
title: Implement ListView Popup Editing
description: How to implement popup editing for the Telerik Blazor ListView.
type: how-to
page_title: How to use a Popup Edit Form with the Telerik Blazor ListView
slug: listview-kb-popup-editing
position: 
tags: listview, edit, popup
ticketid: 1617531
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>ListView for Blazor</td>
        </tr>
    </tbody>
</table>


## Description

How to use popup editing for the ListView component, similar to the Grid?


## Solution

The steps below assume that the ListView data items are of type `TItem`.

1. Define an additional variable of type `TItem` in the Razor component. This variable will hold the copy of the ListView item, which is in edit or create mode. In the example below, this is `ProductInEditMode`.
1. Define a [Telerik Window](slug://window-overview) that will contain the popup edit form. Bind the Window's `Visible` parameter to some variable. Configure the Window's dimensions, modality, actions, etc.
1. Define a [Telerik Form](slug://form-overview) inside the Window's `<WindowContent>`. Set the Form's `Model` parameter to the variable of type `TItem` from step 1. You can also use an `EditContext` instead of a `Model`.
1. Add an edit Button to the [ListView `<Template>`](slug://listview-templates). Use a lambda expression to pass the ListView template `context` as an argument to the [Button's `OnClick` handler](slug://button-events). Assign the `context` property values to the variable from step 1.
1. Add a Button to the [ListView `<HeaderTemplate>`](slug://listview-templates) or anywhere outside the ListView. This Button's `OnClick` handler will create a new instance of `TItem` and assign it to the variable from step 1.
1. Set the Window's `Visible` parameter to `true` on add/edit Button click.
1. Use the [Form's `OnValidSubmit` or `OnSubmit` event](slug://form-events) to save the ListView item to the database, [`Rebind()`](slug://common-features-data-binding-overview#refresh-data) the ListView, and hide the Window.

>caption ListView Popup Editing

````RAZOR
@using System.ComponentModel.DataAnnotations

<TelerikListView @ref="@ListViewRef"
                 Data="@ListViewData"
                 Width="600px">
    <HeaderTemplate>
        <div class="listview-item">
            <h3>Product Name</h3>
            <span>Details</span>
            <TelerikButton OnClick="@OnAddClick">Add</TelerikButton>
        </div>
    </HeaderTemplate>
    <Template>
        <div class="listview-item">
            <h3>@context.Name</h3>
            <ul>
                <li><strong>Price</strong>: @context.Price.ToString("C2")</li>
                <li><strong>Stock</strong>: @context.Stock</li>
                <li><strong>Released</strong>: @context.ReleaseDate?.ToString("d")</li>
                <li><strong>In Production</strong>: @context.InProduction</li>
            </ul>
            <TelerikButton OnClick="@( () => OnEditClick(context) )">Edit</TelerikButton>
        </div>
    </Template>
</TelerikListView>

<TelerikWindow Width="40vw"
               Modal="true"
               @bind-Visible="@EditWindowVisible">
    <WindowActions>
        <WindowAction Name="Close" />
    </WindowActions>
    <WindowTitle>@( ProductInEditMode?.Id > 0 ? ProductInEditMode!.Name : "Add New Product" )</WindowTitle>
    <WindowContent>
        <TelerikForm Model="@ProductInEditMode"
                     OnValidSubmit="@OnFormValidSubmit">
            <FormButtons>
                <TelerikButton ThemeColor="@ThemeConstants.Button.ThemeColor.Primary">Submit</TelerikButton>
                <TelerikButton ButtonType="@ButtonType.Button"
                               OnClick="@( () => EditWindowVisible = false )">Cancel</TelerikButton>
            </FormButtons>
        </TelerikForm>
    </WindowContent>
</TelerikWindow>

<style>
    .listview-item {
        display: flex;
        gap: 2em;
        align-items: center;
        justify-content: space-between;
        padding: 1em 2em;
    }

        .listview-item h3 {
            flex: 0 0 160px;
        }

    :nth-child(2n+1) > .listview-item {
        background: rgba(0, 0, 0, .04);
    }
</style>

@code {
    private TelerikListView<Product> ListViewRef { get; set; } = null!;

    private List<Product> ListViewData { get; set; } = new List<Product>();

    private bool EditWindowVisible { get; set; }

    private Product? ProductInEditMode { get; set; }

    private int LastId { get; set; }

    private async Task OnFormValidSubmit()
    {
        if (ProductInEditMode!.Id != default)
        {
            var originalIndex = ListViewData.FindIndex(x => x.Id == ProductInEditMode.Id);
            ListViewData[originalIndex] = ProductInEditMode;
        }
        else
        {
            ProductInEditMode.Id = ++LastId;
            ListViewData.Insert(0, ProductInEditMode);
        }

        // Simulate remote data request.
        await Task.Delay(100);

        // Refresh the ListView to show the changes.
        ListViewRef.Rebind();

        EditWindowVisible = false;
    }

    private void OnEditClick(Product dataItem)
    {
        // Clone the data item, so that users can cancel editing.
        ProductInEditMode = dataItem.Clone();

        EditWindowVisible = true;
    }

    private void OnAddClick()
    {
        ProductInEditMode = new Product();

        EditWindowVisible = true;
    }

    protected override void OnInitialized()
    {
        var rnd = new Random();

        for (int i = 1; i <= 3; i++)
        {
            ListViewData.Add(new Product()
            {
                Id = ++LastId,
                Name = $"Product {i}",
                Price = (decimal)rnd.Next(1, 100),
                Stock = rnd.Next(0, 50),
                ReleaseDate = DateTime.Now.AddDays(-rnd.Next(60, 1000)),
                InProduction = i % 3 == 0
            });
        }
    }

    public class Product
    {
        [Editable(false)]
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public decimal Price { get; set; }

        public int Stock { get; set; }

        [Display(Name = "Release Date")]
        public DateTime? ReleaseDate { get; set; }

        [Display(Name = "In Production")]
        public bool InProduction { get; set; }

        public Product Clone()
        {
            return new Product()
            {
                Id = Id,
                Name = Name,
                Price = Price,
                Stock = Stock,
                ReleaseDate = ReleaseDate,
                InProduction = InProduction
            };
        }
    }
}
````

## See Also

* [ListView Editing](slug://listview-editing)
* [Form Overview](slug://form-overview)
* [Window Overview](slug://window-overview)
