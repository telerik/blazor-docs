---
title: Data Binding
page_title: PivotGrid Data Binding
description: What are the different ways to provide data to the Telerik UI for Blazor PivotGrid. Information about XMLA datasource, local data.
slug: pivotgrid-data-binding
tags: telerik,blazor,pivotgrid
published: True
position: 10
---

# PivotGrid Data Binding

This article describes the PivotGrid data binding mechanism and the supported data source options.


## Data Provider Type

The PivotGrid supports different data sources via its `DataProviderType` parameter. The parameter type is `PivotGridDataProviderType` enum and its members are:

* [`Local`](#local) (default)
* [`Xmla`](#xmla)


## Local

When bound to local data, the Pivot Grid requires its `Data` parameter to provide all the data at once as `IEnumerable<TItem>`. The component will perform all aggregate calculations in-memory and there is no [load on demand]({%slug pivotgrid-overview%}#pivotgrid-parameters).

> Large amounts of local data may impact the performance, especially in WebAssembly applications.

>caption PivotGrid bound to Local data provider

````CSHTML
<TelerikPivotGrid Data="@PivotData">
    <PivotGridColumns>
        <PivotGridColumn Name="@nameof(PivotModel.City)" />
    </PivotGridColumns>
    <PivotGridRows>
        <PivotGridRow Name="@nameof(PivotModel.Category)" />
        <PivotGridRow Name="@nameof(PivotModel.Product)" />
    </PivotGridRows>
    <PivotGridMeasures>
        <PivotGridMeasure Name="@nameof(PivotModel.ContractValue)" />
    </PivotGridMeasures>
</TelerikPivotGrid>

@code {
    private List<PivotModel> PivotData { get; set; } = new List<PivotModel>();

    protected override void OnInitialized()
    {
        var dataItemCount = 100;
        var categoryCount = 3;
        var productCount = 5 + 1; // effectively 5, as rnd.Next() will never return 6
        var cityCount = 3 + 1; // effectively 3
        var rnd = new Random();

        for (int i = 1; i <= dataItemCount; i++)
        {
            var productNumber = rnd.Next(1, productCount);

            PivotData.Add(new PivotModel()
            {
                Category = $"Category {productNumber % categoryCount + 1}",
                Product = $"Product {productNumber}",
                City = $"City {rnd.Next(1, cityCount)}",
                ContractDate = DateTime.Now.AddDays(-rnd.Next(1, 31)).AddMonths(-rnd.Next(1, 12)).AddYears(-rnd.Next(0, 5)),
                ContractValue = rnd.Next(123, 987)
            });
        }

        base.OnInitialized();
    }

    public class PivotModel
    {
        public string Category { get; set; } = null!;
        public string Product { get; set; } = null!;
        public string City { get; set; } = null!;
        public DateTime ContractDate { get; set; }
        public decimal ContractValue { get; set; }
    }
}
````


## Xmla

The PivotGrid supports binding to [XML for Analysis](https://learn.microsoft.com/en-us/analysis-services/xmla/xml-for-analysis-xmla-reference) data, for example an [OLAP cube](https://en.wikipedia.org/wiki/OLAP_cube). For more information about OLAP cubes, check [Just What Are Cubes Anyway? A Painless Introduction to OLAP Technology](https://learn.microsoft.com/en-us/previous-versions/office/developer/office-xp/aa140038(v=office.10)) by Microsoft.

The PivotGrid provides nested Razor components to setup the XMLA connection. Use the `<PivotGridSettings>` tag and place one or both of the following inside it:

* [`<PivotGridXmlaDataProviderSettings>`](#xmla-data-provider-settings) - configures the data server URL and database name
* [`<PivotGridXmlaDataProviderCredentials>`](#xmla-data-provider-credentials) - configures optional access credentials

### XMLA Data Provider Settings

The `PivotGridXmlaDataProviderSettings` component exposes the following parameters.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type | Description |
| --- | --- | --- |
| `Catalog` | `string` | The initial dataset (batabase) name to connect to. |
| `Cube` | `string` | The OLAP cube name. |
| `ServerUrl` | `string` | The endpoint URL that provides [HTTP access to the XMLA Analysis Services](https://learn.microsoft.com/en-us/analysis-services/instances/configure-http-access-to-analysis-services-on-iis-8-0). If the endpoint is on a different domain, make sure to [configure CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS). |

>tip Setting up an OLAP cube is outside the scope of this documentation. You can start from [SQL Server Analysis Services](https://learn.microsoft.com/en-us/analysis-services/ssas-overview).

### XMLA Data Provider Credentials

The `<PivotGridXmlaDataProviderCredentials>` component creates an object, which is similar to [`System.Net.NetworkCredential`](https://learn.microsoft.com/en-us/dotnet/api/system.net.networkcredential) and works in a similar way. It has the following parameters.

| Parameter | Type | Description |
| --- | --- | --- |
| `Domain` | `string` | (optional) The domain, which verifies the credentials. |
| `Password` | `string` | The password for the provided `Username`. |
| `Username` | `string` | The user that requests access to the XMLA data. |

### XMLA Data Binding Example

>caption PivotGrid bound to XMLA data provider without credentials

````CSHTML
<TelerikPivotGridContainer>
    <TelerikPivotGridConfigurator />

    <TelerikPivotGridConfiguratorButton />

    <TelerikPivotGrid DataProviderType="@PivotGridDataProviderType.Xmla"
                      TItem="object">
        <PivotGridSettings>
            <PivotGridXmlaDataProviderSettings ServerUrl="https://demos.telerik.com/olap/msmdpump.dll"
                                               Catalog="Adventure Works DW 2008R2"
                                               Cube="Adventure Works" />
        </PivotGridSettings>

        <PivotGridRows>
            <PivotGridRow Name="[Product].[Category]"></PivotGridRow>
            <PivotGridRow Name="[Product].[Model Name]"></PivotGridRow>
        </PivotGridRows>

        <PivotGridColumns>
            <PivotGridColumn Name="[Date].[Calendar Quarter of Year]"></PivotGridColumn>
            <PivotGridColumn Name="[Date].[Calendar Year]"></PivotGridColumn>
        </PivotGridColumns>

        <PivotGridMeasures>
            <PivotGridMeasure Name="[Measures].[Reseller Order Count]"></PivotGridMeasure>
        </PivotGridMeasures>
    </TelerikPivotGrid>
</TelerikPivotGridContainer>
````

## See Also

* [Live PivotGrid Demos - Local Data Binding](https://demos.telerik.com/blazor-ui/pivotgrid/local-data-binding)
* [Live PivotGrid Demos - OLAP (XMLA) Data Binding](https://demos.telerik.com/blazor-ui/pivotgrid/xmla-data-binding)
* [PivotGrid API Reference](/blazor-ui/api/Telerik.Blazor.Components.TelerikPivotGrid-1)
