---
title: Clear button event
description: How to get an event for the clear button click
type: how-to
page_title: Clear button event
slug: combobox-kb-clear-button-click
position: 
tags: 
ticketid: 1513072
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
Is there any event that fires when you click the clear button on the combox box?

There doesn't seem to be any event attached to the clear action, I would like to catch this event to reset the list, but there is nothing to catch it appear until you click outside of the box (Blur).

## Solution
You can use the `ValueChanged` event for an immediate response, or the `OnChange` event if it is OK for you to wait for the user to confirm this choice (it happens when they press Enter or blur the input).

What you need to do is to check if the new value that comes in is the `default` for the value type. The code snippet below showcases two ways to do that for different binding scenarios and value types.

>caption Get an event for the Clear button

````CSHTML
Monitor the console to see when the events fire in these examples. You can use only one of the events, this sample showcases both so you can see the options.

<TelerikComboBox Data="@MyList" ClearButton="true"
                 Value="@MyItem" ValueChanged="@( (string v) => MyValueChangeHandlerString(v) )"
                 OnChange="@OnChangeHandlerString">
</TelerikComboBox>

@code {
    string MyItem { get; set; } = "second";
    void MyValueChangeHandlerString(string theUserChoice)
    {
        //you have to update the model manually because handling the ValueChanged event does not let you use @bind-Value
        //if you do not use ValueChanged, you can keep using two-way binding
        MyItem = theUserChoice;

        Console.WriteLine($"ValueChanged string: user cleared the input: {string.IsNullOrEmpty(MyItem)}");
    }

    void OnChangeHandlerString(object newValue)
    {
        Console.WriteLine($"OnChange string: user cleared the input: {MyItem == default(string)}");
    }

    List<string> MyList = new List<string>() { "first", "second", "third" };

}

<hr />

<TelerikComboBox Data="@myDdlData" TextField="MyTextField" ValueField="MyValueField" ClearButton="true"
                 Value="@selectedValue" ValueChanged="@( (int v) => MyValueChangeHandlerInt(v) )"
                 OnChange="@OnChangeHandlerInt">
</TelerikComboBox>

@code {
    int selectedValue { get; set; } = 2;

    void MyValueChangeHandlerInt(int theUserChoice)
    {
        //you have to update the model manually because handling the ValueChanged event does not let you use @bind-Value
        //if you do not use ValueChanged, you can keep using two-way binding
        selectedValue = theUserChoice;

        Console.WriteLine($"ValueChanged int: user cleared the input: {selectedValue == default(int)}");
    }

    void OnChangeHandlerInt(object newValue)
    {
        Console.WriteLine($"OnChange int: user cleared the input: {selectedValue == default(int)}");
    }

    IEnumerable<MyDdlModel> myDdlData = Enumerable.Range(1, 20).Select(x => new MyDdlModel { MyTextField = "item " + x, MyValueField = x });

    public class MyDdlModel
    {
        public int MyValueField { get; set; }
        public string MyTextField { get; set; }
    }
}
````

## See Also
[ComboBox Events]({%slug components/combobox/events%})
