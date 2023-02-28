---
title: Pager Template
page_title: Grid Pager Template
description: Learn how to use a custom pager template in the Blazor Data Grid. The template allows you to customize the layout, content, and functionality of the Pager UI component.
slug: grid-templates-pager
tags: telerik,blazor,grid,templates,pager
published: True
position: 40
---


# Pager Template

The `GridPagerTemplate` allows you to modify the layout, content, and functionality of the Pager. To paginate the data, you can use any set of Blazor components and DOM elements instead of the default Grid [Pager]({%slug pager-overview%}).


>caption Using the Telerik UI for Blazor Slider to paginate the Grid data

````CSHTML
@page "/grid/pager-template"
@inject WeatherForecastService WeatherForecastService
@using System.Collections.ObjectModel
@using Telerik.Blazor.Components.Grid;
@using Telerik.DataSource.Extensions

<div class="mr-5">
    <TelerikGrid TItem="WeatherForecast"
                 Pageable="true"
                 @bind-Page="CurrentPage"
                 Height="auto"
                 Width="600px"
                 OnRead=@ReadItems>
        <GridColumns>
            <GridColumn Field="Summary" />
            <GridColumn Field="TemperatureC" Title="Temp. C" />
            <GridColumn Field="Date" />
        </GridColumns>
        <GridPagerTemplate>
            @{
                var pages = (int)Math.Ceiling((decimal)Total / (decimal)PageSize);
                if (pages == 0) pages = CurrentPage;
            }
            <TelerikSlider @bind-Value="@CurrentPage"
                           Min="1"
                           Max="@pages">
            </TelerikSlider>
        </GridPagerTemplate>
    </TelerikGrid>
</div>

@code {
    public List<WeatherForecast> SourceData { get; set; }
    public int CurrentPage { get; set; } = 1;
    public int PageSize { get; set; } = 10;
    public int Total { get; set; }

    protected async Task ReadItems(GridReadEventArgs args)
    {
        if (SourceData == null)
        {
            SourceData = await WeatherForecastService.GetForecastAsync(53);
        }

        var datasourceResult = SourceData.ToDataSourceResult(args.Request);

        args.Data = datasourceResult.Data;

        args.Total = datasourceResult.Total;
        Total = datasourceResult.Total;
    }
}
````

## See Also

 * [Live Demo: Grid Templates](https://demos.telerik.com/blazor-ui/grid/templates)

