---
title: Custom Chart Legend
description: How to design my own chart legend
type: how-to
page_title: design custom chart legend diffent from the built-in 
slug: chart-custom-legend
position: 
tags: telerik, blazor, chart, legend, css, html
ticketid: 1637556, 1640086
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Chart for Blazor</td>
		</tr>
	</tbody>
</table>

## Description
How to change the Chart Legend graphics and apply my own design? I want to have different Chart Legend Title and Icons. How to customize the Chart Legend UI.

## Solution
Change the Chart Legend design with HTML/CSS. You need to:
* Disable the built-in legend
* Use HTML markup or any other components to create the custom legend content

>caption Custom Chart Legend with ListView

````CSHTML
@*Chart with custom legend*@

<TelerikChart Height="400px">

    <ChartTitle Text="Revenue per product per year"></ChartTitle>

    <ChartLegend Visible="false" />

    <ChartSeriesItems>
        <ChartSeries Type="ChartSeriesType.Column"
                     Data="@Phones"
                     Field="@nameof(ProductModel.Value)"
                     CategoryField="@nameof(ProductModel.Year)"
                     ColorField="@nameof(ProductModel.Color)">
            <ChartSeriesStack Enabled="true"></ChartSeriesStack>
        </ChartSeries>
        <ChartSeries Type="ChartSeriesType.Column"
                     Data="@Tablets"
                     Field="@nameof(ProductModel.Value)"
                     CategoryField="@nameof(ProductModel.Year)"
                     ColorField="@nameof(ProductModel.Color)">
            <ChartSeriesStack Enabled="true"></ChartSeriesStack>
        </ChartSeries>
        <ChartSeries Type="ChartSeriesType.Column"
                     Data="@Computers"
                     Field="@nameof(ProductModel.Value)"
                     CategoryField="@nameof(ProductModel.Year)"
                     ColorField="@nameof(ProductModel.Color)">
            <ChartSeriesStack Enabled="true"></ChartSeriesStack>
        </ChartSeries>
    </ChartSeriesItems>

</TelerikChart>

<TelerikListView OnRead="@OnListViewRead"
                 TItem="@ProductModel"
                 Width="400px">
    <HeaderTemplate>
        <div class="legend-row legend-header">
            <div>Product</div>
            <div>Year</div>
            <div>Value</div>
        </div>
    </HeaderTemplate>
    <Template>
        @{
            var item = (ProductModel)context;
        }
        <div class="legend-row">
            <div>
                <span style="color: @item.Color;">&#9733;</span> @item.Name
            </div>
            <div>@item.Year</div>
            <div>@item.Value.ToString("C2")</div>
        </div>
    </Template>
</TelerikListView>

<style>

    .legend-header {
        font-size: 1.4em;
        font-weight: bold;
    }

    .legend-row {
        display: flex;
    }

    .legend-row > div {
        flex: 0 0 30%;
    }

        .legend-row > div:first-child {
            flex: 0 0 40%;
        }

</style>

@code {
    private List<ProductModel> ListViewData { get; set; } = new();

    private List<ProductModel> Phones = new List<ProductModel>
    {
        new ProductModel
        {
            Name = "Phones",
            Value = 123,
            Color = "red",
            Year = DateTime.Now.Year - 1
        },
        new ProductModel
        {
            Name = "Phones",
            Value = 99,
            Color = "silver",
            Year = DateTime.Now.Year
        },
        new ProductModel
        {
            Name = "Phones",
            Value = 800,
            Color = "black",
            Year = DateTime.Now.Year + 1
        }
    };

    private List<ProductModel> Tablets = new List<ProductModel>
    {
        new ProductModel
        {
            Name = "Tablets",
            Value = 789,
            Color = "pink",
            Year = DateTime.Now.Year - 1
        },
        new ProductModel
        {
            Name = "Tablets",
            Value = 500,
            Color = "yellow",
            Year = DateTime.Now.Year
        },
        new ProductModel
        {
            Name = "Tablets",
            Value = 300,
            Color = "green",
            Year = DateTime.Now.Year + 1
        }
    };

    private List<ProductModel> Computers = new List<ProductModel>
    {
        new ProductModel
        {
            Name = "Computers",
            Value = 456,
            Color = "blue",
            Year = DateTime.Now.Year - 1
        },
        new ProductModel
        {
            Name = "Computers",
            Value = 800,
            Color = "orange",
            Year = DateTime.Now.Year
        },
        new ProductModel
        {
            Name = "Computers",
            Value = 200,
            Color = "purple",
            Year = DateTime.Now.Year + 1
        }
    };

    private async Task OnListViewRead(ListViewReadEventArgs args)
    {
        args.Data = await GenerateData();
    }

    private async Task<List<ProductModel>> GenerateData()
    {
        foreach (var phone in Phones)
        {
            ListViewData.Add(phone);
        }
        foreach (var tablet in Tablets)
        {
            ListViewData.Add(tablet);
        }
        foreach (var computer in Computers)
        {
            ListViewData.Add(computer);
        }
        return await Task.FromResult(ListViewData);
    }

    private class ProductModel
    {
        public string Name { get; set; } = string.Empty;
        public double Value { get; set; }
        public string Color { get; set; } = string.Empty;
        public int Year { get; set; }
    }
}
````

## See Also

[Override Theme Styles]({%slug themes-override%})
