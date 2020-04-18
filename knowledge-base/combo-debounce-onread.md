---
title: Debounce custom filter calls, implement min filter length
description: how to debounce the custom server filter service calls and to implement min filter length
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

I also want to implement a minimum filter length, if the input is below that length, the servive won't be called.

## Solution

Implement logic in the [OnRead event]({%slug components/combobox/events%}#onread) that will debounce the calls to the service with the desired timeout. For example, use a `CancellationTokenSource`.

For min filter length, just add a check in the handler for the desired string length (in this example - 2 symbols).

>caption Use a `CancellationTokenSource` to debounce OnRead filter calls in the combo box. Add Min Filter Length

````CSHTML
@using System.Threading

@SelectedValue
<br />
<TelerikComboBox Data="@Options"
                 OnRead="@ReadItems"
                 Filterable="true"
                 Placeholder="Find what you seek by typing"
                 @bind-Value="@SelectedValue">
</TelerikComboBox>

@code{
    public string SelectedValue { get; set; }
    List<string> Options { get; set; } = new List<string>();
    CancellationTokenSource tokenSource = new CancellationTokenSource(); // for debouncing the service calls

    async Task RequestData(string userInput, string method)
    {
        // this method calls the actual service (in this case - a local method)
        Options = await GetOptions(userInput, method);
    }

    async Task ReadItems(ComboBoxReadEventArgs args)
    {
        if (args.Request.Filters.Count > 0) // there is user filter input, skips providing data on initialization
        {
            Telerik.DataSource.FilterDescriptor filter = args.Request.Filters[0] as Telerik.DataSource.FilterDescriptor;
            string userInput = filter.Value.ToString();
            string method = filter.Operator.ToString();

            if (userInput.Length > 1) // sample min filter length implementation 
            {
                // debouncing
                tokenSource.Cancel();
                tokenSource.Dispose();

                tokenSource = new CancellationTokenSource();
                var token = tokenSource.Token;

                await Task.Delay(300, token); // 300ms timeout for the debouncing

                //new service request after debouncing
                await RequestData(userInput, method);
            }
        }
        else
        {
            if (Options?.Count < 1)
            {
                // when there is no user input you may still want to provide data
                // in this example we just hardcode a few items, you can either fetch all the data
                // or you can provide some subset of most common items, or something based on the business logic
                Options = new List<string>() { "one", "two", "three" };
            }
        }
    }

    async Task<List<string>> GetOptions(string userInput, string filterOperator)
    {
        Console.WriteLine("service called - debounced so there are fewer calls");
        await Task.Delay(500); // simulate network delay, remove it for a real app

        //sample logic for getting suggestions - here they are generated, you can call a remote service
        //for brevity, this example does not use the filter operator, but your actual service can
        List<string> optionsData = new List<string>();
        for (int i = 0; i < 5; i++)
        {
            optionsData.Add($"option {i} for input {userInput}");
        }

        return optionsData;
    }
````

