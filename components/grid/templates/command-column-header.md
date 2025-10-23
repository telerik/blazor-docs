---
title: Command Column Header
meta_title: Grid - Command Column Header Template
description: Use custom command column header template in Grid for Blazor.
slug: grid-templates-command-column-header
tags: telerik,blazor,grid,templates,command,column,header
published: True
position: 23
---

# Command Column Header Template

The `HeaderTemplate` of the Grid command column enables you to customize the header cell's rendering and add custom content or components in the command column header.

>caption Grid Command Column Header Template

````RAZOR
@* Customize the header of the command column *@

<TelerikGrid Data="@GridData"
             EditMode="@GridEditMode.Inline"
             OnUpdate="@OnUpdateHandler"
             Pageable="true"
             Height="400px">
    <GridColumns>
        <GridColumn Field="@nameof(Product.Name)" Title="Product Name" />
        <GridColumn Field="@nameof(Product.Price)" Title="Price" />
        <GridColumn Field="@nameof(Product.Quantity)" Title="Quantity" />
        <GridCommandColumn Width="280px">
            <HeaderTemplate>
                <TelerikSvgIcon Icon="@SvgIcon.Gear" />
                <strong>Actions</strong>
            </HeaderTemplate>
            <GridCommandButton Command="Edit" Icon="@SvgIcon.Pencil">Edit</GridCommandButton>
            <GridCommandButton Command="Save" Icon="@SvgIcon.Save" ShowInEdit="true">Update</GridCommandButton>
            <GridCommandButton Command="Cancel" Icon="@SvgIcon.Cancel" ShowInEdit="true">Cancel</GridCommandButton>
            <GridCommandButton Command="Delete" Icon="@SvgIcon.Trash">Delete</GridCommandButton>
        </GridCommandColumn>
    </GridColumns>
</TelerikGrid>

@code {
    private List<Product> GridData { get; set; } = new List<Product>();

    private async Task OnUpdateHandler(GridCommandEventArgs args)
    {
        var updatedItem = args.Item as Product;
        var index = GridData.FindIndex(p => p.Id == updatedItem.Id);
        if (index != -1)
        {
            GridData[index] = updatedItem;
        }
    }

    protected override void OnInitialized()
    {
        GridData = Enumerable.Range(1, 10).Select(x => new Product
        {
            Id = x,
            Name = "Product " + x,
            Price = Random.Shared.Next(1, 100),
            Quantity = Random.Shared.Next(0, 50)
        }).ToList();
    }

    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
    }
}
````

## See Also

* [Grid Command Column](slug:components/grid/columns/command)