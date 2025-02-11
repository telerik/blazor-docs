---
title: Events
page_title: Drawer - Events
description: Events in the Drawer for Blazor.
slug: drawer-events
tags: telerik,blazor,drawer,event,events
published: True
position: 25
---

# Drawer Events

This article explains the events available in the Telerik Drawer for Blazor:

* [`SelectedItemChanged`](#selecteditemchanged)
* [`ExpandedChanged`](#expandedchanged)
* [`OnItemRender`](#onitemrender)


## SelectedItemChanged

The `SelectedItemChanged` event fires every time the user clicks on a new item from the Drawer. You can use it with one-way data binding to respond to the user [selection](slug:drawer-selection). It receives an argument of the Drawer data model type.

>caption Handle SelectedItemChanged event

````RAZOR
@* This example shows how to use one-way data binding for the SelectedItem parameter *@

<TelerikDrawer Data="@Data" Expanded="true" MiniMode="true" Mode="DrawerMode.Push"
               SelectedItem="@selectedItem"
               SelectedItemChanged="((DrawerItem item) => SelectedItemChangedHandler(item))">
    <DrawerContent>
        <div class="text-info">
            Content for the @selectedItem?.Text
        </div>
    </DrawerContent>
</TelerikDrawer>

@code {
    private void SelectedItemChangedHandler(DrawerItem item)
    {
        selectedItem = item;
        // if you don't update the view-model, the event will effectively be cancelled

        Console.WriteLine($"The user selected {item.Text}");
    }

    protected override void OnInitialized()
    {
        //You can preselect an item in the lifecycle methods that the framework provides.
        selectedItem = Data.FirstOrDefault();
        //Here you can use another LINQ expressions like Where() or else depending on your application needs.
    }

    public DrawerItem selectedItem { get; set; }
    public IEnumerable<DrawerItem> Data { get; set; } =
        new List<DrawerItem>
        {
            new DrawerItem { Text = "Counter", Icon = SvgIcon.Plus},
            new DrawerItem { Text = "FetchData", Icon = SvgIcon.GridLayout},
                };

    public class DrawerItem
    {
        public string Text { get; set; }
        public ISvgIcon Icon { get; set; }
    }
}
````


## ExpandedChanged

The `ExpandedChanged` event fires every time the component's state is changed - to expanded or to collapsed. You can use it with one-way data binding for the `Expanded` parameter. It takes an argument of the `bool` type that corresponds to its new state - whether the drawer is expanded.

>tip If you only need conditional markup based on the expanded/collapsed state of the drawer, use two-way binding (`@bind-Expanded`) - in this example, hiding the button conditionally can be achieved either way, but two-way binding requires less code.

>caption Handle ExpandedChanged event

````RAZOR
@* This example shows how to use one-way data binding for the Expanded parameter and show/hide the Expand Drawer button based on the value of Expanded *@

@if (!Expanded)
{
    <TelerikButton OnClick="@(() => DrawerRef.ExpandAsync())" Icon="@SvgIcon.Menu">Expand Drawer</TelerikButton>
}

<TelerikDrawer Expanded="@Expanded"
               ExpandedChanged="((bool newValue) => ExpandedChangedHandler(newValue))"
               Data="@Data"
               MiniMode="true"
               Mode="@DrawerMode.Push"
               @bind-SelectedItem="@selectedItem"
               @ref="@DrawerRef">
    <DrawerContent>
        <div class="text-info">
            Content for the @selectedItem?.Text
        </div>
    </DrawerContent>
</TelerikDrawer>

@code {
    private void ExpandedChangedHandler(bool value)
    {
        Expanded = value;
        // if you don't update the view-model, the event will be effectively cancelled

        Console.WriteLine(string.Format("the user {0} the drawer.", Expanded ? "expanded" : "collapsed"));
    }

    public TelerikDrawer<DrawerItem> DrawerRef { get; set; }
    public DrawerItem selectedItem { get; set; }
    public bool Expanded { get; set; } = true;
    public IEnumerable<DrawerItem> Data { get; set; } =
        new List<DrawerItem>
            {
            new DrawerItem { Text = "Counter", Icon = SvgIcon.Plus},
            new DrawerItem { Text = "FetchData", Icon = SvgIcon.GridLayout},
             };

    public class DrawerItem
    {
        public string Text { get; set; }
        public ISvgIcon Icon { get; set; }
    }
}
````
>caption The result from the code snippet above

![drawer expandedchanged example](images/drawer-expandedchanged-example.gif)

@[template](/_contentTemplates/common/general-info.md#event-callback-can-be-async)

@[template](/_contentTemplates/common/issues-and-warnings.md#valuechanged-lambda-required)

## OnItemRender

The `OnItemRender` event fires when each item in the Drawer renders. It allows you to customize the appearance of an item. Note that the event does not work alongside a [`<Template>`](slug:drawer-templates#template), as the template disables all item related built-in features of the Drawer.

As an argument, the event handler receives an object of type `DrawerItemRenderEventArgs` that contains the following properties: 

| Property | Type | Description |
| --- | --- | --- |
| `Item` | `object` | The current item that renders in the Drawer. |
| `Class` | `string` | The custom CSS class that will be added to the item. |

>caption Customizing the appearance of the Drawer items based on the Drawer mode.

````RAZOR
@* Click on the Toggle button to change the items' classes and Drawer mode. *@

<TelerikButton OnClick="@(() => DrawerRef.ToggleAsync())"
               Icon="@SvgIcon.Menu">Toggle drawer</TelerikButton>
<TelerikDrawer @ref="@DrawerRef"
               Data="@Data"
               MiniMode="true"
               Mode="@DrawerMode.Push"
               OnItemRender="OnItemRenderHandler">
</TelerikDrawer>

<style>
    .mini-class {
        background-color: dodgerblue;
    }
    .default-class {
        background-color: crimson;
    }
    .mini-class:hover{
        background-color: aqua;
    }
    .default-class:hover{
        background-color: red;
    }
</style>

@code {
    private TelerikDrawer<DrawerItem> DrawerRef { get; set; }

    private IEnumerable<DrawerItem> Data { get; set; } =
        new List<DrawerItem>
        {
            new DrawerItem { Text = "Counter", Icon = SvgIcon.Plus },
            new DrawerItem { Text = "FetchData", Icon = SvgIcon.GridLayout },
        };

    private void OnItemRenderHandler(DrawerItemRenderEventArgs args)
    {
        if(DrawerRef.Expanded)
        {
            args.Class = "mini-class";
        }
        else
        {
            args.Class = "default-class";    
        }
    }

    public class DrawerItem
    {
        public string Text { get; set; }
        public ISvgIcon Icon { get; set; }
    }
}
````

## See Also

* [Drawer Demos](https://demos.telerik.com/blazor-ui/drawer/overview)
