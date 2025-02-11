---
title: Debounce custom filter calls, implement min filter length
description: how to debounce the custom server filter service calls and to implement min filter length.
type: how-to
page_title: Debounce OnRead calls, Min Filter Length
slug: combo-kb-debounce-onread
position: 
tags: 
ticketid: 1460897
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>ComboBox for Blazor</td>
		</tr>
	</tbody>
</table>


## Description

I want to specify a debounce time for filtering. This way I can (for example) set the debounce time to 500(ms), and then only have the combo box service filter when the user stops typing.

This can be useful for filtering with remote data - it invokes a filter on every keystroke and network/service delays can cause wrong data display or confusion, in addition to increased service load.

I also want to implement a minimum filter length, if the input is below that length, the service won't be called.

## Solution

There are two ways to implement debouncing:

* Use the built-in [ComboBox `DebounceDelay` parameter](slug:components/combobox/overview#parameters).
* Implement logic in the [ComboBox `OnRead` event](slug:components/combobox/events#onread) to debounce the calls to the data service with the desired timeout. For example, use a `CancellationTokenSource`.

For minimum filter length, add a check in the `OnRead` event handler for the desired string length.

>caption Debounce OnRead filter calls in the ComboBox and add minimum filter length.

````RAZOR
@using System.Threading

@using Telerik.DataSource
@using Telerik.DataSource.Extensions

@implements IDisposable

<p><code>ComboBoxValue</code>: @ComboBoxValue</p>

<p>Debounce inside <code>OnRead</code>:</p>

<TelerikComboBox OnRead="@OnComboBoxRead1"
                 TItem="@ListItem"
                 TValue="@(int?)"
                 @bind-Value="@ComboBoxValue"
                 TextField="@nameof(ListItem.Text)"
                 ValueField="@nameof(ListItem.Id)"
                 Filterable="true"
                 FilterOperator="@StringFilterOperator.Contains"
                 Id="debounce-in-onread"
                 Placeholder="Type 2+ letters or numbers to filter..."
                 ScrollMode="@DropDownScrollMode.Virtual"
                 ItemHeight="32"
                 PageSize="20"
                 ValueMapper="@ComboBoxValueMapper"
                 Width="300px">
</TelerikComboBox>

<p>Use <code>DebounceDelay</code>:</p>

<TelerikComboBox OnRead="@OnComboBoxRead2"
                 TItem="@ListItem"
                 TValue="@(int?)"
                 @bind-Value="@ComboBoxValue"
                 TextField="@nameof(ListItem.Text)"
                 ValueField="@nameof(ListItem.Id)"
                 DebounceDelay="@ComboBoxDebounceDelay"
                 Filterable="true"
                 FilterOperator="@StringFilterOperator.Contains"
                 Id="debounce-delay"
                 Placeholder="Type 2+ letters or numbers to filter..."
                 ScrollMode="@DropDownScrollMode.Virtual"
                 ItemHeight="32"
                 PageSize="20"
                 ValueMapper="@ComboBoxValueMapper"
                 Width="300px">
</TelerikComboBox>

@code {
    private int? ComboBoxValue { get; set; }

    // Data items that show without filtering.
    private List<ListItem> ComboBoxDefaultData { get; set; } = new();

    // All data items.
    private List<ListItem> ComboBoxData { get; set; } = new();

    private const int ComboBoxDebounceDelay = 1000;

    private CancellationTokenSource TokenSource { get; set; } = new();

    private async Task OnComboBoxRead1(ComboBoxReadEventArgs args)
    {
        if (args.Request.Filters.Any())
        {
            // Require user input before making data requests.
            FilterDescriptor filterDescriptor = (FilterDescriptor)args.Request.Filters.First();
            string filterValue = filterDescriptor.Value.ToString() ?? string.Empty;

            // Require at least 2 characters to filter.
            if (filterValue.Length > 1)
            {
                #region Debounce in OnRead

                TokenSource.Cancel();
                TokenSource.Dispose();

                TokenSource = new CancellationTokenSource();
                var token = TokenSource.Token;

                await Task.Delay(ComboBoxDebounceDelay, token);

                #endregion Debounce in OnRead

                // Request data after debouncing.
                var result = await ComboBoxData.ToDataSourceResultAsync(args.Request);

                args.Data = result.Data;
                args.Total = result.Total;
            }
        }
        else
        {
            // Optionally, provide default items before the user has filtered.
            // These can be the most commonly used ones, or all.
            args.Data = ComboBoxDefaultData;
            args.Total = ComboBoxDefaultData.Count;
        }
    }

    private async Task OnComboBoxRead2(ComboBoxReadEventArgs args)
    {
        if (args.Request.Filters.Any())
        {
            // Require user input before making data requests.
            FilterDescriptor filterDescriptor = (FilterDescriptor)args.Request.Filters.First();
            string filterValue = filterDescriptor.Value.ToString() ?? string.Empty;

            // Require at least 2 characters to filter.
            if (filterValue.Length > 1)
            {
                // Request data after debouncing
                var result = await ComboBoxData.ToDataSourceResultAsync(args.Request);

                args.Data = result.Data;
                args.Total = result.Total;
            }
        }
        else
        {
            // Optionally, provide default items before the user has filtered.
            // These can be the most commonly used ones, or all.
            args.Data = ComboBoxDefaultData;
            args.Total = ComboBoxDefaultData.Count;
        }
    }

    private async Task<ListItem?> ComboBoxValueMapper(int? itemValue)
    {
        // Simulate network delay.
        await Task.Delay(50);

        return ComboBoxData.FirstOrDefault(x => x.Id == itemValue);
    }

    protected override void OnInitialized()
    {
        int frequentItems = 5;
        int allItems = 3000;

        for (int i = 1; i <= frequentItems; i++)
        {
            var item = new ListItem()
            {
                Id = i,
                Text = $"Initial Item {i} {RandomChar()}{RandomChar()}{RandomChar()}"
            };

            ComboBoxDefaultData.Add(item);
            ComboBoxData.Add(item);
        }

        for (int i = frequentItems + 1; i <= allItems; i++)
        {
            var item = new ListItem()
            {
                Id = i,
                Text = $"Item {i} {RandomChar()}{RandomChar()}{RandomChar()}"
            };

            ComboBoxData.Add(item);
        }

        base.OnInitialized();
    }

    private char RandomChar()
    {
        return (char)Random.Shared.Next(65, 91);
    }

    public void Dispose()
    {
        try
        {
            TokenSource.Dispose();
        }
        catch { }
    }

    public class ListItem
    {
        public int Id { get; set; }
        public string Text { get; set; } = string.Empty;
    }
}
````
