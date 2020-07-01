---
title: Case Insensitive Matching with Custom Values
description: How to perform Case Insensitive Matching in ComboBox.
type: how-to
page_title: Case Insensitive Matching
slug: combobox-kb-case-insensitive-matching
position:
tags:
ticketid: 1460581
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

This article showcases how to match case insensitive user input with the `AllowCustom` parameter of the ComboBox set to `true` to the data source items.

## Solution

Depending on your business logic and application workflow you need to use either [OnChange]({%slug components/combobox/events%}#onchange) or [ValueChanged]({%slug components/combobox/events%}#valuechanged) events of the ComboBox.

In the event handler you can use a `Where()` statement to filter out the result. In case you want the filter to be applied on every keystroke of the user input - use `ValueChanged`, otherwise use `OnChange` event. There are examples of both below.

>caption How to filter out a result with case insensitive user input while using the `OnChange` event

````CSHTML
@* Observe the behavior of the filtering the result when the ComboBox loses focus or the Enter key is pressed *@
<p>
    @TheValue
</p>

<TelerikComboBox Data="@myComboboxData"
                 Value="@TheValue"
                 OnChange="@ChangedHandler"
                 TextField="MyTextField"
                 ValueField="MyTextField"
                 AllowCustom="true"
                 Placeholder="Type 'text' and press Enter">
</TelerikComboBox>

@code {
    public List<ComboItem> myComboboxData { get; set; }
    public string TheValue { get; set; }

    public void ChangedHandler(object userInput)
    {
        var stringInput = (userInput as string).ToLower();
        // you can implement business logic here - contains filter instear of equals, for example
        var matchingItem = myComboboxData.Where(x => x.MyTextField.ToLower() == stringInput).FirstOrDefault();
        TheValue = matchingItem.MyTextField;
    }

    protected override void OnInitialized()
    {
        myComboboxData = new List<ComboItem>()
        {
            new ComboItem("ABC Customer"),
            new ComboItem("TexT"),
            new ComboItem("ComBobOx Data")
        };

        base.OnInitialized();
    }

    public class ComboItem
    {
        public string MyTextField { get; set; }

        public ComboItem(string text)
        {
            MyTextField = text;
        }
    }
}
````
>caption How to filter out a result with case insensitive user input while using the `ValueChanged` event.

````CSHTML
@* Observe the behavior of the filtering the result when the user presses a key *@
<p>
    @TheValue
</p>

<TelerikComboBox Data="@myComboboxData"
                 ValueChanged="@((string input) => ChangedHandler(input))"
                 TextField="MyTextField"
                 ValueField="MyTextField"
                 AllowCustom="true"
                 Placeholder="start typing 'data'">
</TelerikComboBox>

@code {
    public List<ComboItem> myComboboxData { get; set; }
    public string TheValue { get; set; }

    public void ChangedHandler(string userInput)
    {
        userInput = userInput.ToLower();
        // you can implement the business logic here - e.g., Equals filter instead of contains
        // note: the Value of the combobox is not used right now becaues setting it here will overwrite the user input
        var matchingItem = myComboboxData.Where(x => (x.MyTextField.ToLower()).Contains(userInput)).FirstOrDefault();
        TheValue = matchingItem.MyTextField;
    }

    protected override void OnInitialized()
    {
        myComboboxData = new List<ComboItem>()
        {
            new ComboItem("ABC Customer"),
            new ComboItem("TexT"),
            new ComboItem("ComBobOx Data")
        };

        base.OnInitialized();
    }

    public class ComboItem
    {
        public string MyTextField { get; set; }

        public ComboItem(string text)
        {
            MyTextField = text;
        }
    }
}
````
