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

This article describes the PivotGrid data binding mechanism.


## Data Provider Type

The PivotGrid supports different data sources via its `DataProviderType` parameter. The parameter type is `PivotGridDataProviderType` enum and its members are:default value is `Local`.

<!-- * [`Adomd`](#adomd) -->
<!-- * [`IQueryable`](#iqueryable) -->
* [`Local`](#local) (default)
* [`Xmla`](#xmla)


## Local

In this case, the PivotGrid is bound to local flat data. The component requires its `Data` parameter to provide all the data at once as `IEnumerable<TItem>`. The Pivot Grid will perform all calculations in-memory and there is no load on demand.

>caption PivotGrid bound to Local data provider

````CSHTML
<TelerikPivotGridContainer>

    <TelerikPivotGridConfigurator Filterable="true"
                                 Sortable="true" />

    <TelerikPivotGridConfiguratorButton />

    <TelerikPivotGrid Data="@PivotData"
                      DataProviderType="@PivotGridDataProviderType.Local">
        <PivotGridColumns>
            <PivotGridColumn Name="@nameof(PivotModel.City)" />
        </PivotGridColumns>
        <PivotGridRows>
            <PivotGridRow Name="@nameof(PivotModel.Product)" />
        </PivotGridRows>
        <PivotGridMeasures>
            <PivotGridMeasure Name="@nameof(PivotModel.ContractValue)"
                              Aggregate="@PivotGridAggregate.Sum" />
        </PivotGridMeasures>
    </TelerikPivotGrid>

</TelerikPivotGridContainer>

@code {
    private List<PivotModel> PivotData { get; set; } = new List<PivotModel>();

    protected override void OnInitialized()
    {
        var dataItemCount = 100;
        var productCount = 5 + 1; // rnd.Next() does not include the max value 6
        var cityCount = 5 + 1;
        var rnd = new Random();

        for (int i = 1; i <= dataItemCount; i++)
        {
            PivotData.Add(new PivotModel()
            {
                Product = $"Product {rnd.Next(1, productCount)}",
                City = $"City {rnd.Next(1, cityCount)}",
                ContractDate = DateTime.Now.AddDays(-rnd.Next(1, 31)).AddMonths(-rnd.Next(1, 12)).AddYears(-rnd.Next(0, 5)),
                ContractValue = rnd.Next(123, 987)
            });
        }

        base.OnInitialized();
    }

    public class PivotModel
    {
        public string Product { get; set; } = null!;
        public string City { get; set; } = null!;
        public DateTime ContractDate { get; set; }
        public decimal ContractValue { get; set; }
    }
}
````


## Xmla

In this case, the PivotGrid is bound to [XML for Analysis](https://learn.microsoft.com/en-us/analysis-services/xmla/xml-for-analysis-xmla-reference) data, for example an [OLAP](https://en.wikipedia.org/wiki/Online_analytical_processing) cube.

The PivotGrid provides additional settings to setup the XMLA connection:

`<PivotGridXmlaDataProviderCredentials>`
`<PivotGridXmlaDataProviderSettings>`
`<PivotGridXmlaDataProviderCredentials Domain="" PassWord="" Username="" />`

>caption PivotGrid bound to Xmla data provider

````CSHTML
@using Telerik.Blazor.Components.PivotGrid.Enums

<TelerikPivotGridContainer>
    <TelerikPivotGridConfigurator Fields="@( new List<object>() { "Product", "Date" } )"
                                  Filterable="true"
                                  Sortable="true">
    </TelerikPivotGridConfigurator>

    <TelerikPivotGridConfiguratorButton></TelerikPivotGridConfiguratorButton>

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

* [Live PivotGrid Demos](https://demos.telerik.com/blazor-ui/pivotgrid)
* [PivotGrid API Reference](/blazor-ui/api/Telerik.Blazor.Components.TelerikPivotGrid-1)
