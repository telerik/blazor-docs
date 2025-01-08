---
title: Adjust Grid Column Header Styles Dynamically
description: Learn how to dynamically change the style of a column header cell in a Telerik Blazor Grid based on condition.
type: how-to
page_title: How to Style Column Header Cells Dynamically in a Telerik Blazor Grid
slug: grid-dynamically-adjusting-column-header-styles
tags: grid, blazor, headerclass
res_type: kb
ticketid: 1670074
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

I am dynamically creating Grid columns in a loop and trying to adjust the column header cell style based on some condition and value from the [column field](slug://components/grid/columns/bound#data-binding). Ideally, I want to implement logic to make this adjustment based on the value in the header cell. I have not been able to achieve this in the `HeaderTemplate` tag or in any of the cell render events handlers. In other templates, I have access to the `@context` field, which would make this easy, but that doesn't seem to work in the `HeaderTemplate`.

## Solution

To style a column header cell when dynamically creating columns in a loop, use the [`HeaderClass` parameter](slug://components/grid/columns/bound#appearance) to set a CSS class under a condition and apply different styles depending on the class. For scenarios with numerous and more complex conditions, you can create a method to determine the appropriate class.

Note that the [`HeaderTemplate`](slug://grid-templates-column-header) does not receive a context argument because it is not related to rows and models, as outlined in the [Templates Overview](slug://components/grid/features/templates) of the Telerik UI for Blazor documentation.

### Example

````RAZOR
<TelerikGrid Data="@GridData">
    <GridColumns>
        <GridColumn Field="@nameof(Product.Name)" Title="Product Name" />
        @for (int i = 0; i <= MaxYears; i++)
        {
            <GridColumn @key="@i" Field="@( $"StartYear{i}" )" Title=@( $"{StartYear + i}" ) DisplayFormat="{0:N}" HeaderClass="@GetHeaderClass(StartYear + i)" />
        }
    </GridColumns>
</TelerikGrid>

<style>
    .past-year-column {
    background-color: yellow;
    }

    .previous-year-column {
    background-color: royalblue;
    }

    .current-year-column {
    background-color: pink;
    }

    .future-year-column {
    background-color: red;
    }
</style>


@code {
    private List<Product> GridData { get; set; } = new();
    private const int MaxYears = 10;
    private const int StartYear = 2020;
    private int currYear { get; set; } = DateTime.Now.Year;

    private string GetHeaderClass(int year)
    {
        if (year <= StartYear)
            return "past-year-column";
        else if (year < currYear)
            return "previous-year-column";
        else if (year == currYear)
            return "current-year-column";
        else
            return "future-year-column";
    }

    protected override void OnInitialized()
    {
        GridData = new List<Product>();

        for (int i = 1; i <= 20; i++)
        {
            GridData.Add(new Product
                {
                    Id = i,
                    Name = "Product name " + i,
                    StartYear0 = Random.Shared.Next(100, 9999),
                    StartYear1 = Random.Shared.Next(100, 9999),
                    StartYear2 = Random.Shared.Next(100, 9999),
                    StartYear3 = Random.Shared.Next(100, 9999),
                    StartYear4 = Random.Shared.Next(100, 9999),
                    StartYear5 = Random.Shared.Next(100, 9999),
                    StartYear6 = Random.Shared.Next(100, 9999),
                    StartYear7 = Random.Shared.Next(100, 9999),
                    StartYear8 = Random.Shared.Next(100, 9999),
                    StartYear9 = Random.Shared.Next(100, 9999),
                    StartYear10 = Random.Shared.Next(100, 9999)
                });

        }

        base.OnInitialized();
    }

    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double? StartYear0 { get; set; }
        public double? StartYear1 { get; set; }
        public double? StartYear2 { get; set; }
        public double? StartYear3 { get; set; }
        public double? StartYear4 { get; set; }
        public double? StartYear5 { get; set; }
        public double? StartYear6 { get; set; }
        public double? StartYear7 { get; set; }
        public double? StartYear8 { get; set; }
        public double? StartYear9 { get; set; }
        public double? StartYear10 { get; set; }
    }
}
```

## See Also

- [Grid HeaderClass Parameter](slug://components/grid/columns/bound#appearance)
- [Grid Column Header Template](slug://grid-templates-column-header)
- [Templates Overview - Telerik UI for Blazor](slug://components/grid/features/templates)
