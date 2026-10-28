---
title: Tag Mode
page_title: MultiSelect - Tag Mode
description: Explore the available tag modes in the Blazor MultiSelect. See the options that the TagMode parameter of the MultiSelect supports and test it in combination with the MaxAllowedTags property.
slug: multiselect-tag-mode
tags: telerik,blazor,multiselect,tag,mode,single,multiple,summary
published: True
position: 17
components: ["multiselect"]
---

# MultiSelect Tag Mode

The Tag Mode of the MultiSelect controls how the selected items (tags) will be visualized in the main (input) element of the component. 

To configure the tag mode, use the `TagMode` parameter. It accepts a member of the `Telerik.Blazor.MultiSelectTagMode` enum.

The MultiSelect supports three possible configurations for displaying the tags:

* [Single Mode](#single-mode)
* [Multiple Mode (the default)](#multiple-mode)
* [Summarized Tags Based on the Number of Selections](#summarized-tags-based-on-the-number-of-selections)

## Single Mode

When the single tag mode is enabled, only one summary tag will be displayed showing the count of all selected items.

To use the single tag mode, set the `TagMode` parameter to `MultiSelectTagMode.Single`.

>caption MultiSelect with single tag mode

<demo metaUrl="client/multiselect/tag-mode/example-1/" height="420"></demo>

## Multiple Mode

When the multiple tag mode is enabled, each selected item will be displayed as a separate tag. This is the default `TagMode` value (`MultiSelectTagMode.Multiple`).

>caption MultiSelect with multiple tag mode

<demo metaUrl="client/multiselect/tag-mode/example-2/" height="420"></demo>

## Summarized Tags Based on the Number of Selections

This setting is an extension of the multiple tag mode. It allows you to display the selected items as separate tags but control the greatest number of individual items that will be visualized. If the selected items count exceeds this number, the MultiSelect will combine the rest of the selections in a summary tag.

To restrict the allowed number of individual tags, use the `MaxAllowedTags` parameter.

>caption MultiSelect accepting up to 2 individual tags

<demo metaUrl="client/multiselect/tag-mode/example-3/" height="420"></demo>

## See Also

* [Live Demo: MultiSelect Tag Mode](https://demos.telerik.com/blazor-ui/multiselect/tag-mode)

