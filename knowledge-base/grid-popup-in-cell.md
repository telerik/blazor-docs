---
title: How to Display a Popup in a Grid Cell
description: Learn how to display a popup beside an icon embedded in a cell of the Grid for Blazor.
type: how-to
page_title: How to Display Popup Next to Icon in Grid for Blazor
slug: grid-kb-popup-in-cell
tags: grid, blazor, popup, cell
res_type: kb
ticketid: 1689992, 1640846
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

I want to display a Popup beside an icon embedded within a cell in the [Grid for Blazor](slug:grid-overview). The Popup should appear when the icon is clicked.

## Solution

To display a Popup within a grid cell:

1. Define a dictionary to store references to all popups associated with the Grid items. This ensures that each Popup has a unique identifier tied to its corresponding item.

2. Use the `AnchorSelector` parameter of the `TelerikPopup` component to dynamically associate each popup with its corresponding icon. Set the `AnchorSelector` to the unique ID of the icon element.

Here is an example implementation:

````RAZOR
<TelerikGrid Data="@GridData"
             TItem="@SampleModel"
             Pageable="true"
             Sortable="true"
             FilterMode="GridFilterMode.FilterRow">
    <GridColumns>
        <GridColumn Field="@nameof(SampleModel.Name)">
            <Template>
                @{
                    var dataItem = (SampleModel)context;
                    if (!PopupRefs.ContainsKey(dataItem.Id))
                    {
                        PopupRefs.Add(dataItem.Id, null);
                    }
                }
                <TelerikButton Id="@( $"button{dataItem.Id}" )" Icon="@SvgIcon.DocumentManager"
                               OnClick="@( () => PopupRefs[dataItem.Id]?.Show() )" />
                <TelerikPopup @ref="@PopupRefs[dataItem.Id]"
                              AnchorSelector="@( $"#button{dataItem.Id}" )"
                              AnchorHorizontalAlign="@PopupAnchorHorizontalAlign.Right"
                              AnchorVerticalAlign="@PopupAnchorVerticalAlign.Top"
                              HorizontalAlign="@PopupHorizontalAlign.Left"
                              VerticalAlign="@PopupVerticalAlign.Top"
                              Width="240px"
                              Height="140px">
                    <div style="padding:2em;">
                        Popup for item
                        <TelerikButton OnClick="@( () => PopupRefs[dataItem.Id]?.Hide() )">Hide Popup for @dataItem.Name</TelerikButton>
                    </div>
                </TelerikPopup>
            </Template>
        </GridColumn>
        <GridColumn Field="@nameof(SampleModel.Price)" />
        <GridColumn Field="@nameof(SampleModel.Quantity)" />
    </GridColumns>
</TelerikGrid>

@code {
    private List<SampleModel> GridData { get; set; } = new();
    private Dictionary<int, TelerikPopup?> PopupRefs { get; set; } = new();

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
* [Popup Overview Documentation](slug:popup-overview)
