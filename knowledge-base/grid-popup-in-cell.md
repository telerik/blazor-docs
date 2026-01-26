---
title: How to Display a Popup in a Grid Cell
description: Learn how to display a popup beside an icon embedded in a cell of the Grid for Blazor.
type: how-to
page_title: How to Display Popup Next to Icon in Grid for Blazor
slug: grid-kb-popup-in-cell
tags: blazor, grid, popup, template
res_type: kb
ticketid: 1689992, 1640846
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

I want to display a popup beside an icon embedded within a cell in the [Grid for Blazor](slug:grid-overview). The popup should appear when the icon is clicked.

## Solution

To display a popup within a Grid cell:

1. Add a button that triggers the popup for each row by using a `GridCommandColumn` or a column [`Template`](slug:grid-templates-column).

2. Anchor the [`Popover`](slug:popover-overview) to the button via `AnchorSelector`.

Here is an example implementation:

````RAZOR
<TelerikGrid Data="@GridData"
             TItem="@SampleModel"
             Pageable="true"
             Sortable="true"
             FilterMode="GridFilterMode.FilterRow">
    <GridColumns>
        <GridCommandColumn>
            @{
                var dataItem = (SampleModel)context;
            }
            <GridCommandButton Id="@( $"button{dataItem.Id}" )" Icon="@SvgIcon.DocumentManager"
                               OnClick="@OnPopupShowButtonClick" />
        </GridCommandColumn>
        <GridColumn Field="@nameof(SampleModel.Price)" />
        <GridColumn Field="@nameof(SampleModel.Quantity)" />
    </GridColumns>
</TelerikGrid>

<TelerikPopover @ref="@PopoverRef"
                AnchorSelector="@PopoverAnchorSelector"
                Position="@PopoverPosition.Right"
                Offset="20"
                Width="240px"
                Height="140px">
    <PopoverHeader>
        Popover for @ModelInPopup?.Name
    </PopoverHeader>
    <PopoverContent>
        <div style="padding:2em;">
            <TelerikButton OnClick="@( () => PopoverRef?.Hide() )">Hide</TelerikButton>
        </div>
    </PopoverContent>
</TelerikPopover>

@code {
    private List<SampleModel> GridData { get; set; } = new();
    private TelerikPopover? PopoverRef { get; set; }

    private string PopoverAnchorSelector { get; set; } = "#button1";

    private SampleModel? ModelInPopup { get; set; }

    private async Task OnPopupShowButtonClick(GridCommandEventArgs args)
    {
        ModelInPopup = (SampleModel)args.Item;

        PopoverRef?.Hide();
        PopoverAnchorSelector = $"#button{ModelInPopup.Id}";
        await Task.Delay(1);

        PopoverRef?.Show();
    }

    protected override void OnInitialized()
    {
        var rnd = new Random();
        for (int i = 1; i <= 7; i++)
        {
            GridData.Add(new SampleModel()
            {
                Id = i,
                Name = $"Name {i}",
                GroupName = $"Group {i % 3 + 1}",
                Price = rnd.Next(1, 100) * 1.23m,
                Quantity = rnd.Next(0, 1000),
                StartDate = DateTime.Now.AddDays(-rnd.Next(60, 1000)),
                IsActive = i % 4 > 0
            });
        }
    }
    public class SampleModel
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string GroupName { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public object Icon { get; set; } = SvgIcon.File;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool IsActive { get; set; }
    }
}
````

## See Also

* [Grid Overview Documentation](slug:grid-overview)
* [Popover Overview Documentation](slug:popover-overview)
