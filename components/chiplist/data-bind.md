---
title: Data Binding
page_title: ChipList - Data Binding
description: Data Binding the ComboBox for Blazor.
slug: chiplist-bound
tags: telerik,blazor,chiplist,data,bind,binding,databind
published: True
position: 5
components: ["chiplist"]
---

# ChipList Data Binding

This article explains how to provide data to a ChipList component, and the properties related to data binding.

@[template](/_contentTemplates/common/general-info.md#valuebind-vs-databind-link)

## Data Binding Features

The ChipList has features that map to properties in the component model class.

### Schema

The table below lists the available data binding parameters for the Blazor ChipList component. Use them when your model property names are different from the default values.

| ChipList Parameter | Default Value | Description |
|----------|----------|----------|
| `DisabledField`| `"Disabled"` | Defines if the chip is disabled (non-clickable). |
| `FillModeField`| `"FillMode"` | Defines the [`FillMode` of each chip](slug:chip-appearance#fillmode). |
| `IconField` | `"Icon"` | The icon that renders in the chip. See [Icons](#icons) below. |
| `RemovableField`| `"Removable"` | Defines if the users can remove the chip. |
| `TextField` | `"Text"` | The text that renders in the chip. |
| `ThemeColorField`| `"ThemeColor"` | Defines the [`ThemeColor` of each chip](slug:chip-appearance#themecolor). |

#### Icons

The `IconField` model property can hold:

* A property of the static `SvgIcon` class;
* A member of the `FontIcon` enum;
* A `string` that is a CSS class for a custom icon.

@[template](/_contentTemplates/common/icons.md#font-icons-css-note)

## Examples

### Default Property Names

The following example uses property names that work automatically with no additional ChipList configuration.

>caption Using default property names in the ChipList model class

<demo metaUrl="client/chiplist/data-binding/default-property-names/" height="500"></demo>

### Custom Property Names

The following example uses custom property names that need explicit ChipList configuration.

>caption ChipList with custom model property names

<demo metaUrl="client/chiplist/data-binding/custom-property-names/" height="500"></demo>

## See Also

* [ChipList Overview](slug:chiplist-overview)
* [Live Demo: ChipList](https://demos.telerik.com/blazor-ui/chiplist/overview)
