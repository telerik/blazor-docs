---
title: Click in dropdown closes the Drawer
description: Click in dropdown closes the Drawer
type: troubleshooting
page_title: Click in dropdown closes the Drawer
slug: drawer-kb-click-in-dropdown-closes-drawer
position: 
tags: drawer, dropdown, click, close
ticketid: 1575100
res_type: kb
components: ["drawer"]
---
## Environment

<table>
    <tr>
        <td>Product</td>
        <td>
            Drawer for Blazor,<br />
            <br />
            AutoComplete for Blazor,<br />
            ComboBox for Blazor,<br />
            DropDownList for Blazor,<br />
            MultiColumnComboBox for Blazor,<br />
            MultiSelect for Blazor,<br />
            DatePicker for Blazor,<br />
            DateRangePicker for Blazor,<br />
            DateTimePicker for Blazor,<br />
            TimePicker for Blazor
        </td>
    </tr>
</table>


## Description

I have a DropDownList inside a Drawer. The Drawer uses the Overlay mode. When I click in the dropdown to select an item, the Drawer closes. Click and drag the scrollbar in the dropdown also closes the Drawer.

The same behavior occurs if I place a DatePicker inside a Drawer - click in the calendar popup closes the Drawer.

How I can prevent this? How to keep the Drawer open when selecting items in the dropdown and/or calendar?

## Possible Cause

By design, the popup elements of our components are not rendered in their place of declaration but at root level in the Razor component tree. Thus, when you are using a [DropDownList](slug:components/dropdownlist/overview), for example, its popup is not technically part of the DropDownList component, it is rendered outside of it.

As the popup of the DropDownList is rendered at root level, it is practically outside of the Drawer as well. So, when you click on an item in the dropdown, you are basically clicking outside of the Drawer. By design in [Overlay mode](slug:drawer-modes#overlay-mode), clicking outside of the Drawer container is expected to close the Drawer.

You can verify this yourself using your dev tools to inspect the rendering. You can also test selecting an item from the DropDownList with keyboard navigation only (no click in the popup) - as a result, the Drawer will remain opened as you haven't clicked outside of it, in the DropDownList popup. The same behavior can be observed if you scroll without a click in the scrollbar.

## Solution

To handle the scenario, do one of the following:

* [Use the Push Drawer Mode](#use-the-push-drawer-mode)
* [Use AnimationContainer component](#use-animationcontainer-component)

### Use the Push Drawer Mode 

You may try the Push mode of the Drawer. When this mode is enabled, clicking outside of the Drawer container will not close it. 

This mode, however, introduces different appearance and positioning of the Drawer compared to the Overlay mode. If you'd like to keep the styles of the Overlay mode but prevent the Drawer from closing on click in the popup, try the following:

* Select the [Push mode](slug:drawer-modes#push-mode).
* Customize the Drawer to incorporate the styles of the Overlay mode.

The example below demonstrates the described approach. In this case, the Drawer will not close when you click outside of it, so you may consider some UI option for that. In the sample below, the Drawer contains a close button, for instance.

````RAZOR
<style>
    .custom-drawer.k-drawer-container {
        position: fixed;
        z-index: 10002;
        top: 0;
        left: 0;
        height: 100%;
    }
</style>

@if (DrawerExpanded)
{
    <div class="k-overlay"></div>
}

<TelerikButton OnClick="@(() => DrawerRef.ToggleAsync())" Icon="@SvgIcon.Menu">Open Drawer</TelerikButton>

<TelerikDrawer @ref="@DrawerRef"
               Class="custom-drawer"
               @bind-Expanded="@DrawerExpanded"
               Data="@Data"
               MiniMode="false"
               Mode="@DrawerMode.Push">
    <Template>
        <p> DropDownList in Drawer </p>

        <TelerikDropDownList Data="@DDLData"
                             TextField="MyTextField"
                             ValueField="MyValueField"
                             @bind-Value="DDLValue">
            <DropDownListSettings>
                <DropDownListPopupSettings Height="200px" />
            </DropDownListSettings>
        </TelerikDropDownList>

        <TelerikButton OnClick="@(() => DrawerRef.CollapseAsync())" Icon="@SvgIcon.X">Close Drawer</TelerikButton>
    </Template>
</TelerikDrawer>

@code {
    private bool DrawerExpanded { get; set; } = false;

    private TelerikDrawer<DrawerItem> DrawerRef { get; set; }

    private int DDLValue { get; set; }

    //DropDownList dummy data
    private IEnumerable<MyDdlModel> DDLData = Enumerable.Range(1, 100).Select(x => new MyDdlModel { MyTextField = "item " + x, MyValueField = x });

    public class MyDdlModel
    {
        public int MyValueField { get; set; }
        public string MyTextField { get; set; }
    }

    //Drawer dummy data
    public IEnumerable<DrawerItem> Data { get; set; } = new List<DrawerItem>();

    public class DrawerItem
    {
        public string Text { get; set; }
        public ISvgIcon Icon { get; set; }
        public string Description { get; set; }
    }
}
````

### Use AnimationContainer component 

The [AnimationContainer](slug:components/animationcontainer/overview) allows you to create similar expandable container. You can toggle its visibility through the ShowAsync() and HideAsync() methods. In addition, you can control the size and animation type of the container. If needed, you can copy the styles of an Overlay Drawer to achieve the same look. 

## See Also

* [Prevent Drawer from collapsing on item click](slug:drawer-kb-prevent-collapse)
