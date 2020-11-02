---
title: Localize numeric labels in the Chart
description: How to localize numeric labels in the Chart
type: how-to
page_title: Localize numeric labels in the Chart
slug: chart-kb-localized-numeric-labels
position:
tags:
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

I am having a Chart and I would like my labels to be localization aware.


## Solution

There are two different approaches:

* [Using the Format Parameter](#using-the-format-parameter)
* [Using the Template Parameter](#using-the-template-parameter)

### Using the Format Parameter

If you require your label to be a number only, you can use the [`Format`]({%slug components/chart/label-template-format%}#format-strings) parameter of the `<ChartSeriesLabels>` tag. It takes a [standard numeric format strings](https://docs.microsoft.com/en-us/dotnet/standard/base-types/standard-numeric-format-strings) and is localization aware.

### Using the Template Parameter

If you want to expose more information beyond a number, for example, some text, you can utilize the [`Template`]({%slug components/chart/label-template-format%}#templates) parameter, which is exposed from the `<ChartSeriesLabels>` tag. In a JavaScript file implement the desired number formatting by using the `toLocaleString` JavaScript method. An exemplary implementation can be seen in the example below:

#### Step by step explanation

1. Use a custom [template]({%slug components/chart/label-template-format%}#templates)

2. Implement the desired number formatting function in a JavaScript file (in the example below, we will call it `template-helpers.js` and it resides in the `wwwroot` folder).

3. Reference that file in your root component (`_Host.cshtml` for a server-side app, or `index.html` for a client-side app).

4. Call the custom formatting function from the template and pass the needed arguments to it. It must return the string you want shown in the template.

#### Localize numeric labels in the Chart using the Template parameter

````Razor
@* This example shows how to localize numeric labels in the Chart using the Template parameter *@

@*used to get the current culture*@
@using System.Threading

<TelerikChart>

    <ChartLegend Visible="true" Position="ChartLegendPosition.Top"></ChartLegend>

    <ChartSeriesItems>
        <ChartSeries Type="ChartSeriesType.Donut"
                     Data="@this.ChartData"
                     Field="@nameof(Data.Value)"
                     CategoryField="@nameof(Data.XValue)"
                     ColorField="@nameof(Data.BackgroundColor)"
                     StartAngle="270">
            <ChartSeriesLabels Position="ChartSeriesLabelsPosition.OutsideEnd"
                               Visible="true"
                               Template="@GetFormattedNumericValue()">
            </ChartSeriesLabels>
        </ChartSeries>
    </ChartSeriesItems>

</TelerikChart>

@code {
    public class Data
    {
        public string XValue { get; set; }

        public decimal Value { get; set; }

        public string BackgroundColor { get; set; }
    }

    protected string GetFormattedNumericValue()
    {
        var cultureInfo = Thread.CurrentThread.CurrentUICulture; //get the current culture
        return $"value of the label: #= formatNumberLocale(value, '{cultureInfo.Name}', 2)#";
    }

    public List<Data> ChartData = new List<Data>()
{
        new Data { XValue = "Item", Value = 1.1223523525m, BackgroundColor = "red" },
        new Data { XValue = "Item 2", Value = 2.542342424m, BackgroundColor = "green" },
        new Data {XValue = "Item 3", Value = 3.141592653589793238m, BackgroundColor = "blue" }
    };
}
````
````JavaScript
function formatNumberLocale(number, locale, decimals){
    return number.toLocaleString(locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}
````
````Index
<head>
    <!-- there may be other content here -->
    
	<script src="~/template-helpers.js"></script>
	
	<!-- there may be other content here -->
</head>
````


## See Also

  * [Knowledge Base article: How to format the percent in a label for a pie or donut chart]({%slug chart-format-percent%})
