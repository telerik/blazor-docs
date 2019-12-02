---
title: Cascading parameter on a razor component inside a Telerik window control - not getting a value set
description: How to get a CascadingParameter Value in a Telerik Window
type: troubleshooting
page_title: CascadingParameter Value null in Window
slug: window-cascading-parameter-null
position: 
tags: 
ticketid: 1444108
res_type: kb
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
I have a number of nested controls and I have a cascading value that encompasses all the controls.  When I put one of my nested components inside a Telerik window then the cascading parameter on said component does not work (it gets value of `null`). 

If I move my component just outside the Telerik window and nothing else -- then the `CascadingParamter` gets the correct value from the `CascadingValue`.

## Cause\Possible Cause(s)
The cause for this behavior is that the Telerik Window renders at the root  of the application, so its contents go out of the context of the original CascadingValue component.

## Solution
The solution is to expose a `CascadingParameter` in the component that hosts the Window, and use a new `CascadingValue` for its contents. This will keep the nesting chain of values unbroken.

>caption Part 1 - topmost component that passes values to its children

````CSHTML
@* sample data - integer in this case for brevity, can be a real model *@

<CascadingValue Value="@MyData" Name="SomeCascadingData">
    <ComponentA />
</CascadingValue>

@code {
    public int MyData { get; set; }

    protected override async Task OnInitializedAsync()
    {
        MyData = new Random().Next(1, 1000);
    }
}
````

>caption Part 2 - ComponentA that hosts the Telerik Window

````CSHTML
@* defines a new CascadingValue that will propagate the data to the WindowContent *@

<h3>ComponentA</h3>

<TelerikButton ButtonType="ButtonType.Button" OnClick="@OpenPopup">OpenPopup</TelerikButton>

<ComponentB></ComponentB>

<TelerikWindow @bind-Visible="@IsSelectorPopupVisible">
    <WindowTitle>
        <strong></strong>
    </WindowTitle>
    <WindowContent>
        <div>
            <CascadingValue Value="@MyData" Name="SomeCascadingData">
                <ComponentB />
            </CascadingValue>
        </div>
    </WindowContent>
    <WindowActions>
        <WindowAction Name="Minimize"></WindowAction>
        <WindowAction Name="Maximize"></WindowAction>
        <WindowAction Name="Close"></WindowAction>
    </WindowActions>
</TelerikWindow>

@code {
    [CascadingParameter(Name = "SomeCascadingData")]
    public int MyData { get; set; }

    public bool IsSelectorPopupVisible { get; set; } = true;

    protected async Task OpenPopup()
    {
        IsSelectorPopupVisible = true;
    }
}
````

>caption Part 3 - ComponentB in the content of the Window consumes the data as usual

````CSHTML
@* In this example we keep the names of the cascading value and parameter the same everywhere, including on the component that hosts the window, so that they are easier to consume down the tree. *@

<h3>ComponentB</h3>

@if (MyData != null)
{
<div>
   The data is : @MyData
</div>
}
else
{
    <div>NO DATA</div>
}

@code {
    [CascadingParameter(Name="SomeCascadingData")]
    public int MyData { get; set; }
}

````


## See Also

* [Window does not update parent]({%slug window-does-not-update-parent%})
* [Window in EditForm Context]({%slug window-in-form-edit-context%})
