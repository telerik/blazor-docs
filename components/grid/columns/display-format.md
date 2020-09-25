---
title: Display Format
page_title: Grid - Display Format
description: Use C# Format string to display values in the Grid for Blazor.
slug: grid-columns-displayformat
tags: telerik,blazor,grid,column,display,format
published: True
position: 2
---

# Column Display Format

You can set a C# format string to the column so that it renders the values with the corresponding styling according to the current culture of the thread.

To set the desired format string, use the `DisplayFormat` parameter of the column.

If the model field has the `DataFormatString` set through the `DisplayFormat` DataAnnotation attribute, the grid will honor that without an explicit setting in the markup of the column.

You can use the standard C# formatting options, because the grid uses a `string.Format` call: <a href="https://docs.microsoft.com/en-us/dotnet/standard/base-types/formatting-types" target="_blank">MSDN: Format types in .NET</a>.

>caption Use C# format strings in the grid through the grid markup and a data annotation attribute in the model

````CSHTML
@using System.ComponentModel.DataAnnotations
@* This Using is for the model class attribute only *@

<TelerikGrid Data="@GridData">
    <GridColumns>
        <GridColumn DisplayFormat="{0:P3}" Title="Percentage with 3 decimals" Field="@nameof(SampleModel.SomeField)" />
        <GridColumn Title="Currency format" Field="@nameof(SampleModel.NumericPropertyWithAnnotation)" />
    </GridColumns>
</TelerikGrid>

@code {
    class SampleModel
    {
        public double SomeField { get; set; }

        [DisplayFormat(DataFormatString = "{0:C}")]
        public decimal NumericPropertyWithAnnotation { get; set; }
    }

    List<SampleModel> GridData { get; set; }

    protected override void OnInitialized()
    {
        GridData = new List<SampleModel>
        {
            new SampleModel()
            {
                SomeField = 0.123456789d,
                NumericPropertyWithAnnotation = 7.3M
            }
        };
    }
}
````

>caption The result from the code snippet above

![DisplayFormat basic sample](images/display-format-basic-sample.png)

>caption Notes

* Numeric, DateTime and Enum types can use such formats. String and Boolean types are displayed without such a format, however.

* The `CurrentInfo.CurrentCulture` is used when rendering the formats, so if you need specific formats for specific users, you must set the culture of the app accordingly.


## See Also

  * [Live Demo: Column Format](https://demos.telerik.com/blazor-ui/grid/column-format)
