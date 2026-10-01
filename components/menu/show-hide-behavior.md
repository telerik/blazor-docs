---
title: Show and Hide Behavior
page_title: Menu - Show and Hide Behavior
description: Configure the Menu's sub-items appearance by using the ShowOn parameter and control how they disappear through the HideOn option.
slug: menu-show-hide-behavior
tags: telerik,blazor,menu,show,hide,events,hover,click,mouseleave,mouseenter
published: true
position: 3
components: ["menu"]
---

# Show and Hide Behavior

You can control the user interaction with the Menu items by defining how the child items show and hide. 

The `ShownOn` and `HideOn` parameters allow you to set the event that will show and hide the child Menu items.

* The `ShowOn` parameter accepts a value from the `Telerik.Blazor.MenuShowEvent` enum:

    * `MouseEnter`&mdash;Child Menu items will display when the mouse cursor enters a parent Menu item.
    * `Click`&mdash;Child Menu items will display when the user clicks or taps on a parent Menu item.

* The `HideOn` parameter accepts a value from the `Telerik.Blazor.MenuHideEvent` enum:

    * `MouseLeave`&mdash;Child Menu items will disappear when the mouse cursor leaves the child item group and their parent.
    * `Click`&mdash;Child Menu items will disappear when the user clicks or taps on their parent or on another parent, or outside the Menu. Clicking a child item will not close the currently open child item group. To change this behavior, use the [`CloseOnClick`](slug:components/menu/overview#menu-parameters) parameter.

By default, the Menu items are shown on hover (mouse enter) over the Menu and hidden on mouse leave.

> Changing the `ShowOn` & `HideOn` values dynamically at runtime is not supported at this stage.
>
> Mixing the two behaviors is likely to produce undesired UX and is not recommended.

>caption Explore the show and hide behavior of the Menu items

<demo metaUrl="client/menu/show-hide-behavior/example-1/" height="520"></demo>

## Next Steps

* [Explore the Menu Templates](slug:components/menu/templates)

## See Also

* [Menu Overview](slug:components/menu/overview)
