---
title: Rebind Grid from Timer
description: How to rebind the Grid and other Blazor components with a Timer
type: how-to
page_title: Rebind Grid from Timer
slug: common-kb-rebind-timer
position: 
tags: grid, rebind, onread
ticketid: 1492710, 1572037, 1579829, 1584795, 1586675
res_type: kb
components: ["grid"]
---
## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>
                AutoComplete for Blazor, <br />
                ComboBox for Blazor, <br />
                DropDownList for Blazor, <br />
                Grid for Blazor, <br />
                ListView for Blazor, <br />
                MultiColumnComboBox for Blazor, <br />
                MultiSelect for Blazor, <br />
                TreeList for Blazor, <br />
                TreeView for Blazor
            </td>
        </tr>
    </tbody>
</table>

## Description

How to rebind a Grid component from a Timer?

How to refresh the component data after a few seconds with a Timer?

## Solution

1. Use a [`System.Timers.Timer`](https://learn.microsoft.com/en-us/dotnet/api/system.timers.timer).
1. Define an `Elapsed` event handler.
1. When [binding via `Data` parameter](slug:common-features-data-binding-overview), the `Elapsed` event handler should [reset the collection reference or call the `Rebind` method](slug:common-features-data-binding-overview#refresh-data) of the component(s).
1. When [binding via `OnRead` event](slug:common-features-data-binding-onread), the `Elapsed` event handler should [call the `Rebind` method](slug:common-features-data-binding-onread#refresh-data) of the component(s) via [`InvokeAsync`](https://stackoverflow.com/questions/65230621/statehaschanged-vs-invokeasyncstatehaschanged-in-blazor).
1. Be aware of [Blazor Tread Safety](https://blazor-university.com/components/multi-threaded-rendering/invokeasync/). 

>caption Rebind Telerik Blazor components with Timer

````RAZOR
@using System.Timers
@using Telerik.DataSource.Extensions

@implements IDisposable

<h1>Rebind with Timer</h1>

<TelerikButton ThemeColor="@ThemeConstants.Button.ThemeColor.Primary"
               OnClick="@RebindComponents">Rebind Manually</TelerikButton>
or wait 2 seconds...

<br />
<br />
The first data item is: @DropDownData.FirstOrDefault()?.Text

<TelerikStackLayout Orientation="@StackLayoutOrientation.Horizontal" Spacing="20px">
    <div>
        <h2>OnRead Event</h2>

        <TelerikDropDownList @ref="@DropDownRef"
                             OnRead="@OnDropDownRead"
                             TItem="@SampleModel"
                             TValue="@int"
                             @bind-Value="@DropDownValue"
                             ValueField="@nameof(SampleModel.Id)"
                             TextField="@nameof(SampleModel.Text)"
                             Width="200px">
            <ValueTemplate>
                @context.Id : @context.Text
            </ValueTemplate>
            <ItemTemplate>
                @context.Id : @context.Text
            </ItemTemplate>
        </TelerikDropDownList>

        <br /><br />

        <TelerikGrid @ref="@GridRef"
                     OnRead="@OnGridRead"
                     TItem="@SampleModel"
                     AutoGenerateColumns="true"
                     Sortable="true"
                     Pageable="true"
                     PageSize="3"
                     Width="90%" />
    </div>
    <div>
        <h2>Data Parameter</h2>

        <TelerikDropDownList Data="@DropDownData"
                             TItem="@SampleModel"
                             TValue="@int"
                             @bind-Value="@DropDownValue"
                             ValueField="@nameof(SampleModel.Id)"
                             TextField="@nameof(SampleModel.Text)"
                             Width="200px">
            <ValueTemplate>
                @context.Id : @context.Text
            </ValueTemplate>
            <ItemTemplate>
                @context.Id : @context.Text
            </ItemTemplate>
        </TelerikDropDownList>

        <br /><br />    

        <TelerikGrid Data="@GridData"
                     TItem="@SampleModel"
                     AutoGenerateColumns="true"
                     Sortable="true"
                     Pageable="true"
                     PageSize="3"
                     Width="90%" />
    </div>
</TelerikStackLayout>

@code {
    private TelerikGrid<SampleModel> GridRef { get; set; }
    private TelerikDropDownList<SampleModel, int> DropDownRef { get; set; }

    private List<SampleModel> GridData { get; set; }
    private List<SampleModel> DropDownData { get; set; }

    private int DropDownValue { get; set; } = 1;

    private Timer Timer { get; set; } = new Timer();

    private void RebindComponents()
    {
        GenerateData();

        GridRef.Rebind();
        DropDownRef.Rebind();
    }

    private async Task OnGridRead(GridReadEventArgs args)
    {
        await Task.Delay(100); // simulate network delay

        var result = GridData.ToDataSourceResult(args.Request);

        args.Data = result.Data;
        args.Total = result.Total;
    }

    private async Task OnDropDownRead(DropDownListReadEventArgs args)
    {
        await Task.Delay(100); // simulate network delay

        var result = DropDownData.ToDataSourceResult(args.Request);

        args.Data = result.Data;
        args.Total = result.Total;
    }

    protected override void OnAfterRender(bool firstRender)
    {
        if (Timer.Enabled == false)
        {
            Timer.Interval = 2000;
            Timer.Elapsed -= OnTimerElapsed;
            Timer.Elapsed += OnTimerElapsed;
            Timer.Start();
        }
    }

    private void OnTimerElapsed(Object source, ElapsedEventArgs e)
    {
        // the OnRead binding mechanism requires InvokeAsync
        InvokeAsync(RebindComponents);

        // call StateHasChanged only if necessary
        //InvokeAsync(StateHasChanged);
    }

    private void GenerateData()
    {
        GridData = new List<SampleModel>();
        DropDownData = new List<SampleModel>();

        var rnd = new Random();

        for (int i = 1; i <= 10; i++)
        {
            var rndNumber = rnd.Next(1, 100);

            GridData.Add(new SampleModel() { Id = i, Text = $"Text {rndNumber}" });
            DropDownData.Add(new SampleModel() { Id = i, Text = $"Text {rndNumber}" });
        }
    }

    protected override void OnInitialized()
    {
        GenerateData();

        base.OnInitialized();
    }

    public void Dispose()
    {
        Timer?.Stop();
        Timer?.Close();
    }

    public class SampleModel
    {
        public int Id { get; set; }
        public string Text { get; set; }
    }
}
````

## Notes

We recommend using [`System.Timers.Timer` instead of `System.Threading.Timer` in Blazor](https://stackoverflow.com/questions/19577296/thread-safety-of-system-timers-timer-vs-system-threading-timer).

When the DropDownList is bound via `Data`, its dropdown will not refresh automatically if it is open during the rebind. This is because all our popups are rendered outside the Razor component that defines them. The limitation does not exist with [`OnRead` data binding](slug:common-features-data-binding-onread), because then the UI refresh does not rely on the Blazor component life cycle.

## See Also

* [Component Data Binding Overview](slug:common-features-data-binding-overview)
* [Data Binding with OnRead event](slug:common-features-data-binding-onread)
* [Blazor Tread Safety](https://blazor-university.com/components/multi-threaded-rendering/invokeasync/)
