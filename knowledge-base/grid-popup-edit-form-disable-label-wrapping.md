---
title: Disable Label Wrapping in the Grid Popup Edit Form
description: How to prevent label text wrapping in the popup editor of the Grid and TreeList.
type: how-to
page_title: Disable Label Wrapping in the Grid Popup Edit Form
slug: grid-popup-edit-form-disable-label-wrapping
position:
tags: grid,popup,edit,form,label,wrap
ticketid: 1544767
res_type: kb
---

## Environment

<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>
                Form for Blazor, <br />
                Grid for Blazor, <br />
                TreeList for Blazor
            </td>
		</tr>
	</tbody>
</table>


## Description

How to prevent text wrapping inside the Grid popup edit form? My column names are long and contain several words. They cannot fit on a single line and wrap.


## Solution

There are two ways to ensure that long form labels fit on a single line in the popup. Both techniques use **CSS**. The required code is identical for Grids and TreeLists.

* Increase the popup edit form width:

    ````css
    .k-window .k-form-horizontal {
        min-width: 600px;
    }
    ````

* Prevent text wrapping of the form labels:

    ````css
    .k-window .k-form-horizontal .k-form-label {
        white-space: nowrap;
        margin-left: 10px;
    }
    ````

> If you place the above CSS rules in the global app stylesheet (usually `site.css`), they will affect **all** popup forms in the app. To avoid this, keep the CSS code in the Razor file, which defines the edit form. [CSS isolation (scoped styles)]({%slug common-kb-css-isolation%}) will not work, because the Window is rendered as a child of the page `<body>`, i.e. outside the Razor component.
>
> For full control of the edit form layout and more advanced customizations, you can also use a [custom edit form in a separate TelerikWindow](https://github.com/telerik/blazor-ui/tree/master/grid/custom-popup-form).


## Example

>caption Prevent label wrapping in popup edit forms

````CSHTML
@* Prevent label wrapping in popup edit forms *@

<style>
    /* normally, only one of these CSS rules is enough */

    .k-window .k-form-horizontal {
        /* min-width: 600px; */
    }

    .k-window .k-form-horizontal .k-form-label {
        white-space: nowrap;
        margin-left: 10px;
    }
</style>

<TelerikGrid Data=@GridData EditMode="@GridEditMode.Popup">
    <GridColumns>
        <GridColumn Field=@nameof(Product.Name) Title="Product Name" />
        <GridColumn Field=@nameof(Product.Quantity) Title="Units in Stock" />
        <GridCommandColumn Width="120px">
            <GridCommandButton Command="Edit" Icon="edit">Edit</GridCommandButton>
        </GridCommandColumn>
    </GridColumns>
</TelerikGrid>

@code {
    public List<Product> GridData { get; set; }

    protected override void OnInitialized()
    {
        GridData = new List<Product>();

        for (int i = 1; i <= 5; i++)
        {
            GridData.Add(new Product()
            {
                ID = i,
                Name = $"Product Name {i}",
                Quantity = i
            });
        }
    }

    public class Product
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public int Quantity { get; set; }
    }
}
````
