---
title: Data Binding
page_title: DatAInsightsComposer Data Binding
description: Learn how to supply data to the Telerik DatAInsightsComposer for Blazor.
slug: datainsightscomposer-data-binding
tags: telerik, blazor, datainsightscomposer, AI
published: True
position: 10
components: ["datainsightscomposer"]
---

# DatAInsightsComposer Data Binding

The DatAInsightsComposer can work with a collection of different datasets where each dataset holds data of different type with different properties. This article describes the supported ways to supply data to the DatAInsightsComposer.

## Basics

The DatAInsightsComposer learns about its data through its `Datasets` parameter that can hold one or more [`DatasetDescriptor`](slug:Telerik.Blazor.Components.DatAInsightsComposer.DatasetDescriptor) objects. Each dataset descriptor contains information about:

* Its unique `string` identifier and description.
* The data item property names and types as a `List` of [`DatasetFieldDescriptor`](slug:Telerik.Blazor.Components.DatAInsightsComposer.DatasetFieldDescriptor).
* The data items.

The DatAInsightsComposer requires each `DatasetDescriptor` to have an `Id` and `Fields`, but doesn't need the `Data` to be initially available. The app can [load the data on demand](#load-data-in-onpromptsubmit), depending on the user prompt or other business logic.

The app can provide data to the DatAInsightsComposer as:

