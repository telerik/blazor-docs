---
title: Overview
page_title: ListBox - Overview
description: Overview of the ListBox for Blazor and its features and parameters.
slug: listbox-overview
tags: telerik,blazor,listbox
published: True
position: 0
---

# Blazor ListBox Overview

The <a href = "https://www.telerik.com/blazor-ui/listbox" target="_blank">ListBox for Blazor</a> is an enhanced version of the HTML `<select multiple>` element. The ListBox provides many additional features such as item reordering, item removal, and moving items from one ListBox to another through toolbar buttons or drag-and-drop. The ListBox also allows single or multiple item selection and will show a vertical scrollbar automatically if the items don't fit. The component features templates to customize its rendering.


## Creating Blazor ListBox

To use a Telerik ListBox for Blazor:

1. Add the `TelerikListBox` tag.
1. Set the `Data` parameter to an `IEnumerable<T>`.
1. Set `TextField` to the property name that holds the string values to display in the ListBox. Skip this step when [binding the component to a collection of strings or value type data](#data-binding).
1. Set `SelectedItems` to an `IEnumerable<T>` to store or change the component selection. Optionally, [enable multiple selection](slug:listbox-selection).
1. Configure the [ListBox toolbar](slug:listbox-toolbar) in `<ListBoxToolBarSettings>` and specify which buttons will be visible. By default, the toolbar shows all buttons. Each button requires an [event handler](slug:listbox-events) to work.
1. (optional) Set the `Width` and `Height` parameters, based on the number of toolbar buttons and desired number of visible items. The component will automatically show a vertical scrollbar if needed. Long items will wrap.
1. Set the `@ref` attribute and obtain [reference to the ListBox instance](#listbox-reference-and-methods). This is necessary to [`Rebind()` the component after programmatic data changes](slug:common-features-data-binding-overview#refresh-data).

>caption Basic Blazor ListBox

````RAZOR
@* ListBox with item selection and reordering *@

<TelerikListBox @ref="@ListBoxRef"
                Data="@ListBoxData"
                TextField="@nameof(ListBoxModel.Name)"
                SelectionMode="@ListBoxSelectionMode.Multiple"
                @bind-SelectedItems="@ListBoxSelectedItems"
                OnReorder="@( (ListBoxReorderEventArgs<ListBoxModel> args) => OnListBoxReorder(args) )"
                Width="180px"
                Height="auto">
    <ListBoxToolBarSettings>
        <ListBoxToolBar>
            <ListBoxToolBarMoveUpTool />
            <ListBoxToolBarMoveDownTool />
        </ListBoxToolBar>
    </ListBoxToolBarSettings>
</TelerikListBox>

@code {
    private TelerikListBox<ListBoxModel> ListBoxRef { get; set; } = null!;

    private List<ListBoxModel> ListBoxData { get; set; } = new List<ListBoxModel>();

    private IEnumerable<ListBoxModel> ListBoxSelectedItems { get; set; } = new List<ListBoxModel>();

    private void OnListBoxReorder(ListBoxReorderEventArgs<ListBoxModel> args)
    {
        ListBoxData.RemoveAll(x => args.Items.Contains(x));
        ListBoxData.InsertRange(args.ToIndex, args.Items);

        ListBoxRef.Rebind();
    }

    protected override void OnInitialized()
    {
        for (int i = 1; i <= 7; i++)
        {
            ListBoxData.Add(new ListBoxModel()
            {
                Id = i,
                Name = $"ListBox Item {i}",
            });
        }
    }

    public class ListBoxModel
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
    }
}
````

## Data Binding

The ListBox supports [binding to a model class](#creating-blazor-listbox), which requires setting the [`TextField` parameter, unless the property name is `"Text"`](#listbox-parameters). Another option is to bind the component to a collection of strings or [value type](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/value-types) data.

>caption Bind ListBox to List&lt;string&gt;

````RAZOR
<TelerikListBox Data="@ListBoxStrings"
                @bind-SelectedItems="@ListBoxSelectedStrings"
                SelectionMode="@ListBoxSelectionMode.Multiple"
                Height="auto">
    <ListBoxToolBarSettings>
        <ListBoxToolBar Visible="false" />
    </ListBoxToolBarSettings>
</TelerikListBox>

@code {
    private List<string> ListBoxStrings { get; set; } = new List<string>();

    private IEnumerable<string> ListBoxSelectedStrings { get; set; } = new List<string>();

    protected override void OnInitialized()
    {
        for (int i = 1; i <= 7; i++)
        {
            ListBoxStrings.Add($"String {i}");
        }
    }
}
````


## Toolbar

The [ListBox includes a toolbar with some built-in buttons](slug:listbox-toolbar). These tools fire events, which are related to item removal, reordering, or transfer to another ListBox. The component supports removing some of the default buttons or adding custom ones. You can also control the toolbar position with regard to the ListBox item list, or hide the toolbar completely.


## Reordering

The ListBox allows users to move one or multiple items up and down with built-in [toolbar buttons](slug:listbox-toolbar). The component will fire its [`OnReoder` event](slug:listbox-events#onreorder), so that the app can apply the new item order in the ListBox `Data`. See an [example above](#creating-blazor-listbox) or on the [ListBox Events](slug:listbox-events#example) page.


## Selection

Users can [select just one ListBox item or multiple items](slug:listbox-selection) with the mouse or keyboard. The behavior depends on the `SelectedItems` parameter value.


## Move Items Between ListBoxes

You can [connect several ListBox components and enable users to move items from one ListBox to another](slug:listbox-connect).


## Drag and Drop Items

Users can also [reorder items or move items to another ListBox with drag and drop](slug:listbox-dragdrop).


## Templates

The [ListBox component provides templates](slug:listbox-templates) to enable developers to customize the rendering and appearance of the component.


## Events

The various [ListBox events](slug:listbox-events) allow you to implement custom functionality and handle user interactions with the component's toolbar.


## ListBox Parameters

The table below lists the ListBox parameters. For a full list of the ListBox API members (parameters, methods, and events), check the [ListBox API Reference](slug:Telerik.Blazor.Components.TelerikListBox-1).

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `AriaLabel` | `string` | The [`aria-label` attribute](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label) of the `<ul>` element that holds the ListBox items. |
| `AriaLabelledBy` | `string` | The `aria-labelledby` attribute of the `<ul>` element that holds the ListBox items. |
| `Class` | `string` | The `class` attribute of the `<div class="k-listbox">` element. Use it to apply custom styles or [override the theme](slug:themes-override). |
| `ConnectedListBoxId` | `string` | The `Id` value of another ListBox instance. Use it to [connect multiple ListBox instances](slug:listbox-connect) and transfer items between them. |
| `Data` | `IEnumerable<T>` * | The ListBox component data collection. |
| `Draggable` | `bool` | Defines if users can drag and drop ListBox items. |
| `DropSources` | `List<string>` | The `Id` values of the ListBoxes from which users can drag items into the current ListBox. |
| `Enabled` | `bool` <br /> (`true`) | Defines if the ListBox allows item selection and toolbar operation. |
| `Height` | `string` | The `height` style of the component in any [supported CSS unit](slug:common-features/dimensions). The default ListBox dimensions depend on the CSS theme. |
| `Id` | `string` | The `id` attribute of `<div class="k-listbox">`. Use it to [link multiple ListBox instances](slug:listbox-connect) and transfer items between them. |
| `SelectedItems` | `IEnumerable<T>` * | The selected item(s) of the ListBox. The parameter supports two-way binding. The variable that is used with this parameter must be specifically `IEnumerable<T>` and not `List<T>`. |
| `SelectionMode` | `ListBoxSelectionMode` enum <br /> (`Single`) | Defines if users can select just one or multiple items. |
| `Size` | `string` <br /> (`"md"`) | This parameter controls ListBox styles such as paddings or font size. For easier usage, set the parameter to a member of the static class `Telerik.Blazor.ThemeConstants.ListBox.Size`. |
| `TextField` | `string` <br /> (`"Text"`) | The property name of class `T` that holds the item value to display in the ListBox. |
| `TItem` | `Type` | The ListBox model type. Although the compiler can usually infer the type from the `Data` parameter, you can set `TItem` for [simpler syntax in the event handler declarations](slug:listbox-events). |
| `ToolBarPosition` | `ListBoxToolBarPosition` enum <br /> (`Right`) | The ListBox toolbar position with relation to the item list. |
| `Width` | `string` | The `width` style of the component in any [supported CSS unit](slug:common-features/dimensions). The default ListBox dimensions depend on the CSS theme. |

\* `T` is the ListBox model type.


## ListBox Reference and Methods

The ListBox exposes methods for programmatic operation. To use them, define a reference to the component instance with the `@ref` directive attribute.

| Method | Description |
| --- | --- |
| `Rebind` | Refreshes the ListBox and ensures it displays the current `Data`. [`Rebind` is necessary when the Blazor framework cannot re-render components automatically](slug:common-features-data-binding-overview#refresh-data). |

>caption ListBox reference and method usage

````RAZOR
<TelerikListBox @ref="@ListBoxRef"
                Data="@ListBoxData"
                TextField="@nameof(ListBoxModel.Name)"
                @bind-SelectedItems="@ListBoxSelectedItems">
    <ListBoxToolBarSettings>
        <ListBoxToolBar Visible="false" />
    </ListBoxToolBarSettings>
</TelerikListBox>

<TelerikButton OnClick="@AddListBoxItem">Add ListBox Item</TelerikButton>

@code {
    private TelerikListBox<ListBoxModel> ListBoxRef { get; set; } = null!;

    private List<ListBoxModel> ListBoxData { get; set; } = new List<ListBoxModel>();

    private IEnumerable<ListBoxModel> ListBoxSelectedItems { get; set; } = new List<ListBoxModel>();

    private void AddListBoxItem()
    {
        var newId = ListBoxData.Count + 1;
        ListBoxData.Add(new ListBoxModel() { Id = newId, Name = $"Item {newId}" });

        ListBoxRef.Rebind();
    }

    public class ListBoxModel
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
    }
}
````


## Next Steps

* [Configure the ListBox toolbar](slug:listbox-toolbar)
* [Choose the ListBox selection mode](slug:listbox-selection)
* [Connect Multiple ListBoxes](slug:listbox-connect)
* [Enable ListBox drag-and-drop](slug:listbox-dragdrop)
* [Implement ListBox templates](slug:listbox-templates)
* [Handle ListBox events](slug:listbox-events)

## See Also

* [Live Demo: ListBox](https://demos.telerik.com/blazor-ui/listbox/overview)
* [ListBox API Reference](slug:Telerik.Blazor.Components.TelerikListBox-1)
