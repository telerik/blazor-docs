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

<TelerikGrid Data="@GridData" Pageable="true">
    <GridColumns>
        <GridColumn Field="@nameof(SampleModel.Name)" />

        <GridColumn Field="@nameof(SampleModel.Salary)" />
        <GridColumn DisplayFormat="{0:dd MMM yy}" Field="@nameof(SampleModel.HireDate)" />

    </GridColumns>
</TelerikGrid>

@code {
    class SampleModel
    {
        public string Name { get; set; }

        [DisplayFormat(DataFormatString = "{0:C}")]
        public decimal Salary { get; set; }
        public DateTime HireDate { get; set; }
    }

    // sample data generation

    List<SampleModel> GridData { get; set; }

    protected override void OnInitialized()
    {
        Random rand = new Random();
        GridData = Enumerable.Range(1, 50).Select(x => new SampleModel
        {
            Name = $"name {x}",
            Salary = x * 20000 / 12.34m,
            HireDate = DateTime.Now.Date.AddMonths(rand.Next(-20, 20)).AddDays(rand.Next(-10, 10)),
        }).ToList();
    }
}
````

>caption The result from the code snippet above

![DisplayFormat basic sample](images/display-format-basic-sample.png)


@[template](/_contentTemplates/grid/common-link.md#display-format-notes)


## See Also

  * [Live Demo: Column Format](https://demos.telerik.com/blazor-ui/grid/column-format)
