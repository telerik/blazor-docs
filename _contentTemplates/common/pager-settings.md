#pager-settings
 
@[template](/_contentTemplates/common/parameters-table-styles.md#table-layout)

| Attribute | Type and Default Value | Description |
|----------|----------|----------|
|`Responsive` | `bool` <br/> (`true`) | Whether pager elements should change based on the screen size. When enabled, the Pager will hide its `Pager Info` and `PageSize Dropdownlist` if they cannot fit in the available space. In the smallest resolution, the page buttons will be rendered as a select element.
|`ButtonCount` | `int` <br/> (10) | The maximum number of page buttons that will be visible. To take effect, `ButtonCount` must be smaller than the page count (`ButtonCount < Total / PageSize`).
| `InputType` | `PagerInputType` <br/> (`Buttons`) | Whether the pager will show numeric buttons to go to a specific page, or a textbox to type the page index. The arrow buttons are always visible. The `PagerInputType` enum accepts values `Buttons`  or `Input`. When `Input` is used, the page index will change when the textbox is blurred, or when the user hits Enter. This is to avoid unintentional data requests.
| `PageSizes` | `List<int?>` | Allows users to change the page size via a DropDownList. The attribute configures the DropDownList options. A `null` item in the `PageSizes` `List` will render an "All" option. By default, the Pager DropDownList is not displayed. You can also set `PageSizes` to `null` programmatically to remove the DropDownList at any time.
| `Position` | `PagerPosition` enum <br/> (`PagerPosition.Bottom`) | The position of the Pager. The available options are `Top` and `Bottom`.
#end