---
title: Instance of Entity Type Cannot Be Tracked
description: Learn how to resolve and avoid exceptions when updating Grid items in an Entity Framework DbContext DbSet. The exception message may read The instance of entity type ... cannot be tracked because another instance with the same key value ... is already being tracked.
type: troubleshooting
page_title: How to Fix Exception Instance of Entity Type Cannot Be Tracked
slug: grid-kb-entity-framework-model-update
tags: blazor, grid, treelist, editing, entityframework
ticketid:
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Grid for Blazor, <br /> TreeList for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

When binding the Grid directly to Entity Framework models or `DbSet`, and using `GridCommandEventArgs.Item` in your database update method, you can get one of the following exceptions:

* `The instance of entity type ... cannot be tracked because another instance with the same key value for ... is already being tracked.`
* `This is a DynamicProxy2 error: The interceptor attempted to 'Proceed' for method 'Microsoft.EntityFrameworkCore.Infrastructure.ILazyLoader get_LazyLoader()' which has no target.`.

## Cause

The Grid [creates a separate data item instance when going into add or edit mode](slug:components/grid/editing/overview#item-instances). Entity Framework can track one only entity with a given primary key value.

## Solution

Perform the database update as follows:

1. Find the original object in your database by its unique ID.
1. Commit the changes by doing one of the following:
    * Transfer the property values from the updated object to the original object.
    * Replace the original object in the Entity Framework `DbSet` with the updated one.
1. Save the changes in the `DbContext`.

> The following examples use Microsoft Entity Framework APIs and do not claim to reflect best practices. Use them as general guidance and adjust, according to your preferences.

### Update Original Data Item

>caption Change the property values of the original Entity Framework item instance

````CS.skip-repl
// OnGridUpdate is the Grid OnUpdate handler
// Product is the Grid model class
// DbContextEF is the DbContext instance
// DbContextEF.Products is a DbSet<Product>

private async Task OnGridUpdate(GridCommandEventArgs args)
{
    var updatedProduct = (Product)args.Item;

    var originalProduct = await DbContextEF.Products.FirstOrDefaultAsync(x => x.Id == updatedProduct.Id);

    if (originalProduct != null)
    {
        DbContextEF.Entry(originalProduct).CurrentValues.SetValues(updatedProduct);

        await DbContextEF.SaveChangesAsync();
    }
}
````

### Replace Original Data Item

>caption Detach and replace the original Entity Framework item instance

````CS.skip-repl
// OnGridUpdate is the Grid OnUpdate handler
// Product is the Grid model class
// DbContextEF is the DbContext instance
// DbContextEF.Products is a DbSet<Product>

private async Task OnGridUpdate(GridCommandEventArgs args)
{
    var updatedProduct = (Product)args.Item;

    var originalProduct = await DbContextEF.Products.FirstOrDefaultAsync(x => x.Id == updatedProduct.Id);

    if (originalProduct != null)
    {
        DbContextEF.Products.Entry(originalProduct).State = EntityState.Detached;
        DbContextEF.Products.Update(updatedProduct);

        await DbContextEF.SaveChangesAsync();
    }
}
````

### Update Original Data Item Properties One by One

>caption Change the property values of the original Entity Framework item instance one by one

````CS.skip-repl
// OnGridUpdate is the Grid OnUpdate handler
// Product is the Grid model class
// DbContextEF is the DbContext instance
// DbContextEF.Products is a DbSet<Product>

private async Task OnGridUpdate(GridCommandEventArgs args)
{
    var updatedProduct = (Product)args.Item;

    var originalProduct = await DbContextEF.Products.FirstOrDefaultAsync(x => x.Id == updatedProduct.Id);

    if (originalProduct != null)
    {
        originalProduct.Name = updatedProduct.Name;
        originalProduct.Price = updatedProduct.Price;
        originalProduct.Quantity = updatedProduct.Quantity;

        await DbContextEF.SaveChangesAsync();
    }
}
````

## See Also

* [Grid CRUD Operations Overview](slug:components/grid/editing/overview)
* [TreeList CRUD Operations Overview](slug:treelist-editing-overview)
