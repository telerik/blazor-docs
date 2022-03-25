---
title: Efficient Keyboard Input
page_title: DateInput - Efficient Keyboard Input
description: Efficient Keyboard Input in the DateInput for Blazor.
slug: dateinput-efficient-keyboard-input
tags: telerik,blazor,DateInput,efficient,keyboard,input
published: true
position: 3
---

# Efficient Keyboard Input

The Telerik date inputs take into account what you are typing in order to let you input data quickly and efficiently.

The input focuses the next date segment automatically when the input for the current segment uniquely and successfully identifies the value current segment. 

You can change the focused segment through entering:

* `LeftArrow` or `RightArrow`

* the `value` of the input (for example, entering `12` for the month number)

* the `separator` of the date segments.
    * The supported separators in the Telerik date editors - `TelerikDateInput`, `TelerikDatePicker`, `TelerikDateTimePicker`, and the `TelerikTimePicker`, are the forward-slash `/`, the comma `,`, and the dot `.`. 


>caption Example scenarios when and how focus moves between date segments

In the example below, we will use the `M/d/yyyy` date format and take the `month` segment specifically to illustrate the component behavior.

* When the user inputs a `valid value` - a digit or two digits that can successfully and uniquely form the month of the year.

    * If the input is `two` (`2`), the focus will automatically shift to the next date segment (the day), because there are no months with two digits that start with `two` (`2`).
    
    * If the value is `one` (`1`), the focus will **not** automatically shift to the next date segment (the day), because there are months with two digits that start with `one` (`1`) - such as January (1), October (10), November (11), and December (12). 
    
* By typing the `separator` in the input (`/` in this example), or by using the `LeftArrow` / `RightArrow` keys on the keyboard.

    * This allows the user to quickly submit `one` (`1`) as a valid month without having to type `01` for January or wondering how to avoid typing a second digit because they don't want to enter `10`, `11` or `12`.
    
    * Providing a `separator` is an alternative to using the `left` / `right` arrows on the keyboard. This is useful when the user utilizes a numeric keyboard on a mobile device where no arrows are available.


This behavior allows the application users to quickly input a date in the editor, for example:

* writing `21/2021` will be automatically formatted to a valid `DateTime` object - `February 1, 2021` - the number `2` is a unique month and you don't have to do anything to move to the next segment, inputting the separator means you don't have to provide a two-digit date.

* writing `1/2/2021` will be recognized as `January 2, 2021` - inputting a first separators means you don't have to write a two-digit month or date.

* writing `5222021` will be recognized as `May 22, 2021` - inputting `5` uniquely identifies the month, and `22` uniquely identifies a date.

We recognize that there are many user experience patterns and ways that people want to write input, especially dates, considering that there are many formats for them. We chose the user experience described above because we believe it is the best common ground between automation, efficiency and control over the input. Unfortunately, there may be some users in your user base that seek a slightly different experience, and it is impossible for such a simple component to provide different ways for different users to interact with it - there would be no UI for the user to set their preferences, and if there were, it would make the UX too complicated for real world usage. Thus, we chose what we believe will work best for the majority of people.

## See Also

* [DateInput Overview]({%slug components/dateinput/overview%})
* [Supported Date Formats]({%slug components/dateinput/supported-formats%})
