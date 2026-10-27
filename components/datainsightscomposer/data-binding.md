---
title: Data Binding
page_title: Data Insights Composer Data Binding
description: Learn how to supply data to the Telerik Data Insights Composer for Blazor.
slug: datainsightscomposer-data-binding
tags: telerik, blazor, data insights composer, AI
published: True
position: 10
components: ["datainsightscomposer"]
---

# Data Insights Composer Data Binding

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
    private string DAICPrompt { get; set; } = string.Empty;

    private List<DatasetDescriptor> DAICDatasets { get; set; } = new()
    {
        new DatasetDescriptor()
        {
            Id = "monthly-sales",
            Description = "Total monthly sales",
            Fields = new List<DatasetFieldDescriptor>()
            {
                new() { Name = "Month", Type = DatasetFieldType.String },
                new() { Name = "Revenue", Type = DatasetFieldType.Number }
            },
            Data = new List<DAICModel>()
            {
                new() { Month = "January", Revenue = 12000 },
                new() { Month = "February", Revenue = 14500 },
                new() { Month = "March", Revenue = 13800 }
            }
        }
    };

    public class DAICModel
    {
        public string Month { get; set; } = string.Empty;
        public decimal Revenue { get; set; }
    }
}
````

## Anonymous Objects

>caption Using DatAInsightsComposer with anonymous objects

````RAZOR.skip-repl
<TelerikDatAInsightsComposer Datasets="@DAICDatasets"
                             @bind-Prompt="@DAICPrompt" />

@code {
    private string DAICPrompt { get; set; } = string.Empty;

    private List<DatasetDescriptor> DAICDatasets { get; set; } = new()
    {
        new DatasetDescriptor()
        {
            Id = "monthly-sales",
            Description = "Total monthly sales",
            Fields = new List<DatasetFieldDescriptor>()
            {
                new() { Name = "Month", Type = DatasetFieldType.String },
                new() { Name = "Revenue", Type = DatasetFieldType.Number }
            },
            Data = new List<object>()
            {
                new { Month = "January", Revenue = 12000 },
                new { Month = "February", Revenue = 14500 },
                new { Month = "March", Revenue = 13800 }
            }
        }
    };
}
````

## ExpandoObject

>caption Using DatAInsightsComposer with ExpandoObject

````RAZOR.skip-repl
<TelerikDatAInsightsComposer Datasets="@DAICDatasets"
                             @bind-Prompt="@DAICPrompt" />

@code {
    private string DAICPrompt { get; set; } = string.Empty;

    private List<DatasetDescriptor> DAICDatasets { get; set; } = new()
    {
        new DatasetDescriptor()
        {
            Id = "monthly-sales",
            Description = "Total monthly sales",
            Fields = new List<DatasetFieldDescriptor>()
            {
                new() { Name = "Month", Type = DatasetFieldType.String },
                new() { Name = "Revenue", Type = DatasetFieldType.Number }
            },
            Data = new List<ExpandoObject>()
            {
                CreateSalesRow("January", 12000),
                CreateSalesRow("February", 14500),
                CreateSalesRow("March", 13800)
            }
        }
    };

    private ExpandoObject CreateSalesItem(string month, decimal revenue)
    {
        ExpandoObject item = new ExpandoObject();
        IDictionary<string, object?> values = (IDictionary<string, object?>)item;
        values.Add("Month", month);
        values.Add("Revenue", revenue);
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

* [Data Insights Composer API Reference](slug:Telerik.Blazor.Components.TelerikDatAInsightsComposer)