* [Strongly-typed models](#strongly-typed-model)
* [Anonymous objects](#anonymous-objects)
* [`ExpandoObject`s](#expandoobject)

>tip The DatAInsightsComposer sends only dataset field metadata to the AI service. It does not send the actual data items.

## Strongly-Typed Model

>caption Using DatAInsightsComposer with strongly-typed data 

````RAZOR.skip-repl
<TelerikDatAInsightsComposer Datasets="@DAICDatasets"
                             @bind-Prompt="@DAICPrompt" />

@code {
    private string DAICPrompt { get; set; } = "Show all data in tabular format";

    private readonly static string[] ProductNames = new string[] { "Phones", "Tablets", "Laptops" };

    private List<DatasetDescriptor> DAICDatasets { get; set; } = new()
    {
        new DatasetDescriptor()
        {
            Id = "Sales Contracts",
            Description = "Sales contracts by category, product, country, and city",
            Fields = new List<DatasetFieldDescriptor>()
            {
                new() { Name = "Category", Type = DatasetFieldType.String },
                new() { Name = "Product", Type = DatasetFieldType.String },
                new() { Name = "Country", Type = DatasetFieldType.String },
                new() { Name = "City", Type = DatasetFieldType.String },
                new() { Name = "ContractDate", Type = DatasetFieldType.Date },
                new() { Name = "ContractValue", Type = DatasetFieldType.Number }
            }
        }
    };

    protected override void OnInitialized()
    {
        int dataItemCount = 100;
        int categoryCount = 3;
        int productCount = 10 + 1;
        int countryCount = 2;
        int cityCount = 4 + 1;
        Random rnd = Random.Shared;

        List<DAICModel> data = new();

        for (int i = 1; i <= dataItemCount; i++)
        {
            int productNumber = Random.Shared.Next(1, productCount);
            int categoryNumber = productNumber % categoryCount + 1;
            int cityNumber = rnd.Next(1, cityCount);
            int countryNumber = cityNumber % countryCount + 1;

            data.Add(new DAICModel()
            {
                Category = $"Category {categoryNumber}",
                Product = $"Product {productNumber}",
                Country = $"Country {countryNumber}",
                City = $"City {countryNumber}-{cityNumber}",
                ContractDate = DateOnly.FromDateTime(DateTime.Today.AddDays(-rnd.Next(1, 31)).AddMonths(-rnd.Next(1, 12)).AddYears(-rnd.Next(0, 5))),
                ContractValue = rnd.Next(1234, 9876)
            });
        }

        DAICDatasets.First().Data = data;

        base.OnInitialized();
    }

    public class DAICModel
    {
        public string Category { get; set; } = string.Empty;
        public string Product { get; set; } = string.Empty;
        public string Country { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public DateOnly ContractDate { get; set; }
        public decimal ContractValue { get; set; }
    }
}
````

## Anonymous Objects

>caption Using DatAInsightsComposer with anonymous objects

````RAZOR.skip-repl
<TelerikDatAInsightsComposer Datasets="@DAICDatasets"
                             @bind-Prompt="@DAICPrompt" />

@code {
    private string DAICPrompt { get; set; } = "Show all data in tabular format";

    private readonly static string[] ProductNames = new string[] { "Phones", "Tablets", "Laptops" };

    private List<DatasetDescriptor> DAICDatasets { get; set; } = new()
    {
        new DatasetDescriptor()
        {
            Id = "Sales Contracts",
            Description = "Sales contracts by category, product, country, and city",
            Fields = new List<DatasetFieldDescriptor>()
            {
                new() { Name = "Category", Type = DatasetFieldType.String },
                new() { Name = "Product", Type = DatasetFieldType.String },
                new() { Name = "Country", Type = DatasetFieldType.String },
                new() { Name = "City", Type = DatasetFieldType.String },
                new() { Name = "ContractDate", Type = DatasetFieldType.Date },
                new() { Name = "ContractValue", Type = DatasetFieldType.Number }
            }
        }
    };

    protected override void OnInitialized()
    {
        int dataItemCount = 100;
        int categoryCount = 3;
        int productCount = 10 + 1;
        int countryCount = 2;
        int cityCount = 4 + 1;
        Random rnd = Random.Shared;

        List<object> data = new();

        for (int i = 1; i <= dataItemCount; i++)
        {
            int productNumber = Random.Shared.Next(1, productCount);
            int categoryNumber = productNumber % categoryCount + 1;
            int cityNumber = rnd.Next(1, cityCount);
            int countryNumber = cityNumber % countryCount + 1;

            data.Add(new
            {
                Category = $"Category {categoryNumber}",
                Product = $"Product {productNumber}",
                Country = $"Country {countryNumber}",
                City = $"City {countryNumber}-{cityNumber}",
                ContractDate = DateOnly.FromDateTime(DateTime.Today.AddDays(-rnd.Next(1, 31)).AddMonths(-rnd.Next(1, 12)).AddYears(-rnd.Next(0, 5))),
                ContractValue = rnd.Next(1234, 9876)
            });
        }

        DAICDatasets.First().Data = data;

        base.OnInitialized();
    }
}
````

## ExpandoObject

>caption Using DatAInsightsComposer with ExpandoObject

````RAZOR.skip-repl
@using System.Dynamic

<TelerikDatAInsightsComposer Datasets="@DAICDatasets"
                             @bind-Prompt="@DAICPrompt" />

@code {
    private string DAICPrompt { get; set; } = "Show all data in tabular format";

    private readonly static string[] ProductNames = new string[] { "Phones", "Tablets", "Laptops" };

    private List<DatasetDescriptor> DAICDatasets { get; set; } = new()
    {
        new DatasetDescriptor()
        {
            Id = "Sales Contracts",
            Description = "Sales contracts by category, product, country, and city",
            Fields = new List<DatasetFieldDescriptor>()
            {
                new() { Name = "Category", Type = DatasetFieldType.String },
                new() { Name = "Product", Type = DatasetFieldType.String },
                new() { Name = "Country", Type = DatasetFieldType.String },
                new() { Name = "City", Type = DatasetFieldType.String },
                new() { Name = "ContractDate", Type = DatasetFieldType.Date },
                new() { Name = "ContractValue", Type = DatasetFieldType.Number }
            }
        }
    };

    protected override void OnInitialized()
    {
        int dataItemCount = 100;
        int categoryCount = 3;
        int productCount = 10 + 1;
        int countryCount = 2;
        int cityCount = 4 + 1;
        Random rnd = Random.Shared;

        List<object> data = new();

        for (int i = 1; i <= dataItemCount; i++)
        {
            int productNumber = Random.Shared.Next(1, productCount);
            int categoryNumber = productNumber % categoryCount + 1;
            int cityNumber = rnd.Next(1, cityCount);
            int countryNumber = cityNumber % countryCount + 1;

            data.Add(CreateSalesItem(categoryNumber, productNumber, countryNumber, cityNumber));
        }

        DAICDatasets.First().Data = data;

        base.OnInitialized();
    }

    private ExpandoObject CreateSalesItem(int categoryNumber, int productNumber, int countryNumber, int cityNumber)
    {
        Random rnd = Random.Shared;
        ExpandoObject item = new ExpandoObject();
        IDictionary<string, object?> values = (IDictionary<string, object?>)item;

        values.Add("Category", $"Category {categoryNumber}");
        values.Add("Product", $"Product {productNumber}");
        values.Add("Country", $"Country {countryNumber}");
        values.Add("City", $"City {countryNumber}-{cityNumber}");
        values.Add("ContractDate", DateOnly.FromDateTime(DateTime.Today.AddDays(-rnd.Next(1, 31)).AddMonths(-rnd.Next(1, 12)).AddYears(-rnd.Next(0, 5))));
        values.Add("ContractValue", rnd.Next(1234, 9876));

        return item;
    }
}
````

## Load Data in OnPromptSubmit

The following example uses a model, but the same idea applies to anonymous objects and `ExpandoObject`s.

>caption Loading DatAInsightsComposer data on demand

````RAZOR.skip-repl
<TelerikDatAInsightsComposer Datasets="@DAICDatasets"
                             @bind-Prompt="@DAICPrompt"
                             OnPromptSubmit="@OnDAICPromptSubmit" />

@code {
    private string DAICPrompt { get; set; } = string.Empty;

    private List<DatasetDescriptor> DAICDatasets { get; set; } = new()
    {
        new DatasetDescriptor()
        {
            Id = "monthly-sales",
            Description = "Monthly sales totals",
            Fields = new List<DatasetFieldDescriptor>()
            {
                new() { Name = "Month", Type = DatasetFieldType.String },
                new() { Name = "Revenue", Type = DatasetFieldType.Number }
            }
        }
    };

    private void OnDAICPromptSubmit(DatAInsightsComposerPromptSubmitEventArgs args)
    {
        DAICDatasets.ElementAt(0).Data = new List<DAICModel>()
        {
            new() { Month = "January", Revenue = 12000 },
            new() { Month = "February", Revenue = 14500 },
            new() { Month = "March", Revenue = 13800 }
        };
    }

    public class DAICModel
    {
        public string Month { get; set; } = string.Empty;
        public decimal Revenue { get; set; }
    }
}
````

## Next Steps

* [Configure the DatAInsightsComposer Visuzalization Components](slug:datainsightscomposer-components)
* [Manage the DatAInsightsComposer State](slug:datainsightscomposer-state)
* [Handle DatAInsightsComposer Events](slug:datainsightscomposer-events)

## See Also

* [DatAInsightsComposer API Reference](slug:Telerik.Blazor.Components.TelerikDatAInsightsComposer)
