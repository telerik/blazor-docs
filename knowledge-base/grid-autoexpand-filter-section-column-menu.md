---
title: Automatically Expand Filter Section in Grid Column Menu
description: Learn how to auto-expand the filter section when opening the column menu in TelerikGrid.
type: how-to
page_title: Automatically Expand Filter Section in Grid Column Menu
meta_title: Autoexpand Filter Section in Grid Column Menu
slug: grid-kb-autoexpand-filter-section-column-menu
tags: grid, column-menu, filter
res_type: kb
ticketid: 1705448
components: ["grid"]
---
## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>Grid for Blazor</td>
        </tr>
    </tbody>
</table>

## Description

I want the filter section of the [column menu](slug:grid-column-menu) in the [TelerikGrid](slug:grid-overview) to automatically open when a user opens the column menu. 

## Solution

To auto-expand the filter section, use JavaScript interop to simulate a click on the filter header when the column menu is opened. Below is a runnable example:

````Razor
@inject IJSRuntime JSRuntime

<TelerikGrid Data="@GridData"
             Pageable="true"
             PageSize="5"
             FilterMode="@GridFilterMode.FilterMenu"
             Sortable="true"
             ShowColumnMenu="true">
    <GridColumns>
        <GridColumn Field="@(nameof(SampleData.Id))" Width="80px" />
        <GridColumn Field="@(nameof(SampleData.Name))" Title="Employee Name" Groupable="false" />
        <GridColumn Field="@(nameof(SampleData.Team))" Title="Team" />
        <GridColumn Field="@(nameof(SampleData.HireDate))" Title="Hire Date" />
    </GridColumns>
</TelerikGrid>

<script>
        window.initColumnMenuAutoClick = function () {
        // Select all column menu buttons in the grid header
        const menuButtons = document.querySelectorAll(".k-grid .k-header .k-grid-column-menu");

        menuButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                // Wait for the popup animation (adjust timeout if needed)
                setTimeout(() => {
                    const items = document.querySelectorAll(
                        ".k-column-menu .k-columnmenu-item-wrapper .k-columnmenu-item"
                    );

                    items[3].click();
                }, 150); // Adjust if animation is slower/faster
            });
        });
    };

</script>

@code {
    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            await Task.Delay(500); // Ensure the grid is fully rendered
            await JSRuntime.InvokeVoidAsync("initColumnMenuAutoClick");
        }
    }

    private IEnumerable<SampleData> GridData = Enumerable.Range(1, 30).Select(x => new SampleData
    {
        Id = x,
        Name = "name " + x,
        Team = "team " + x % 5,
        HireDate = DateTime.Now.AddDays(-x).Date
    });

    public class SampleData
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Team { get; set; }
        public DateTime HireDate { get; set; }
    }
}
````

## See Also

* [Grid Documentation](slug:grid-overview)
* [Column Menu Documentation](slug:grid-column-menu)
