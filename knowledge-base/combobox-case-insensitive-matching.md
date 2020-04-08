---
title: Case Insensitive Matching with Custom Values
description: How to perform Case Insensitive Matching in ComboBox
type: how-to
page_title: Case Insensitive Matching
slug: combobox-kb-case-insensitive-matching
position:
tags:
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

This article showcases how to match case insensitive user input with the `AllowCustom` parameter of the ComboBox set to `true`.

## Solution

Depending on your business logic and application workflow you need to use either [OnChange]({%slug components/combobox/events%}#onchange) or [ValueChanged]({%slug components/combobox/events%}#valuechanged) events of the ComboBox. In the event handler you can use a `Where()` statement to filter out the result. In case you want the filter to be applied on every keystroke of the user input - use `ValueChanged`, otherwise use `OnChange` event.

>caption How to filter out a result with case insensitive user input while using the `OnChange` event

````
@* Observe the behavior of the filtering the result when the ComboBox loses focus or the Enter key is pressed *@

<TelerikComboBox Data="@myComboboxData"
                 Value="@Result"
                 OnChange="@ChangedHandler"
                 TextField="MyTextField"
                 ValueField="MyTextField"
                 AllowCustom="true" />

<p>
    @Result
</p>

@code {
    public List<Combo> myComboboxData { get; set; }
    public string Result { get; set; }

    public void ChangedHandler(object userInput)
    {
        var stringInput = (userInput as string).ToLower();
        var matchingItem = myComboboxData.Where(x => x.MyTextField.ToLower() == stringInput).FirstOrDefault();
        Result = matchingItem.MyTextField;
    }

    protected override void OnInitialized()
    {
        myComboboxData = new List<Combo>()
        {
            new Combo("ABC Customer"),
            new Combo("TexT"),
            new Combo("ComBobOx Data")
        };

        base.OnInitialized();
    }

    public class Combo
    {
        public string MyTextField { get; set; }

        public Combo(string text)
        {
            MyTextField = text;
        }
    }
}
````
>caption How to filter out a result with case insensitive user input while using the `ValueChanged` event.

````
@* Observe the behavior of the filtering the result when the user presses a key *@

<TelerikComboBox Data="@myComboboxData"
                 ValueChanged="@((string input) => ChangedHandler(input))"
                 TextField="MyTextField"
                 ValueField="MyTextField"
                 AllowCustom="true" />

<p>
    @Result
</p>

@code {
    public List<Combo> myComboboxData { get; set; }
    public string Result { get; set; }

    public void ChangedHandler(string userInput)
    {
        userInput = userInput.ToLower();
        var matchingItem = myComboboxData.Where(x => (x.MyTextField.ToLower()).Contains(userInput)).FirstOrDefault();
        Result = matchingItem.MyTextField;
    }

    protected override void OnInitialized()
    {
        myComboboxData = new List<Combo>()
        {
            new Combo("ABC Customer"),
            new Combo("TexT"),
            new Combo("ComBobOx Data")
        };

        base.OnInitialized();
    }

    public class Combo
    {
        public string MyTextField { get; set; }

        public Combo(string text)
        {
            MyTextField = text;
        }
    }
}
````
