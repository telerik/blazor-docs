---
title: Appearance
page_title: SpeechToTextButton Appearance
description: Customize the appearance of the SpeechToTextButton component in Blazor applications.
slug: speechtotextbutton-appearance
tags: blazor, speech recognition, appearance, customization
published: true
position: 2
---

# SpeechToTextButton Appearance

You can customize the appearance of the `SpeechToTextButton` component by using its built-in parameters and CSS classes. The component supports the same appearance options as the standard Telerik Button.

## Size

You can increase or decrease the size of the button by setting the `Size` parameter to a member of the `Telerik.Blazor.ThemeConstants.Button.Size` class:

**Available values for the Size parameter**

| Class member | Manual declaration |
|--------------|-------------------|
| Small        | `"sm"`            |
| Medium (default) | `"md"`        |
| Large        | `"lg"`            |

**Example of Setting the Button Size**

<demo metaUrl="client/speechtotextbutton/size/" height="150"></demo>

## Fill Mode

The `FillMode` toggles the background and border of the TelerikSpeechToTextButton. You can set the parameter to a member of the `Telerik.Blazor.ThemeConstants.Button.FillMode` class:

**Available values for the FillMode parameter**

| Class member | Manual declaration |
|--------------|-------------------|
| Solid (default)   | `"solid"`     |
| Outline           | `"outline"`   |
| Flat              | `"flat"`      |
| Link              | `"link"`      |
| Clear             | `"clear"`     |

**Example of Setting the Fill Mode**

<demo metaUrl="client/speechtotextbutton/fillmode/" height="150"></demo>

## Theme Color

The color of the button is controlled through the `ThemeColor` parameter. You can set it to a member of the `Telerik.Blazor.ThemeConstants.Button.ThemeColor` class:

**Available values for the ThemeColor parameter**

| Class member | Manual declaration |
|--------------|-------------------|
| Base (default)     | `"base"`     |
| Primary            | `"primary"`  |
| Secondary          | `"secondary"`|
| Tertiary           | `"tertiary"` |
| Info               | `"info"`     |
| Success            | `"success"`  |
| Warning            | `"warning"`  |
| Error              | `"error"`    |
| Dark               | `"dark"`     |
| Light              | `"light"`    |
| Inverse            | `"inverse"`  |

**Example of Setting the Theme Color**

<demo metaUrl="client/speechtotextbutton/themecolor/" height="150"></demo>

## Rounded

The `Rounded` parameter applies the border-radius CSS rule to the button to achieve curving of the edges. You can set it to a member of the `Telerik.Blazor.ThemeConstants.Button.Rounded` class:

**Available values for the Rounded parameter**

| Class member | Manual declaration |
|--------------|-------------------|
| Small        | `"sm"`            |
| Medium (default) | `"md"`        |
| Large        | `"lg"`            |
| Full         | `"full"`          |

**Example of Setting the Rounded Parameter**

<demo metaUrl="client/speechtotextbutton/rounded/" height="150"></demo>

## Icon

Set the `Icon` parameter to display an icon. You can use a predefined Telerik icon or a custom one.

**Example of Customizing the Icon**

<demo metaUrl="client/speechtotextbutton/icon/" height="150"></demo>

## Custom Styles

Use the `Class` parameter to apply custom CSS classes. You can further style the button by targeting these classes.

**Example of Custom Styling**

<demo metaUrl="client/speechtotextbutton/customstyle/" height="150"></demo>

## See Also

- [SpeechToTextButton Overview](slug:speechtotextbutton-overview)
- [SpeechToTextButton Events](slug:speechtotextbutton-events)
- [SpeechToTextButton Integration](slug:speechtotextbutton-integration)