---
title: Conditional Grid ToolBar and DetailTemplate
description: How to show and hide the Grid toolbar and the hierarchy detail template conditionally?
type: how-to
page_title: Show and Hide the Grid ToolBar and DetailTemplate on Condition
slug: grid-kb-conditional-toolbar-detail-template
position: 
tags: telerik, blazor, grid
ticketid: 1593375, 1593659
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>
                Grid for Blazor <br />
                (The approach is applicable for any component and <code>RenderFragment</code>.)
            </td>
        </tr>
    </tbody>
</table>

## Description

How can I conditionally hide the Grid ToolBar (`GridToolBarTemplate`)? I want the GridToolBar to be shown only to some users.

How to define a conditional Grid Detail Template (`DetailTemplate`)? I want to hide the hierarchy from the user if there is nothing to render in the detail rows.

## Solution

The [`GridToolBarTemplate`](slug:components/grid/features/toolbar) and the [`DetailTemplate`](slug:components/grid/features/hierarchy) are standard Blazor `RenderFragment`s. Their default value is `null` and then the toolbar and the hierarchy are not rendered. As soon as the `<GridToolBar>` or `<DetailTemplate>` tag is added, the `RenderFragment` value is no longer `null`, even if the tag itself is empty.

There are two ways to display a `RenderFragment` or any template conditionally:

1. Render the content *inside* the `RenderFragment` conditionally. Toggle the visibility of the template container and any other HTML markup with custom CSS that uses the component's `Class` parameter.
1. Define the `GridToolBarTemplate` or `DetailTemplate` as a *parameter*, instead of a *nested tag*. Set the parameter value conditionally to a separate `RenderFragment` or to `null`. You can't use anonymous inline methods in this case, because they can't be equal to `null`. This approach is entirely generic for Blazor - you can use it for any component, not just Telerik Blazor components.

The example below provides one suggestion for option 1 and two suggestions for option 2.

>caption Using conditional Grid toolbar and detail template

````RAZOR
<h1>Conditional Component Elements</h1>

<p><label> <TelerikCheckBox @bind-Value="@ShowOptionalGridElements" /> Enable Grid ToolBar and Hierarchy </label></p>

<h2>1. Conditional statement inside the RenderFragment + custom CSS:</h2>

<style>
    /* hide Grid ToolBar, Detail Template and hierarchy icons */
    .no-toolbar .k-grid-toolbar,
    .no-detail .k-detail-row,
    .no-detail .k-hierarchy-cell .k-icon {
        display: none;
    }

    /* collapse hierarchy column to zero width */
    .no-detail col.k-hierarchy-col {
        width: 0;
    }
</style>

<TelerikGrid Data="@GridData"
             Class="@( !ShowOptionalGridElements ? "no-toolbar no-detail" : "" )"
             Height="160px">
    <GridToolBarTemplate>
        @if (ShowOptionalGridElements)
        {
        <GridSearchBox />
        }
    </GridToolBarTemplate>
    <GridColumns>
        <GridColumn Field="@nameof(Product.Name)" Title="Product Name" />
    </GridColumns>
    <DetailTemplate>
        @if (ShowOptionalGridElements)
        {
            <p><strong>DetailTemplate for master item @( ((Product)context).Id )</strong></p>
        }
        <span>[always visible]</span>
    </DetailTemplate>
</TelerikGrid>

<h2>2. Conditional RenderFragment value:</h2>

<TelerikGrid Data="@GridData"
             GridToolBarTemplate="@( ShowOptionalGridElements ? GetGridToolBarContent() : null )"
             DetailTemplate="@GridDetailTemplate"
             Height="160px">
    <GridColumns>
        <GridColumn Field="@nameof(Product.Name)" Title="Product Name" />
    </GridColumns>
</TelerikGrid>

<h2>3. Same as 2 with alternative syntax for the ToolBar:</h2>

<TelerikGrid Data="@GridData"
             GridToolBarTemplate="@(GetGridToolBarTemplate())"
             DetailTemplate="@GridDetailTemplate"
             Height="160px">
    <GridColumns>
        <GridColumn Field="@nameof(Product.Name)" Title="Product Name" />
    </GridColumns>
</TelerikGrid>

@code {
    private List<Product> GridData { get; set; }

    private bool ShowOptionalGridElements { get; set; } = true;

    #region GridToolBarTemplate

    private RenderFragment GetGridToolBarContent() => builder =>
    {
        builder.OpenComponent(0, typeof(GridSearchBox));
        builder.CloseComponent();
    };

    private RenderFragment GridToolBarContent { get; set; } = __builder =>
    {
        <GridSearchBox />
    };

    private RenderFragment GetGridToolBarTemplate()
    {
        if (ShowOptionalGridElements)
        {
            return GridToolBarContent;
        }
        else
        {
            return null;
        }
    }

    #endregion

    #region DetailTemplate

    private RenderFragment<Product> GridDetailContent { get; set; } = context => __builder =>
    {
        <p><strong>DetailTemplate for master item @( ((Product)context).Id )</strong></p>
    };

    private RenderFragment<Product> GridDetailTemplate
    {
        get
        {
            if (ShowOptionalGridElements)
            {
                return GridDetailContent;
            }

            return null;
        }
    }

    #endregion

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

    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
````
