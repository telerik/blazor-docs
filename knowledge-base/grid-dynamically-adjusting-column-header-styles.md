---
title: Adjust Grid Column Header Styles Dynamically
description: Learn how to dynamically change the style of a column header cell in a Telerik Blazor Grid based on condition.
type: how-to
page_title: How to Dynamically Style Column Header Cell in a Telerik Blazor Grid
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
	    	<td>Grid for Blazor</td>
	    </tr>
    </tbody>
</table>

## Description

I am dynamically creating Grid columns in a loop and trying to adjust the column header cell style based on some condition and value from the [column field]({%slug components/grid/columns/bound%}#data-binding). Ideally, I want to implement logic to make this adjustment based on the value in the header cell. I have not been able to achieve this in the `HeaderTemplate` tag or in any of the cell render events handlers. In other templates, I have access to the `@context` field, which would make this easy, but that doesn't seem to work in the `HeaderTemplate`.

## Solution

To dynamically add style to a column's header cell when dynamically creating columns in a loop, use the [`HeaderClass` parameter]({%slug components/grid/columns/bound%}#appearance) to set a class under a condition and apply different styles depending on the class. For scenarios with numerous and more complex conditions, you can create a method to determine the appropriate class.

Note that the [`HeaderTemplate`]({%slug grid-templates-column-header%}) does not receive a context argument because it is not related to rows and models, as outlined in the [Templates Overview]({%slug components/grid/features/templates%}) of the Telerik UI for Blazor documentation.

### Example

````CSHTML
<TelerikGrid Data="@GridData">
    <GridColumns>
        <GridColumn Field="@nameof(Product.Name)" Title="Product Name"/>
        @for (int i = 0; i <= MaxYears; i++)
        {
            <GridColumn Field="@("Y"+i)" Title=@((StartYear + i).ToString()) DisplayFormat="{0:N}" HeaderClass="@GetHeaderClass(StartYear + i)"/>
        }
    </GridColumns>
</TelerikGrid>

<style>
    .very-past-year-column {
        background-color: yellow;
    }

    .past-year-column {
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
    private List<Product> GridData { get; set; }
    private int MaxYears = 10;
    private int StartYear = 2020;

    private string GetHeaderClass(int year)
    {
        switch (year)
        {
            case <= 2020:
                return "very-past-year-column";
            case < 2024:
                return "past-year-column";
            case 2024:
                return "current-year-column";
            default:
                return "future-year-column";
        }
    }

    protected override void OnInitialized()
    {
        GridData = new List<Product>();

        Random rnd = new Random();

        for (int i = 1; i <= 30; i++)
        {
            GridData.Add(new Product
                {
                    Id = i,
                    Name = "Product name " + i,
                    Y0 = rnd.Next(100, 9999),
                    Y1 = rnd.Next(100, 9999),
                    Y2 = rnd.Next(100, 9999),
                    Y3 = rnd.Next(100, 9999),
                    Y4 = rnd.Next(100, 9999),
                    Y5 = rnd.Next(100, 9999),
                    Y6 = rnd.Next(100, 9999),
                    Y7 = rnd.Next(100, 9999),
                    Y8 = rnd.Next(100, 9999),
                    Y9 = rnd.Next(100, 9999),
                    Y10 = rnd.Next(100, 9999)
                });

        }

        base.OnInitialized();
    }

    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double? Y0 { get; set; }
        public double? Y1 { get; set; }
        public double? Y2 { get; set; }
        public double? Y3 { get; set; }
        public double? Y4 { get; set; }
        public double? Y5 { get; set; }
        public double? Y6 { get; set; }
        public double? Y7 { get; set; }
        public double? Y8 { get; set; }
        public double? Y9 { get; set; }
        public double? Y10 { get; set; }
    }
}
```

## See Also

- [Grid HeaderClass Parameter]({%slug components/grid/columns/bound%}#appearance)
- [Grid Column Header Template]({%slug grid-templates-column-header%})
- [Templates Overview - Telerik UI for Blazor]({%slug components/grid/features/templates%})
