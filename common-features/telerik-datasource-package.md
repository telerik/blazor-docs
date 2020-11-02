---
title: Telerik DataSource Package
page_title: Telerik DataSource Package
description: Details about the Telerik.DataSource NuGet package that come with Telerik UI for Blazor and some other Telerik products.
slug: common-features-datasource-package
tags: telerik,blazor,data,source,package
published: True
position: 50
---

# Telerik DataSource Package

The Telerik DataSource NuGet package is a set of classes and extension methods that help with remote (server-side) sorting, paging, grouping and filtering data collections.

In this article:

## Basics

The `Telerik.DataSource` package is distributed through the [Telerik Private NuGet Feed]({%slug installation/nuget%}) and is available to both trial and commercial licenses. It is also available as a resource in the [offline installer]({%slug installation/msi%}) and [resources archive]({%slug installation/zip%}) of Telerik UI for Blazor and some other Telerik suites, such as UI for ASP.NET Core.

The `Telerik.DataSource` package targets `netstandard2.1` and is compatible with .NET backends that can compile it (such as .NET Core 3.1, .NET 5 and so on).

This package lets you get or generate a request to the data source that describes various settings such as filters, paging, sorting, grouping, and, through an extension methods, provides you with a resulting data set according to those settings.

### Key Classes and Extensions Methods

The following classes and extension methods are the key components to the package:

* [`DataSourceRequest`](https://docs.telerik.com/blazor-ui/api/Telerik.DataSource.DataSourceRequest) - the class that describes the request for data - what page index, page size, filters and sorts, groups and aggregates are required by the client. You can receive it from Telerik components (such as the [Blazor grid in its manual data operations mode]({%slug components/grid/manual-operations%})), or over the wire and deserialize it (such as for requests coming from widgets like the [UI for ASP.NET Core Grid with remote data](https://demos.telerik.com/aspnet-core/grid/remote-data-binding)). You can even create a `new` instance of the object and populate its fields according to some other business logic (like an OData querystring or some other case). This object is in the `Telerik.DataSource` namespace.

* [`DataSourceResult`](https://docs.telerik.com/blazor-ui/api/Telerik.DataSource.DataSourceResult) - the resulting data set from the operations on the data source. It will contain the current page of data, for its appropriate index, according to the designated filters, sorts, groups; and it will also contain the total number of items in the data source. It will also contain aggregate data. This is what you would normally serialize over the wire to send back to the client (or pass by reference in case of C#-only services). This object is in the `Telerik.DataSource` namespace.

* The `ToDataSourceResult(DataSourceRequest request)` [extension method](https://docs.telerik.com/blazor-ui/api/Telerik.DataSource.Extensions.QueryableExtensions) - this method is in the `Telerik.DataSource.Extensions` namespace, and is available for `IQueryable`, `IEnumerable` and `DataTable`. It receives a `DataSourceRequest` argument and returns a `DataSourceResult` object. It also has an async version (with the standard `Async` suffix to the method name). This is the method that facilitates the data operations itself so you don't have to implement them.



## Examples

The general usage is as simple as defining (or receiving) a `DataSourceResult` object, passing it to the `ToDataSourceResult` extension method, and consuming the `DataSourceResult` object that comes out of it.

>tip You can find more complex use cases and examples, such as serializing grouped data and using custom serializers (such as `Newtonsoft.Json`) in the following sample projects (note: they are written in Blazor, but the backend services they simulate are standard .NET Core code): <a href="https://github.com/telerik/blazor-ui/tree/master/grid/datasourcerequest-on-server" target="_blank">Use Telerik DataSourceRequest and DataSourceResult on the server</a>.

>caption Basic Console example for using a `DataSourceRequest` and `DataSourceResult`. Note: it expects that you have referenced the `Telerik.DataSource` NuGet package

````C#
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Telerik.DataSource;
using Telerik.DataSource.Extensions;

namespace ConsoleApp1
{
    class Program
    {
        static void Main(string[] args)
        {
            var data = GetData(); // simulate a real data source

            // create or receive a DataSourceRequest
            DataSourceRequest request = new DataSourceRequest
            {
                Page = 1, // start from the first page so you can track the operation more easily
                PageSize = 5, // page size is 5
                Filters = new List<IFilterDescriptor>() // some sample filtering
                {
                    // Items from Team 3 that have an ID bigger than 10
                    new FilterDescriptor() { Member = "Id", Operator = FilterOperator.IsGreaterThan, Value = 10, MemberType = typeof(int) },
                    new FilterDescriptor() { Member = "Team", Operator = FilterOperator.Contains, Value = "3", MemberType = typeof(string) },
                }
            };

            // get the DataSourceResult
            DataSourceResult result = data.ToDataSourceResult(request);

            Console.WriteLine(result.Total); // Takes into account the filters. OUTPUT: 248
            foreach (SampleModel item in result.Data)
            {
                Console.WriteLine($"ID: {item.Id}, team: {item.Team}");
                //OUTPUT:
                //ID: 11, team: Team 3
                //ID: 15, team: Team 3
                //ID: 19, team: Team 3
                //ID: 23, team: Team 3
                //ID: 27, team: Team 3
            }
        }

        static IQueryable<SampleModel> GetData()
        {
            return Enumerable.Range(1, 1000).Select(x => new SampleModel 
            {
                Id = x,
                Team = $"Team {x % 4}"
            }).AsQueryable();
        }
    }

    public class SampleModel
    {
        public int Id { get; set; }
        public string Team { get; set; }
    }
}

````

## Differences with Kendo DataSource

If you have used other Telerik products before, such as the Telerik UI for ASP.NET Core or Telerik UI for ASP.NET MVC, you may be familiar with or you may already be using the `DataSourceResult`, `ToDataSourceResult` and `DataSourceResult` features. They are available as part of those respective packages (assemblies), and the `Telerik.DataSource` package is those features extracted into a smaller, more lightweight package that is platform agnostic. This means that it has a few differences from the Kendo methods:

* The `Telerik.DataSource` package does not have model binding features, because it is not coupled to the MVC framework.

* The `Telerik.DataSource` packages uses the `System.Text.Json` serializer, and if you use custom serializers such as `Newtonsoft.Json`, you may need to tweak their settings so they ignore casinng, and so they can serialize the Telerik objects. You can read more about this and find example in the <a href="https://github.com/telerik/blazor-ui/tree/master/grid/datasourcerequest-on-server/CustomSerializer" target="_blank">Use DataSourceRequest and DataSourceResult and WebAPI in a WebAssembly Blazor app with custom serialization</a> sample project.

* The `Telerik.DataSource` package may evolve at a different rate from the Kendo packages and code. This means that not all fixes and features may be ported, or available at the same time.

