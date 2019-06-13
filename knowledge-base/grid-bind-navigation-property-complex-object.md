---
title: Bind to navigation properties in complex objects
description: Bind grid columns to navigation properties in complex objects
type: how-to
page_title: Bind to navigation properties in complex objects
slug: grid-use-navigation-properties
position: 
tags: 
ticketid: 
res_type: kb
---

## Description

Data that you bind to the grid may have complex objects in its model, not only primitive types.

How do I use complex objects in my model and show navigation properties information in the grid?

## Notes

Generally, in such a case the grid must be bound to a parent class/interface that exposes all fields that its inheritors will have, so that the grid can show them. The grid cannot know what may be inherited and how its values relate to the base type it is bound to.

Thus, we recommend that you have all necessary fields in the base class and override them in child classes if needed, otherwise, return an empty string in the main class.

This will let the grid perform operations like sorting and filtering, that will otherwise break. You could implement the `ICopmarer` interface to allow sorting, but this can quickly become cumbersome with the more inheritance there is, and it may also couple the separate implementations.

## Solution

If simple display is sufficient, you can use [Templates]({%slug components/grid/features/templates%}). For example:

````CSHTML
@using Telerik.Blazor

<TelerikGrid Data="@myData">
	<TelerikGridColumns>
		<TelerikGridColumn Field="@nameof(SampleComplexObject.ID)" Title="ID"></TelerikGridColumn>
		<TelerikGridColumn Field="@nameof(SampleComplexObject.Name)" Title="The Name"></TelerikGridColumn>
		<TelerikGridColumn Title="First Nested Property">
			<Template>
			@((context as SampleComplexObject).SomeNavigationProperty.Field1)
		</Template>
		</TelerikGridColumn>
		<TelerikGridColumn Title="Second Nested Property">
			<Template>
				@((context as SampleComplexObject).SomeNavigationProperty.OtherField)
			</Template>
		</TelerikGridColumn>

	</TelerikGridColumns>
</TelerikGrid>


@code {
	public class SampleComplexObject
	{
		public int ID { get; set; }
		public string Name { get; set; }
		public NestedObject SomeNavigationProperty { get; set; }
	}

	public class NestedObject
	{
		public string Field1 { get; set; }
		public string OtherField { get; set; }
	}

	public IEnumerable<SampleComplexObject> myData = Enumerable.Range(1, 20).Select(x =>
			new SampleComplexObject
			{
				ID = x,
				Name = "Name " + x,
				SomeNavigationProperty = new NestedObject
				{
					Field1 = "first " + x,
					OtherField = "second " + x
				}
			}
		);
}
````


