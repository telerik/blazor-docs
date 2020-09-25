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

@[template](/_contentTemplates/grid/common-link.md#display-format-basics)

## Example

>caption Use C# format strings in the grid through the component markup and a data annotation attribute in the model

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


@[template](/_contentTemplates/grid/common-link.md#display-format-notes)


## See Also

  * [Live Demo: Column Format](https://demos.telerik.com/blazor-ui/grid/column-format)
