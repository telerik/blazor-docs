---
title: CSS Isolation does not work for Telerik components
description: CSS Isolation does not work for Telerik components - why
type: troubleshooting
page_title: CSS Isolation does not work for Telerik components
slug: common-kb-css-isolation
position: 
tags: 
ticketid: 1489739
res_type: kb
---

## Description
I'm wanting to leverage CSS isolation in my projects but am finding that it doesn't work with Telerik components.

## Steps to Reproduce

1. Use .NET 5 version that supports CSS isolation (like RC2 at the time of writing).

1. Add a CSS rule to the scoped styles, such as a font size change.

    **CSS**
    
        .my-component-button-class {
            font-size: 20px !important;
        }


1. Apply that class to a Telerik component

````CSHTML
<p>This button's class is defined in the component's scoped css file. The class is applied to the button but the random attribute the framework renders is not applied so it does not have effect.</p>
<TelerikButton Class="my-component-button-class"
               Primary="true">
    The font size should be larger but the scoped class is not applied properly.
</TelerikButton>

<p>Custom component nesting has the same behavior - elements from child components do not get the CSS isolation attribute</p>
<MyCustomComponent Class="my-component-button-class" />


<p>This html successfully takes the class defined in the scoped css file because it is plain HTML on the component that defines the custom CSS rule.</p>
<button class="my-component-button-class">
    The font size is larger thanks to the scoped css file.
</button>
````
````MyCustomComponent
<button class="@Class">
    This is a button from a component, not direct markup
</button>
@code {
    [Parameter]
    public string Class { get; set; }
}
````

**Expected**: The new font size is applied.

**Actual**: The new font size is not applied.

## Cause\Possible Cause(s)

The CSS isolation feature works by adding a random attribute to the DOM elements from the component that defines the isolated CSS rules, and then cascades the CSS rule through that custom attribute.

The problem is that this applies only to plain HTML elements, but it does not apply to child components - be that Telerik components or other components (even those defined by the app itself).

>caption CSS Isolation explained

![CSS Isolation feature behavior with nested components and plain HTML explained](images/css-isolation-explained.png)

## Solution

Use CSS rules that are global to the application and not scoped to a particular component through the CSS Isolation feature. You can also use the `Class` parameter of the Telerik components to cascade through it if you want to target particular instances only.