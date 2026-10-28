---
title: Data Binding
page_title: PivotGrid Data Binding
description: What are the different ways to provide data to the Telerik UI for Blazor PivotGrid. Information about XMLA datasource, local data.
slug: pivotgrid-data-binding
tags: telerik,blazor,pivotgrid
published: True
position: 10
components: ["pivotgrid"]
---

# PivotGrid Data Binding

This article describes the PivotGrid data binding mechanism and the supported data source options.


## Data Provider Type

The PivotGrid supports different data sources via its `DataProviderType` parameter. The parameter type is `PivotGridDataProviderType` enum and its members are:

* [`Local`](#local) (default)
* [`Xmla`](#xmla)

### Usage Differences

The available data providers differ in several ways:

* XMLA binding is more complex to setup, but more flexible.
* Local data does not support aggregations by date periods for `DateTime` properties. If a `DateTime` property is added as a row or column, the PivotGrid will generate a separate row or column for each unique `DateTime` value. If you need [aggregations by year, month, week, and so on, then create additional `int` or `string` properties in the PivotGrid model class](slug:pivotgrid-kb-local-date-aggregates).
* XMLA binding supports [load on demand](slug:pivotgrid-overview#pivotgrid-parameters), which offloads all calculations to the external data source. Local binding receives all data at once and performs all aggregate calculations in-memory. Large amounts of local data may impact the performance, especially in WebAssembly apps.
* When using load on demand, XMLA binding supports custom aggregate functions that are defined and performed in the OLAP cube. Local data supports only the [predefined aggregate types in the `PivotGridAggregateType` enum](slug:telerik.blazor.pivotgridaggregatetype).
* When using local data, all defined measures in `<PivotGridMeasures>` render by default in the PivotGrid. Users can uncheck and hide the measures they don't need from the [PivotGrid Configurator](slug:pivotgrid-configurator).

## Local

When bound to local data, the Pivot Grid requires its `Data` parameter to provide all the data at once as `IEnumerable<TItem>`.

If the local data changes programmatically, you need to reset the collection instance or [call the PivotGrid `Rebind()` method](slug:pivotgrid-overview#pivotgrid-reference-and-methods). See the common documentation about [refreshing component data](slug:common-features-data-binding-overview#refresh-data) for details.

>caption PivotGrid bound to Local data provider

<div class="skip-repl"></div>

<demo metaUrl="client/pivotgrid/data-binding/example-2/" height="420"></demo>


## XMLA

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

````RAZOR.skip-repl
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
* [PivotGrid API Reference](slug:Telerik.Blazor.Components.TelerikPivotGrid-1)
