---
title: ComboBox in Grid FilterMenuTemplate is Empty the First Time it is Opened
description: The ComboBox in a Grid filter menu template is blank and has no data when opened for the first time.
type: troubleshooting
page_title: ComboBox in Grid Filter Menu Template Has no Data When Opened the First Time
slug: grid-kb-combobox-in-filtermenu-empty
position: 
tags: telerik, blazor, grid, filtermenu, template, combobox
ticketid: 1522512
res_type: kb
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
I have a ComboBox in a Grid `FilterMenuTemplate`. The ComboBox data is loaded asynchronously. The first time I open it, the dropdown is empty and reads and *No Data*. The second time the ComboBox is opened, the data shows as expected.

## Cause\Possible Cause(s)
The behavior is related to the filter menu popup. It is rendered outside the Grid component in the page `<body>`. If the ComboBox data is loaded asynchronously, the popup is not refreshed even by `StateHasChanged`.

## Suggested Workarounds
* Load the ComboBox data before the filter menu is opened for the first time. Use Blazor events like `OnInitializedAsync`, or Grid events like [**OnStateInit**]({% slug grid-state %}#events) or [OnRead]({% slug grid-events %}#read-event).
* Load the ComboBox data synchronously.
* If needed, it is possible to enable Grid filtering with a delay, after the ComboBox data has been loaded.

Here is a test page that loads the `FilterMenuTemplate` data in `OnRead` and enables Grid filtering afterwards:

```razor
<TelerikGrid Data="@Vehicles"
             OnRead="@ReadVehicles"
             FilterMode="@FlexibleFilterMode">
    <GridColumns>
        <GridColumn Field="@nameof(VehicleModel.Make)" Title="Vehicle Make">
            <FilterMenuTemplate>
                <TelerikComboBox Data="@VehicleMakes"
                                 Value="string.Empty">
                </TelerikComboBox>
            </FilterMenuTemplate>
        </GridColumn>
    </GridColumns>
</TelerikGrid>

@code {

    private List<string> VehicleMakes { get; set; } = new List<string>();

    private List<VehicleModel> Vehicles { get; set; }

    private GridFilterMode FlexibleFilterMode { get; set; } = GridFilterMode.None;

    async Task ReadVehicles(GridReadEventArgs args)
    {
        Vehicles = new List<VehicleModel>() {
            new VehicleModel { VehicleID = 1, Make = "Honda" }
        };

        await this.RefreshMakesAsync();
    }

    private async Task RefreshMakesAsync()
    {
        await Task.Delay(1000);
        VehicleMakes = new List<string>() { "Honda" };
        FlexibleFilterMode = GridFilterMode.FilterMenu;
    }

    public class VehicleModel
    {
        public int VehicleID { get; set; }
        public string Make { get; set; }
    }
}
```

Here is a test page that reproduces the issue and shows the possible workarounds with synchronous ComboBox data load, or asynchronous load in `OnInitializedAsync`.

```razor
<TelerikGrid Data="@Vehicles"
             FilterMode="@GridFilterMode.FilterMenu">
    <GridColumns>
        <GridColumn Field="@nameof(VehicleModel.Make)" Title="Vehicle Make">
            <FilterMenuTemplate>
                <TelerikComboBox Data="@VehicleMakes"
                                 OnRead="@OnReadMakes"
                                 Value="string.Empty">
                </TelerikComboBox>
            </FilterMenuTemplate>
        </GridColumn>
    </GridColumns>
</TelerikGrid>

@code {

    private List<string> VehicleMakes { get; set; } = new List<string>();

    private List<VehicleModel> Vehicles { get; set; } = new List<VehicleModel>() {
        new VehicleModel { VehicleID = 1, Make = "Honda" }
    };

    async Task OnReadMakes(ComboBoxReadEventArgs args)
    {
        if (!VehicleMakes.Any())
        {
            await this.RefreshMakesAsync();
            this.StateHasChanged();
        }
    }

    async Task RefreshMakesAsync()
    {
        // Comment next line to load the ComboBox data synchronously.
        await Task.Delay(1);
        VehicleMakes = new List<string>() { "Honda" };
    }

    protected override Task OnInitializedAsync()
    {
        // Uncomment next line to load the ComboBox data before the filter menu is opened.
        //VehicleMakes = new List<string>() { "Honda" };

        return base.OnInitializedAsync();
    }

    public class VehicleModel
    {
        public int VehicleID { get; set; }
        public string Make { get; set; }
    }
}
```
