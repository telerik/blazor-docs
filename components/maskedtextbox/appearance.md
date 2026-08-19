---
title: Appearance
page_title: MaskedTextBox Appearance
description: Appearance settings of the MaskedTextBox for Blazor.
slug: maskedtextbox-appearance
tags: telerik,blazor,button,maskedtextbox,mask,appearance
published: True
position: 55
components: ["maskedtextbox"]
---

# Appearance Settings

You can control the appearance of the MaskedTextBox button by setting the following attribute:

* [Size](#size)
* [Rounded](#rounded)
* [FillMode](#fillmode)


## Size

You can increase or decrease the size of the MaskedTextBox by setting the `Size` attribute to a member of the `Telerik.Blazor.ThemeConstants.MaskedTextBox.Size` class:

| Class members | Manual declarations |
|------------|--------|
|`Small` |`sm`|
|`Medium`|`md`|
|`Large`|`lg`|

>caption The built-in sizes

<demo metaUrl="client/maskedtextbox/appearance/size/" height="250"></demo>

## Rounded

The `Rounded` attribute applies the `border-radius` CSS rule to the textbox to achieve curving of the edges. You can set it to a member of the `Telerik.Blazor.ThemeConstants.MaskedTextBox.Rounded` class:

| Class members | Manual declarations |
|------------|--------|
|`Small` |`sm`|
|`Medium`|`md`|
|`Large`|`lg`|
|`Full`|`full`|

>caption The built-in values of the Rounded attribute

<demo metaUrl="client/maskedtextbox/appearance/rounded/" height="250"></demo>

## FillMode

The `FillMode` controls how the TelerikMaskedTextBox is filled. You can set it to a member of the `Telerik.Blazor.ThemeConstants.MaskedTextBox.FillMode` class:

| Class members | Result |
|------------|--------|
|`Solid` <br /> default value|`solid`|
|`Flat`|`flat`|
|`Outline`|`outline`|

>caption The built-in Fill modes

<demo metaUrl="client/maskedtextbox/appearance/fill-mode/" height="250"></demo>

@[template](/_contentTemplates/common/themebuilder-section.md#appearance-themebuilder)
