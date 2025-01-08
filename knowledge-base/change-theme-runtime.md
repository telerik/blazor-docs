---
title: Change Telerik Theme at Runtime
description: Learn how to switch the Telerik Blazor theme at runtime on the fly with JavaScript.
type: how-to
page_title: How to Change the Telerik Theme or Swatch at Runtime
slug: common-kb-change-theme-runtime
position: 
tags: telerik, blazor, theme
ticketid: 1442823
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>UI for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

This KB article answers the following questions:

* How to change the Telerik CSS theme or swatch at runtime?
* How to allow users to switch the component theme on the fly?
* How to toggle light and dark mode for the Telerik UI for Blazor components?


## Solution

The app stylesheets reside outside the Razor component hierarchy, so the Blazor code cannot access them. You can change the current Telerik [theme or swatch](slug://themes-overview) at runtime with [JSInterop](https://learn.microsoft.com/en-us/aspnet/core/blazor/javascript-interoperability/call-javascript-from-dotnet).

The following algorithm follows the commonly used approach to replace a CSS file in any web app. You can use it for built-in themes and custom themes, regardless of the [CSS theme's physical location](slug://themes-overview#using-a-theme).

1. [Register the initial Telerik theme](slug://themes-overview#using-a-theme) in a way that allows you to get reference to the `<link>` tag. For example, use an `id` attribute.
    
    >caption HTML
    ````HTML
    <link id="telerik-theme" rel="stylesheet"
        href="https://unpkg.com/@progress/kendo-theme-default@{{site.themesVersion}}/dist/default-main.css" />
    ````
1. Implement the supporting JavaScript code in a new or existing `.js` file.
    * Create a JavaScript function that [creates](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement) a `<link>` element with the new theme URL and [appends](https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild) it to the page.
    * [Remove](https://developer.mozilla.org/en-US/docs/Web/API/Node/removeChild) the old `<link>` element when the new one [loads](https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event).
    * Use the chosen `id` value with both `<link>` tags.
    * [Notify the Razor component](https://learn.microsoft.com/en-us/aspnet/core/blazor/javascript-interoperability/call-dotnet-from-javascript) when the new CSS file is loaded, if you need to make additional changes to the UI.
    * Make sure the JavaScript file is loaded in the app.

    >caption JavaScript
    ````JS.skip-repl
    var themeChangerDotNetRef;

    function saveDotNetRef(dotNetRef) {
        themeChangerDotNetRef = dotNetRef;
    }

    function changeTelerikTheme(newUrl) {
        var oldLink = document.getElementById("telerik-theme");

        if (newUrl === oldLink.getAttribute("href")) {
            return;
        }

        var newLink = document.createElement("link");
        newLink.setAttribute("id", "telerik-theme");
        newLink.setAttribute("rel", "stylesheet");
        newLink.setAttribute("href", newUrl);
        newLink.onload = () => {
            oldLink.parentElement.removeChild(oldLink);
            themeChangerDotNetRef.invokeMethodAsync("NotifyThemeChanged");
        };

        document.getElementsByTagName("head")[0].appendChild(newLink);
    }
    ````
1. Implement UI that triggers the JavaScript theme change. After the new CSS theme is loaded, refresh all Telerik components that use SVG or Canvas rendering, such as Barcodes, Charts, Gauges, and QR Codes.

    > Make sure [the version number in the theme URL is compatible with the version of Telerik UI for Blazor](slug://themes-overview#compatibility-and-maintenance).
    >
    > Replace `Index` in the code below with the correct Razor component name.

    >caption Razor

    ````RAZOR.skip-repl
    @implements IDisposable

    @inject IJSRuntime js

    <div class="k-body" style="padding:2em;">
        <label>
            Select a Telerik theme:
            <TelerikDropDownList Data="@ThemeData"
                                Value="@ThemeSwatchValue"
                                ValueChanged="@ThemeSwatchValueChanged"
                                TItem="@ThemeModel"
                                TValue="@int"
                                ValueField="@nameof(ThemeModel.Id)"
                                TextField="@nameof(ThemeModel.FullName)"
                                Width="240px">
            </TelerikDropDownList>
        </label>

        <TelerikLoader Visible="@LoaderVisible" />

        <br /><br />

        <TelerikGrid Data="@GridData"
                    TItem="@GridModel"
                    Pageable="true"
                    PageSize="3"
                    Sortable="true"
                    FilterMode="GridFilterMode.FilterRow">
            <GridColumns>
                <GridColumn Field="@nameof(GridModel.Name)" />
                <GridColumn Field="@nameof(GridModel.Price)" />
                <GridColumn Field="@nameof(GridModel.Quantity)" />
            </GridColumns>
        </TelerikGrid>

        <TelerikChart @ref="@ChartRef"
                    Height="240px">
            <ChartSeriesItems>
                <ChartSeries Type="ChartSeriesType.Line"
                            Data="@Series1Data"
                            Field="@nameof(ChartModel.Revenue)"
                            CategoryField="@nameof(ChartModel.TimePeriod)"
                            Name="Product 1">
                </ChartSeries>
                <ChartSeries Type="ChartSeriesType.Column"
                            Data="@Series2Data"
                            Field="@nameof(ChartModel.Revenue)"
                            CategoryField="@nameof(ChartModel.TimePeriod)"
                            Name="Product 2">
                </ChartSeries>
                <ChartSeries Type="ChartSeriesType.Area"
                            Data="@Series3Data"
                            Field="@nameof(ChartModel.Revenue)"
                            CategoryField="@nameof(ChartModel.TimePeriod)"
                            Name="Product 3">
                </ChartSeries>
            </ChartSeriesItems>

            <ChartCategoryAxes>
                <ChartCategoryAxis Type="@ChartCategoryAxisType.Date"></ChartCategoryAxis>
            </ChartCategoryAxes>

            <ChartValueAxes>
                <ChartValueAxis Max="600">
                    <ChartValueAxisLabels Format="c2" />
                </ChartValueAxis>
            </ChartValueAxes>

            <ChartTitle Text="Telerik Chart"></ChartTitle>

            <ChartLegend Position="ChartLegendPosition.Right">
            </ChartLegend>
        </TelerikChart>
    </div>

    @code {
        // Replace "Index" with the name of the Razor component that holds this code
        private DotNetObjectReference<Index>? DotNetRef { get; set; }

        private TelerikChart? ChartRef { get; set; }

        private List<GridModel> GridData { get; set; } = new();

        private List<ChartModel> Series1Data { get; set; } = new();
        private List<ChartModel> Series2Data { get; set; } = new();
        private List<ChartModel> Series3Data { get; set; } = new();

        private List<ThemeModel> ThemeData { get; set; } = new();
        private int ThemeSwatchValue { get; set; } = 1;
        private const string ThemeUrlTemplate = "https://unpkg.com/@progress/kendo-theme-{0}@{{site.themesVersion}}/dist/{0}-{1}.css";

        private bool LoaderVisible { get; set; }

        private async Task ThemeSwatchValueChanged(int newValue)
        {
            // Update DropDownList Value
            ThemeSwatchValue = newValue;

            LoaderVisible = true;

            // Generate new theme URL
            ThemeModel newThemeModel = ThemeData.First(x => x.Id == ThemeSwatchValue);
            string newThemeSwatchUrl = string.Format(ThemeUrlTemplate, newThemeModel.Theme.ToLower(), newThemeModel.Swatch.ToLower());

            // Change current Telerik theme
            await js.InvokeVoidAsync("changeTelerikTheme", newThemeSwatchUrl);

            // The algorithm continues in the NotifyThemeChanged method
        }

        [JSInvokable("NotifyThemeChanged")]
        public void NotifyThemeChanged()
        {
            // Refresh all Telerik components that use SVG or Canvas rendering (Charts, Gauges, BarCodes, QR Codes)
            ChartRef?.Refresh();

            LoaderVisible = false;

            // This method is not an EventCallback, so you need StateHasChanged() to hide the Loader or make other changes in the UI
            StateHasChanged();
        }

        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            if (firstRender)
            {
                // Ensure HTML is ready
                await Task.Delay(1);

                // Send the Razor component's reference to the client
                // to be able to call NotifyThemeChanged()
                await js.InvokeVoidAsync("saveDotNetRef", DotNetRef);
            }

            await base.OnAfterRenderAsync(firstRender);
        }

        protected override async Task OnInitializedAsync()
        {
            DotNetRef = DotNetObjectReference.Create(this);

            PopulateThemes();

            GenerateData();

            await base.OnInitializedAsync();
        }

        private void PopulateThemes()
        {
            ThemeData.Add(new ThemeModel(1, "Default", "Main"));
            ThemeData.Add(new ThemeModel(2, "Default", "Main-Dark"));
            ThemeData.Add(new ThemeModel(3, "Default", "Ocean-Blue"));
            ThemeData.Add(new ThemeModel(4, "Bootstrap", "Main"));
            ThemeData.Add(new ThemeModel(5, "Bootstrap", "Main-Dark"));
            ThemeData.Add(new ThemeModel(6, "Material", "Main"));
            ThemeData.Add(new ThemeModel(7, "Material", "Main-Dark"));
            ThemeData.Add(new ThemeModel(8, "Fluent", "Main"));
        }

        private void GenerateData()
        {
            for (int i = 1; i <= 17; i++)
            {
                GridData.Add(new GridModel()
                {
                    Id = i,
                    Name = $"Name {i}",
                    Price = Random.Shared.Next(1, 100) * 1.23m,
                    Quantity = Random.Shared.Next(0, 1000)
                });
            }

            var now = DateTime.Today;
            var monthsBack = 6;

            for (int i = 1; i <= monthsBack; i++)
            {
                var dateTimeValue = now.AddMonths(-monthsBack + i);

                Series1Data.Add(new ChartModel()
                {
                    Id = i,
                    Product = "Product 1",
                    Revenue = Random.Shared.Next(1, 500),
                    TimePeriod = dateTimeValue
                });

                Series2Data.Add(new ChartModel()
                {
                    Id = i,
                    Product = "Product 2",
                    Revenue = Random.Shared.Next(1, 500),
                    TimePeriod = dateTimeValue
                });

                Series3Data.Add(new ChartModel()
                {
                    Id = i,
                    Product = "Product 3",
                    Revenue = Random.Shared.Next(1, 500),
                    TimePeriod = dateTimeValue
                });
            }
        }

        public void Dispose()
        {
            DotNetRef?.Dispose();
        }

        public class ThemeModel
        {
            public int Id { get; set; }
            public string Theme { get; set; }
            public string Swatch { get; set; }
            public string FullName => $"{Theme} {Swatch}";

            public ThemeModel(int id, string themeName, string swatchName)
            {
                Id = id;
                Theme = themeName;
                Swatch = swatchName;
            }
        }

        public class GridModel
        {
            public int Id { get; set; }
            public string Name { get; set; } = string.Empty;
            public decimal Price { get; set; }
            public int Quantity { get; set; }
        }

        public class ChartModel
        {
            public int Id { get; set; }
            public string Product { get; set; } = string.Empty;
            public DateTime TimePeriod { get; set; }
            public decimal Revenue { get; set; }
        }
    }
    ````


## Next Steps

* [Implement CDN Fallback](slug://common-kb-cdn-fallback)


## See Also

* [Themes Overview](slug://themes-overview)
* [Implement CDN Fallback](slug://common-kb-cdn-fallback)
