---
title: Events
page_title: DropDownTree Events
description: The Blazor DropDownTree
slug: dropdowntree-events
tags: blazor,dropdowntree,events
published: True
position: 200
---

# Blazor DropDownTree Events

* [OnBlur](#onblur)
* [OnChange](#onchange)
* [OnClose](#onclose)
* [OnExpand](#onexpand)
* [OnFocus](#onfocus)
* [OnItemClick](#onitemclick)
* [OnItemRender](#onitemrender)
* [OnOpen](#onopen)
* [ValueChanged](#valuechanged)

## OnBlur

>caption Using the DropDownTree OnBlur event

````RAZOR.skip-repl
<TelerikDropDownTree OnBlur="@OnDropDownTreeBlur" />

@code {
    private void OnDropDownTreeBlur()
    {

    }
}
````

## OnClose

>caption Using the DropDownTree OnClose event

````RAZOR.skip-repl
<TelerikDropDownTree OnClose="@OnDropDownTreeClose" />

@code {
    private void OnDropDownTreeClose(DropDownTreeCloseEventArgs args)
    {
        //args.IsCancelled = true;
    }
}
````

## OnExpand

>caption Using the DropDownTree OnExpand event

````RAZOR.skip-repl
````

## OnFocus

>caption Using the DropDownTree OnFocus event

````RAZOR.skip-repl
<TelerikDropDownTree OnFocus="@OnDropDownTreeFocus" />

@code {
    private void OnDropDownTreeFocus()
    {

    }
}
````

## OnItemClick

>caption Using the DropDownTree OnItemClick event

````RAZOR.skip-repl
````

## OnItemRender

>caption Using the DropDownTree OnItemRender event

````RAZOR.skip-repl
````

## OnOpen

>caption Using the DropDownTree OnOpen event

````RAZOR.skip-repl
<TelerikDropDownTree OnOpen="@OnDropDownTreeOpen" />

@code {
    private void OnDropDownTreeOpen(DropDownTreeOpenEventArgs args)
    {
        //args.IsCancelled = true;
    }
}
````

## ValueChanged

>caption Using the DropDownTree ValueChanged event

````RAZOR.skip-repl
<TelerikDropDownTree Value="@DropDownTreeValue"
                     ValueChanged="@DropDownTreeValueChanged"
                     ValueExpression="@(() => DropDownTreeValue)"
                     TItem="@TreeItem"
                     TValue="@int">
</TelerikDropDownTree>

<TelerikDropDownTree Value="@DropDownTreeValue"
                     ValueChanged="@(async (int newValue) => await DropDownTreeValueChanged(newValue))"
                     ValueExpression="@(() => DropDownTreeValue)">
</TelerikDropDownTree>

@code {
    private async Task DropDownTreeValueChanged(int newValue)
    {
        DropDownTreeValue = newValue;
    }
}
````

## Example

>caption Using the DropDownTree events

````RAZOR
````

## See Also

* [DropDownTree Data Binding](slug:dropdowntree-data-binding-overview)
* [DropDownTree Templates](slug:dropdowntree-templates)
