---
title: Chart not working with Newtonsoft.Json properties
description: Using Newtonsoft.Json serialization settings can break the chart. See how to fix it.
type: troubleshooting
page_title: Chart not working with Newtonsoft.Json serialization properties
slug: chart-kb-newtonsoft-seialization-settings
position: 
tags: 
ticketid: 1462254
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product Version</td>
			<td>2.10.0</td>
		</tr>
		<tr>
			<td>Product</td>
			<td>Charts for Blazor</td>
		</tr>
		<tr>
			<td>Blazor application type</td>
			<td>Client-side</td>
		</tr>
	</tbody>
</table>


## Description

If I use the TelerikChart with a class with `JsonProperties` the values are not shown and the template for the Chart doesn't work.

Sample setting:

````CSHTML
[System.CodeDom.Compiler.GeneratedCode("NJsonSchema", "10.1.11.0 (Newtonsoft.Json v12.0.0.0)")]
public partial class ChartDataModel
{
    [Newtonsoft.Json.JsonProperty("thedescription", Required = Newtonsoft.Json.Required.Default, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
    public string TheDescription { get; set; }

    [Newtonsoft.Json.JsonProperty("thevalue", Required = Newtonsoft.Json.Required.Default, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
    public decimal? TheValue { get; set; }

    [Newtonsoft.Json.JsonProperty("thecolor", Required = Newtonsoft.Json.Required.Default, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
    public string TheColor { get; set; }
}
````

Sample chart that does not display any longer after adding serialization settings:

````CSHTML
<TelerikChart Width="500px">

    <ChartSeriesItems>
        <ChartSeries Field="@nameof(ChartDataModel.TheValue)"
                     CategoryField="@nameof(ChartDataModel.TheDescription)"
                     ColorField="@nameof(ChartDataModel.TheColor)"
                     Type="ChartSeriesType.Bar"
                     Data="@(_chartData)">
            <ChartSeriesLabels Visible="true" Template="@_myTemplate"></ChartSeriesLabels>
        </ChartSeries>
    </ChartSeriesItems>

</TelerikChart>


@code{
    List<ChartDataModel> _chartData { get; set; }
    string _myTemplate { get; set; } = "#=dataItem.TheDescription# - color: #=dataItem.TheColor#";

    protected override async Task OnInitializedAsync()
    {
        _chartData = await _dataService.GetData();
    }
}
````


## Cause\Possible Cause(s)

The Telerik Chart serializes the data for rendering and thus the serialization settings are honored. This causes changes in the field names from what you set in the markup - the `nameof()` operator does not use these settings. In the example above, it will provide `TheValue` to the chart, while the actual field name will be `val`.


## Solution

You must match the field names you provide in the chart settings (such as `Field` values and strings in templates) to the names that will actually be serialized.

>caption Example of handling custom serialization settings in the chart

````Model
[System.CodeDom.Compiler.GeneratedCode("NJsonSchema", "10.1.11.0 (Newtonsoft.Json v12.0.0.0)")]
public partial class ChartDataModel
{
    [Newtonsoft.Json.JsonProperty("thedescription", Required = Newtonsoft.Json.Required.Default, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
    public string TheDescription { get; set; }

    [Newtonsoft.Json.JsonProperty("thevalue", Required = Newtonsoft.Json.Required.Default, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
    public decimal? TheValue { get; set; }

    [Newtonsoft.Json.JsonProperty("thecolor", Required = Newtonsoft.Json.Required.Default, NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore)]
    public string TheColor { get; set; }
}
````
````Chart
@inject ChartDataService _dataService

@* note how the values of the chart field settings match the serialization settings *@

<TelerikChart Width="500px">

    <ChartSeriesItems>
        <ChartSeries Field="thevalue"
                     CategoryField="thedescription"
                     ColorField="thecolor"
                     Type="ChartSeriesType.Bar"
                     Data="@(_chartData)">
            <ChartSeriesLabels Visible="true" Template="@_myTemplate"></ChartSeriesLabels>
        </ChartSeries>
    </ChartSeriesItems>

</TelerikChart>


@code{
    List<ChartDataModel> _chartData { get; set; }
    string _myTemplate { get; set; } = "#=dataItem.thedescription# - color: #=dataItem.thecolor#";

    protected override async Task OnInitializedAsync()
    {
        _chartData = await _dataService.GetData();
    }
}
````
````SampleService
public class ChartDataService
{
    [Inject]
    private HttpClient Http { get; set; }

    public ChartDataService(HttpClient client)
    {
        Http = client;
    }

    public async Task<List<ChartDataModel>> GetData()
    {
        return await Http.GetFromJsonAsync<List<ChartDataModel>>("ChartData?");
    }
}
````
````SampleController
[ApiController]
[Route("[controller]")]
public class ChartDataController : ControllerBase
{

    private readonly ILogger<ChartDataController> logger;

    public ChartDataController(ILogger<ChartDataController> logger)
    {
        this.logger = logger;
    }

    private static readonly string[] Colors = new[]
    {
            "red", "green", "blue", "pink", "yellow", "cyan", "magenta",
    };

    // this static list acts as our "database" in this sample
    private static List<ChartDataModel> _data { get; set; }

    [HttpGet]
    public async Task<List<ChartDataModel>> Get()
    {
        if (_data == null)
        {
            var rng = new Random();
            _data = Enumerable.Range(1, 7).Select(index => new ChartDataModel
            {
                TheDescription = $"description {index}",
                TheValue = rng.Next(1, 5),
                TheColor = Colors[index - 1]
            }).ToList();
        }

        return await Task.FromResult(_data);
    }
}
````

## Notes
The approach used internally by the chart may change in the future. For example, at the time of writing, the new `System.Net.Http.Json` is not yet ready for use, but it may be used in the future. Thus, the approach described in this article may become unnecessary or wrong.
