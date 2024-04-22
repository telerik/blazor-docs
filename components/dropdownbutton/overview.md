---
title: Overview
page_title: DropDownButton Overview
description: Explore the DropDownButton for Blazor and the features it provides. See how to configure a basic DropDownButton and test its behavior. Revise the available settings of the dropdown element and the child items in it.
slug: dropdownbutton-overview
tags: telerik,blazor,dropdownbutton
published: True
position: 0
---

# Blazor DropDownButton Overview

The <a href = "https://www.telerik.com/blazor-ui/dropdownbutton" target="_blank">DropDownButton for Blazor</a> is a combination of a button and a dropdown. It provides a collection of related user actions in a compact interface. The DropDownButton allows users to click the primary button and open the popup to choose from a list of additional actions.

## DropDownButton vs. SplitButton

@[template](/_contentTemplates/dropdownbutton/notes.md#dropdownbutton-splitbutton-comparison)

## Creating Blazor DropDownButton

1. Add a `<TelerikDropDownButton>` tag.
1. (optional) Use the `Icon` parameter of the  `<TelerikDropDownButton>` tag to add an icon to the primary button.
1. (optional) Handle the `OnClick` event of the  `<TelerikDropDownButton>`.
1. Define the primary button content in a child `<DropDownButtonContent>` tag. The content can be plain text, HTML or even another component.
1. Add a child `<DropDownButtonItems>` tag. This will hold the actions rendered in the dropdown.
1. Add the desired `<DropDownButtonItem>` instances inside the `<DropDownButtonItems>` tag. Specify their content and icons and handle their `OnClick` events.

>caption Basic DropDownButton

````CSHTML
<TelerikDropDownButton Icon="@SvgIcon.Share" OnClick="@(()=>OnItemClick("Primary"))">
    <DropDownButtonContent>Share</DropDownButtonContent>

    <DropDownButtonItems>
        <DropDownButtonItem Icon="@SvgIcon.Facebook" OnClick="@(()=>OnItemClick("Facebook"))">Facebook</DropDownButtonItem>
        <DropDownButtonItem Icon="@SvgIcon.Twitter" OnClick="@(()=>OnItemClick("Twitter"))">Twitter</DropDownButtonItem>
        <DropDownButtonItem Icon="@SvgIcon.Linkedin" OnClick="@(()=>OnItemClick("Linkedin"))">Linkedin</DropDownButtonItem>
        <DropDownButtonItem Icon="@SvgIcon.Reddit" OnClick="@(()=>OnItemClick("Reddit"))">Reddit</DropDownButtonItem>
    </DropDownButtonItems>

</TelerikDropDownButton>

@code {
    private void OnItemClick(string item)
    {
        Console.WriteLine($"User clicked {item} option.");
    }
}
````

## Icons

The primary DropDownButton action and each secondary item in the dropdown can [display an icon or an image]({%slug dropdownbutton-icons%}) for better looks and user experience.

## Appearance

The DropDownButton provides a [variety of settings to control its visual appearance]({%slug dropdownbutton-appearance%}), for example, the colors, borders, and size. This spares the need to use custom CSS code.

>tip To learn more about the appearance, anatomy, and accessibility of the DropDownButton, visit the [Progress Design System documentation](https://www.telerik.com/design-system/docs/components/dropdownbutton/)—an information portal offering rich component usage guidelines, descriptions of the available style variables, and globalization support details.

## Events

Each DropDownButton action [fires a separate `OnClick` event]({%slug dropdownbutton-events%}) so that the application can react to user behavior.

## DropDownButton Parameters

The following table lists the DropDownButton parameters, except those related to [built-in styling]({%slug dropdownbutton-appearance%}) and [icons]({%slug dropdownbutton-icons%}). Also check the [DropDownButton API Reference](/blazor-ui/api/Telerik.Blazor.Components.TelerikDropDownButton) for a full list of properties, methods, and events.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `AriaDescribedBy` | `string` | Sets the `aria-describedby` attribute of the primary button element `<button class="k-button">`.
| `AriaLabel` | `string` | Sets the `aria-label` attribute of the primary button element `<button class="k-button">`. |
| `AriaLabelledBy` | `string` | Sets the `aria-labelledby` attribute of the primary button element `<button class="k-button">`.
| `Class` | `string` | Renders a custom CSS class to the main component element `<div class="k-dropdown-button">`. Use it to [override the theme styles]({%slug themes-override%}) and achieve a specific appearance if none of the [DropDownButton appearance settings]({%slug dropdownbutton-appearance%}) can do this. |
| `Enabled` | `bool`<br />(`true`) | Defines whether the primary button is enabled. |
| `Id` | `string` | Sets the `id` attribute of the primary button element `<button class="k-button">`. |
| `ShowArrowButton` | `bool` | Sets the visibility of the Arrow button that displays the popup of the component. |
| `TabIndex`| `int` | Sets the `tabindex` attribute of the primary button element `<button class="k-button">`. |
| `Title`| `string` | Sets the `title` attribute of the primary button element `<button class="k-button">`. |


### Popup Settings

The DropDownButton exposes settings for its dropdown (popup). To configure the options, declare a  `<DropDownButtonPopupSettings>` tag inside a `<DropDownButtonSettings>` tag:

<div class="skip-repl"></div>

````CSHTML
<TelerikDropDownButton>
    <DropDownButtonSettings>
        <DropDownButtonPopupSettings Height="150px" />
    </DropDownButtonSettings>
</TelerikDropDownButton>
````

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `AnimationDuration` | `int` <br /> (`300`) | Sets the dropdown animation duration in milliseconds. |
| `Class` | `string` | Applies a user-defined CSS class to the dropdown container, which is `<div class="k-animation-container">`. |
| `Height` | `string` <br /> (`"auto"`) | Sets the dropdown height. If the items cannot fit, a vertical scrollbar will appear. If not set, the dropdown will expand, based on the number of items. |
| `MaxHeight` | `string` | Sets the maximum dropdown height if an explicit height is not set. |
| `MinHeight` | `string` | The minimum dropdown height, if an explicit height is not set. |
| `Width` | `string` | The dropdown width. If not set, the dropdown will expand, based on the length of its items. |
| `MaxWidth` | `string` | The maximum dropdown width, if an explicit width is not set. If there is a longer item, a horizontal scrollbar will show. |
| `MinWidth` | `string` | The minimum dropdown width, if an explicit width is not set. |

>tip As in standard CSS, the `min` and `max` settings take precedence over `width` and `height`.


### Item Settings

The following table lists the `DropDownButtonItem` parameters, except those related to [icons]({%slug dropdownbutton-icons%}).

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `Class` | `string` | Renders a custom CSS class to the dropdown item's element, which is `<li class="k-item k-menu-item">`. |
| `Enabled` | `bool`<br />(`true`) | Defines whether the item is enabled. |


## DropDownButton Reference and Methods

The DropDownButton exposes a `FocusAsync` method that allows you to focus it programmatically. To use it, define a reference to the component instance with the `@ref` attribute. Consider the Blazor life cycle if you want to [focus the component on page load]({%slug inputs-kb-focus%}#notes).

>caption Get a reference to the DropDownButton and execute methods

````CSHTML

<TelerikButton OnClick="@FocusDropDownButton">Focus DropDownButton</TelerikButton>

<TelerikDropDownButton @ref="@DropDownButtonRef" Icon="@SvgIcon.Share">
    <DropDownButtonContent>Share</DropDownButtonContent>

    <DropDownButtonItems>
        <DropDownButtonItem Icon="@SvgIcon.Facebook">Facebook</DropDownButtonItem>
        <DropDownButtonItem Icon="@SvgIcon.Twitter">Twitter</DropDownButtonItem>
        <DropDownButtonItem Icon="@SvgIcon.Linkedin">Linkedin</DropDownButtonItem>
        <DropDownButtonItem Icon="@SvgIcon.Reddit">Reddit</DropDownButtonItem>
    </DropDownButtonItems>

</TelerikDropDownButton>

@code {
    TelerikDropDownButton DropDownButtonRef;

    async Task FocusDropDownButton()
    {
        await DropDownButtonRef.FocusAsync();
    }
}
````

## Next Steps

* [Add DropDownButton Icons]({%slug dropdownbutton-icons%})
* [Handle DropDownButton Events]({%slug dropdownbutton-events%})
* [Configure the DropDownButton appearance]({%slug dropdownbutton-appearance%})


## See Also

* [DropDownButton API](/blazor-ui/api/Telerik.Blazor.Components.TelerikDropDownButton)
* [Live Demo: DropDownButton](https://demos.telerik.com/blazor-ui/dropdownbutton/overview)
* [Live Demo: DropDownButton Items](https://demos.telerik.com/blazor-ui/dropdownbutton/items)
