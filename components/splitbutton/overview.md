---
title: Overview
page_title: SplitButton Overview
description: Overview of the SplitButton for Blazor. Description of the component behavior, features and benefits.
slug: splitbutton-overview
tags: telerik,blazor,splitbutton
published: True
position: 0
---

# Blazor SplitButton Overview

The <a href = "https://www.telerik.com/blazor-ui/split-button" target="_blank">SplitButton for Blazor</a> is a combination of a button and a dropdown. It provides a collection of related user actions in a compact interface. The SplitButton has one primary clickable action, which is always visible, and a list of secondary actions that are displayed in a dropdown when the user clicks on the arrow.

## SplitButton vs. DropDownButton

@[template](/_contentTemplates/dropdownbutton/notes.md#dropdownbutton-splitbutton-comparison)

## Creating Blazor SplitButton

1. Add a `<TelerikSplitButton>` tag.
1. Define the primary action in a child `<SplitButtonContent>` tag. Its content can be plain text, HTML or even another component.
1. Set the `OnClick` parameter of the `<TelerikSplitButton>` tag. This will be the event handler for the primary action.
1. Add a child `<SplitButtonItems>` tag. Insert some `<SplitButtonItem>` tags inside it.
1. Each `<SplitButtonItem>` tag should have some content and an `OnClick` handler.

>caption Basic SplitButton

````RAZOR
<TelerikSplitButton OnClick="@OnReply">
    <SplitButtonContent>Reply</SplitButtonContent>
    <SplitButtonItems>
        <SplitButtonItem OnClick="@OnReplyAll">Reply All</SplitButtonItem>
        <SplitButtonItem OnClick="@OnForward">Forward</SplitButtonItem>
    </SplitButtonItems>
</TelerikSplitButton>

Last action: <strong> @LastAction </strong>

@code {
    string LastAction { get; set; }

    void OnReply()
    {
        LastAction = "Reply";
    }

    void OnReplyAll()
    {
        LastAction = "Reply All";
    }

    void OnForward()
    {
        LastAction = "Forward";
    }
}
````


## Icons

The primary SplitButton action and each secondary item in the dropdown can [display a font icon or an image](slug:splitbutton-icons) for better looks and user experience.


## Appearance

The SplitButton provides a [variety of settings to control its visual appearance](slug:splitbutton-appearance), for example the colors, borders, and size. This spares the need to use custom CSS code.

>tip To learn more about the appearance, anatomy, and accessibility of the SplitButton, visit the [Progress Design System Kit documentation](https://www.telerik.com/design-system/docs/components/splitbutton/)—an information portal offering rich component usage guidelines, descriptions of the available style variables, and globalization support details.

## Events

Each SplitButton action [fires a separate `OnClick` event](slug:splitbutton-events), so that the application can react to user behavior.


## SplitButton Parameters

The following table lists the SplitButton parameters, except those related to [built-in styling](slug:splitbutton-appearance) and [icons](slug:splitbutton-icons). Also check the [SplitButton API Reference](slug:Telerik.Blazor.Components.TelerikSplitButton) for a full list of properties, methods and events.

@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `AriaLabel` | `string` | Sets the `aria-label` attribute of the primary action element, which is `<button class="k-button">`. |
| `Class` | `string` | Renders a custom CSS class to the main component element, which is `<div class="k-split-button">`. Use it to [override the theme styles](slug:themes-override) to obtain a specific appearance, if none of the [SplitButton appearance settings](slug:splitbutton-appearance) can achieve this. |
| `Enabled` | `bool`<br />(`true`) | Enables or disables the component. |
| `Id` | `string` | Sets the `id` attribute of the primary action element (`<button>`). |
| `TabIndex`| `int` | Sets the `tabindex` attribute of the primary action element. |
| `Title`| `string` | Sets the `title` attribute of the primary action element. |


### Popup Settings

The SplitButton exposes configuration settings for its dropdown (popup). The parameters should be set in a `<SplitButtonPopupSettings>` tag, which should be placed inside a `<SplitButtonSettings>` tag like this:

<div class="skip-repl"></div>

````HTML
<TelerikSplitButton>
    <SplitButtonSettings>
        <SplitButtonPopupSettings Height="150px" />
    </SplitButtonSettings>
</TelerikSplitButton>
````

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `AnimationDuration` | `int` <br /> (`300`) | Sets the dropdown animation duration in milliseconds. |
| `Class` | `string` | Renders a custom CSS class to the dropdown container, which is `<div class="k-animation-container">`. |
| `Height` | `string` <br /> (`"auto"`) | The dropdown height. If the items cannot fit, a vertical scrollbar will appear. If not set, the dropdown will expand, based on the number of items. |
| `MaxHeight` | `string` | The maximum dropdown height, if an explicit height is not set. |
| `MinHeight` | `string` | The minimum dropdown height, if an explicit height is not set. |
| `Width` | `string` | The dropdown width. If not set, the dropdown will expand, based on the length of its items. |
| `MaxWidth` | `string` | The maximum dropdown width, if an explicit width is not set. If there is a longer item, a horizontal scrollbar will show. |
| `MinWidth` | `string` | The minimum dropdown width, if an explicit width is not set. |

>tip As in standard CSS, the *min* and *max* settings take precedence over *width* and *height*.


### Item Settings

The following table lists the `SplitButtonItem` parameters, except those related to [icons](slug:splitbutton-icons).

| Parameter | Type and Default&nbsp;Value | Description |
| --- | --- | --- |
| `Class` | `string` | Renders a custom CSS class to the dropdown item's element, which is `<li class="k-item k-menu-item">`. |
| `Enabled` | `bool`<br />(`true`) | Enables or disables the item. |


## SplitButton Reference and Methods

The SplitButton exposes a `FocusAsync` method to focus it programmatically. To use it, define a reference to the component instance with the `@ref` attribute. Be aware of the Blazor life cycle if you want to [focus the component on page load](slug:inputs-kb-focus#focus-on-page-load).

>caption Get a reference to the SplitButton and execute methods

````RAZOR
<TelerikSplitButton @ref="@SplitButtonRef" OnClick="@OnReply">
    <SplitButtonContent>Reply</SplitButtonContent>
    <SplitButtonItems>
        <SplitButtonItem OnClick="@OnReplyAll">Reply All</SplitButtonItem>
    </SplitButtonItems>
</TelerikSplitButton>

<TelerikButton OnClick="@FocusSplitButton">Focus SplitButton</TelerikButton>

Last action clicked: <strong> @LastActionClicked </strong>

@code {
    TelerikSplitButton SplitButtonRef { get; set; }

    string LastActionClicked { get; set; }

    async Task FocusSplitButton()
    {
        await SplitButtonRef.FocusAsync();
    }

    void OnReply()
    {
        LastActionClicked = "Reply";
    }

    void OnReplyAll()
    {
        LastActionClicked = "Reply All";
    }
}
````


## Next Steps

* [Handle SplitButton Events](slug:splitbutton-events)
* [Add SplitButton Icons](slug:splitbutton-icons)
* [Configure the SplitButton appearance](slug:splitbutton-appearance)


## See Also

* [SplitButton API](slug:Telerik.Blazor.Components.TelerikSplitButton)
* [Live Demo: SplitButton](https://demos.telerik.com/blazor-ui/splitbutton/overview)
* [KB: Change Primary SplitButton Action on Click](slug:splitbutton-kb-change-primary-action-onclick)
