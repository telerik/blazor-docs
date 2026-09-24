---
title: How to Update Breadcrumb Items from a Page
description: Update Breadcrumb items rendered in a Blazor layout after a page loads data.
type: how-to
page_title: How to Update Breadcrumb Items from a Page
slug: breadcrumb-update-items-from-page
tags: telerik, blazor, breadcrumb, navigation, state
res_type: kb
components: ["breadcrumb"]
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Breadcrumb for Blazor</td>
        </tr>
        <tr>
            <td>Version</td>
            <td>15.0.1 and above</td>
        </tr>
    </tbody>
</table>

## Description

Update Breadcrumb items from a page when the Breadcrumb is rendered in `MainLayout.razor` and the page loads data asynchronously.

This KB article answers the following questions:

* How to update Breadcrumb items after a page loads data.
* How to share Breadcrumb state between a page and `MainLayout.razor`.
* How to display a data-bound value, such as a product name, in a layout Breadcrumb.

## Solution

Do not create separate `Items` lists in the layout and the page. Store the items in a scoped state service that both components use.

Register the state service in `Program.cs`:

````C#
builder.Services.AddScoped<BreadcrumbState>();
````

Create the state service and the model for the Breadcrumb items:

````C#
using System;
using System.Collections.Generic;
using System.Linq;

public sealed class BreadcrumbState
{
    public IReadOnlyList<BreadcrumbItemModel> Items { get; private set; } = Array.Empty<BreadcrumbItemModel>();

    public event Action? Changed;

    public void SetItems(IEnumerable<BreadcrumbItemModel> items)
    {
        Items = items.ToList();
        Changed?.Invoke();
    }
}

public class BreadcrumbItemModel
{
    public string Text { get; set; } = string.Empty;
    public string Url { get; set; } = string.Empty;
}
````

Inject the service into `MainLayout.razor`, bind the Breadcrumb to its `Items` property, and re-render the layout when the state changes:

````RAZOR
@inherits LayoutComponentBase
@implements IDisposable
@inject BreadcrumbState BreadcrumbState

<TelerikBreadcrumb Data="@BreadcrumbState.Items" />

@Body

@code {
    protected override void OnInitialized()
    {
        BreadcrumbState.Changed += OnBreadcrumbStateChanged;
    }

    private void OnBreadcrumbStateChanged()
    {
        _ = InvokeAsync(StateHasChanged);
    }

    public void Dispose()
    {
        BreadcrumbState.Changed -= OnBreadcrumbStateChanged;
    }
}
````

Inject the same service into the page and update it after the page data loads. `ProductService` represents the existing application service that loads the page data:

````RAZOR
@page "/products/{ProductId:int}"
@inject BreadcrumbState BreadcrumbState
@inject ProductService ProductService

@code {
    [Parameter]
    public int ProductId { get; set; }

    protected override async Task OnInitializedAsync()
    {
        var product = await ProductService.GetAsync(ProductId);

        BreadcrumbState.SetItems(new[]
        {
            new BreadcrumbItemModel { Text = "Home", Url = "/" },
            new BreadcrumbItemModel { Text = "Products", Url = "/products" },
            new BreadcrumbItemModel { Text = product.Name, Url = $"/products/{product.Id}" }
        });
    }
}
````

The page updates the same state object that the layout uses, so the layout Breadcrumb re-renders with the loaded product name. Use `OnInitializedAsync` when the data load is asynchronous. The page does not need to subscribe to `LocationChanged` for this scenario.

## See Also

* [Breadcrumb Navigation](slug:breadcrumb-navigation)
* [Breadcrumb Overview](slug:breadcrumb-overview)
