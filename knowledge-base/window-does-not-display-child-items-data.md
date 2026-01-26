---
title: The Window Does Not Display Its Child Items Data
description: How to ensure displaying the child items data within a Window.
type: troubleshooting
page_title: The Window Does Not Display Its Child Items Data
slug: window-kb-does-not-display-child-items-data
position: 
tags: window, display, child, items, empty, data
ticketid: 1602103
res_type: kb
components: ["window"]
---
## Environment

<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Window for Blazor</td>
		</tr>
	</tbody>
</table>


## Description

If you have a component, such as DropDownList, nested within a Telerik Window, you may see a situation where the DropDownList items appear blank. The Window does not display its child component data in scenarios like this.

## Cause

The reason for the issue is that the child component receives its data after the Window becomes visible.

## Solution

Refresh the Window through its `Refresh()` method—this will update the component's UI, and the data will appear.

This example demonstrates the usage of the Window's `Refresh()` method, ensuring the display of child items' data.

>caption DropDownList inside a Window

`````RAZOR
<TelerikWindow @ref="@WindowRef" @bind-Visible="@WindowIsVisible">
    <WindowTitle>
        Window Title
    </WindowTitle>
    <WindowContent>
        <TelerikDropDownList Data="@myDdlData" TextField="MyTextField" ValueField="MyValueField" @bind-Value="@selectedValue">
        </TelerikDropDownList>
    </WindowContent>
    <WindowActions>
        <WindowAction Name="Close" />
    </WindowActions>
</TelerikWindow>

<TelerikButton OnClick="@( () => WindowIsVisible = !WindowIsVisible )">Toggle window</TelerikButton>

@code {
    TelerikWindow WindowRef;
    bool WindowIsVisible { get; set; } = true;

    IEnumerable<MyDdlModel> myDdlData { get; set; }
    int selectedValue { get; set; } = 3;

    //This simulates receiving the data after the Window becomes visible.
    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            await Task.Delay(1500);

            await LoadData();

            WindowRef.Refresh(); //This line refreshes the Window instance.
        }
    }
    //=====

    public class MyDdlModel
    {
        public int MyValueField { get; set; }
        public string MyTextField { get; set; }
    }

    async Task LoadData()
    {
        myDdlData = Enumerable.Range(1, 20).Select(x => new MyDdlModel { MyTextField = "item " + x, MyValueField = x });
    }
}
`````
