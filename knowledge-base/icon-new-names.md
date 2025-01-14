---
title: New Icon Names in Telerik UI for Blazor 4.0
description: List of renamed icons in Telerik UI for Blazor 4.0
type: troubleshooting
page_title: New Icon Names in Telerik UI for Blazor 4.0
slug: icon-kb-new-names
position: 
tags: telerik, blazor, icon
ticketid: 1594733
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product</td>
            <td>UI for Blazor</td>
        </tr>
        <tr>
            <td>Product Version</td>
            <td>4.x</td>
        </tr>
    </tbody>
</table>

## Description

[Telerik UI for Blazor version 4.0 renamed](slug://changes-in-4-0-0) some of the [built-in icons](slug://common-features-icons). Using the old icon names won't work and may produce errors, depending on the exact component configuration.

## Solution

>tip While the below listed names will render the proper icons, the recommended approach for declaring icons is to use `FontIcon` or `SvgIcon` followed by PascalCase for the icon name. See details in [Icons List](slug://common-features-icons#icons-list).

Here is a list of the renamed icons:

<table role="table">
<thead>
<tr>
<th>Icon name in 3.x</th>
<th>Icon name in 4.x</th>
</tr>
</thead>
<tbody>
<tr>
<td>arrow-45-up-right, collapse-ne, resize-ne</td>
<td>caret-tr</td>
</tr>
<tr>
<td>arrow-45-down-left, collapse-sw, resize-sw</td>
<td>caret-bl</td>
</tr>
<tr>
<td>arrow-45-up-left, collapse-nw, resize-nw</td>
<td>caret-tl</td>
</tr>
<tr>
<td>arrow-60-up, arrow-n, kpi-trend-increase, expand-n, sarrow-n</td>
<td>caret-alt-up</td>
</tr>
<tr>
<td>arrow-60-right, arrow-e, expand, expand-e, sarrow-e</td>
<td>caret-alt-right</td>
</tr>
<tr>
<td>arrow-60-down, arrow-s, kpi-trend-decrease, expand-s, collapse, sarrow-s</td>
<td>caret-alt-down</td>
</tr>
<tr>
<td>arrow-60-left, arrow-w, expand-w, sarrow-w</td>
<td>caret-alt-left</td>
</tr>
<tr>
<td>arrow-end-up, seek-n</td>
<td>caret-alt-to-top</td>
</tr>
<tr>
<td>arrow-end-right, seek-e</td>
<td>caret-alt-to-right</td>
</tr>
<tr>
<td>arrow-end-down, seek-s</td>
<td>caret-alt-to-bottom</td>
</tr>
<tr>
<td>arrow-end-left, seek-w</td>
<td>caret-alt-to-left</td>
</tr>
<tr>
<td>arrow-double-60-up, arrow-seek-up</td>
<td>caret-double-alt-up</td>
</tr>
<tr>
<td>arrow-double-60-right, arrow-seek-right, forward-sm</td>
<td>caret-double-alt-right</td>
</tr>
<tr>
<td>arrow-double-60-down, arrow-seek-down</td>
<td>caret-double-alt-down</td>
</tr>
<tr>
<td>arrow-double-60-left, arrow-seek-left, rewind-sm</td>
<td>caret-double-alt-left</td>
</tr>
<tr>
<td>arrows-kpi, kpi, caret-alt-sort</td>
<td>caret-alt-expand</td>
</tr>
<tr>
<td>arrow-chevron-up, arrowhead-n</td>
<td>chevron-up</td>
</tr>
<tr>
<td>arrow-chevron-right, arrowhead-e</td>
<td>chevron-right</td>
</tr>
<tr>
<td>arrow-chevron-down, arrowhead-s</td>
<td>chevron-down</td>
</tr>
<tr>
<td>arrow-chevron-left, arrowhead-w</td>
<td>chevron-left</td>
</tr>
<tr>
<td>arrow-drill</td>
<td>level-down</td>
</tr>
<tr>
<td>arrow-parent</td>
<td>level-up</td>
</tr>
<tr>
<td>arrow-root, level-root</td>
<td>level-to-top</td>
</tr>
<tr>
<td>arrows-resizing</td>
<td>col-resize</td>
</tr>
<tr>
<td>arrows-dimensions, dimension</td>
<td>arrows-axes</td>
</tr>
<tr>
<td>page-layout</td>
<td>layout-2-by-2</td>
</tr>
<tr>
<td>hamburger</td>
<td>menu</td>
</tr>
<tr>
<td>more-v, vbars</td>
<td>more-vertical</td>
</tr>
<tr>
<td>more-h, hbars</td>
<td>more-horizontal</td>
</tr>
<tr>
<td>root</td>
<td>home</td>
</tr>
<tr>
<td>undo-large</td>
<td>undo</td>
</tr>
<tr>
<td>redo-large</td>
<td>redo</td>
</tr>
<tr>
<td>reset</td>
<td>arrow-rotate-ccw</td>
</tr>
<tr>
<td>reload, refresh, recurrence, arrows-repeat</td>
<td>arrow-rotate-cw</td>
</tr>
<tr>
<td>non-recurrence, refresh-clear</td>
<td>arrows-no-repeat</td>
</tr>
<tr>
<td>reset-sm</td>
<td>arrow-rotate-ccw-small</td>
</tr>
<tr>
<td>reload-sm, refresh-sm, recurrence-sm, arrows-repeat-sm</td>
<td>arrow-rotate-cw-small</td>
</tr>
<tr>
<td>floppy</td>
<td>save</td>
</tr>
<tr>
<td>printer</td>
<td>print</td>
</tr>
<tr>
<td>edit</td>
<td>pencil</td>
</tr>
<tr>
<td>delete</td>
<td>trash</td>
</tr>
<tr>
<td>attachment, clip</td>
<td>paperclip</td>
</tr>
<tr>
<td>attachment-45, clip-45</td>
<td>paperclip-alt</td>
</tr>
<tr>
<td>link-horizontal, hyperlink, link-h</td>
<td>link</td>
</tr>
<tr>
<td>unlink-horizontal, hyperlink-remove, unlink-h</td>
<td>unlink</td>
</tr>
<tr>
<td>link-v</td>
<td>link-vertical</td>
</tr>
<tr>
<td>unlink-v</td>
<td>unlink-vertical</td>
</tr>
<tr>
<td>deny</td>
<td>cancel-outline</td>
</tr>
<tr>
<td>checkmark, tick</td>
<td>check</td>
</tr>
<tr>
<td>checkmark-outline, success</td>
<td>check-outline</td>
</tr>
<tr>
<td>checkmark-circle</td>
<td>check-circle</td>
</tr>
<tr>
<td>close, clear, times, group-delete</td>
<td>x</td>
</tr>
<tr>
<td>close-outline, clear-outline, times-outline, error</td>
<td>x-outline</td>
</tr>
<tr>
<td>close-circle, clear-circle, times-circle</td>
<td>x-circle</td>
</tr>
<tr>
<td>add</td>
<td>plus</td>
</tr>
<tr>
<td>add-outline</td>
<td>plus-outline</td>
</tr>
<tr>
<td>add-circle</td>
<td>plus-circle</td>
</tr>
<tr>
<td>kpi-trend-equal</td>
<td>minus</td>
</tr>
<tr>
<td>unsort</td>
<td>sort-clear</td>
</tr>
<tr>
<td>sort-asc-sm</td>
<td>sort-asc-small</td>
</tr>
<tr>
<td>sort-desc-sm</td>
<td>sort-desc-small</td>
</tr>
<tr>
<td>filter-sm</td>
<td>filter-small</td>
</tr>
<tr>
<td>filter-sort-asc-sm</td>
<td>filter-sort-asc-small</td>
</tr>
<tr>
<td>filter-sort-desc-sm</td>
<td>filter-sort-desc-small</td>
</tr>
<tr>
<td>sign-in</td>
<td>login</td>
</tr>
<tr>
<td>sign-out</td>
<td>logout</td>
</tr>
<tr>
<td>window-maximize, maximize</td>
<td>window</td>
</tr>
<tr>
<td>windows, tiles, restore</td>
<td>window-restore</td>
</tr>
<tr>
<td>minimize</td>
<td>window-minimize</td>
</tr>
<tr>
<td>cog, custom</td>
<td>gear</td>
</tr>
<tr>
<td>cogs</td>
<td>gears</td>
</tr>
<tr>
<td>settings</td>
<td>wrench</td>
</tr>
<tr>
<td>preview</td>
<td>eye</td>
</tr>
<tr>
<td>zoom</td>
<td>search</td>
</tr>
<tr>
<td>pan, move</td>
<td>arrows-move</td>
</tr>
<tr>
<td>shopping-cart</td>
<td>cart</td>
</tr>
<tr>
<td>splus</td>
<td>plus-sm</td>
</tr>
<tr>
<td>sminus</td>
<td>minus-sm</td>
</tr>
<tr>
<td>cursor</td>
<td>pointer</td>
</tr>
<tr>
<td>volume-low</td>
<td>volume-down</td>
</tr>
<tr>
<td>volume-high</td>
<td>volume-up</td>
</tr>
<tr>
<td>volume-off</td>
<td>volume-mute</td>
</tr>
<tr>
<td>subtitles</td>
<td>closed-captions</td>
</tr>
<tr>
<td>audio</td>
<td>music-notes</td>
</tr>
<tr>
<td>fav-outline, favorite-outline</td>
<td>heart-outline</td>
</tr>
<tr>
<td>fav, favorite</td>
<td>heart</td>
</tr>
<tr>
<td>bookmark-outline</td>
<td>star-outline</td>
</tr>
<tr>
<td>bookmark</td>
<td>star</td>
</tr>
<tr>
<td>shape-rect</td>
<td>checkbox</td>
</tr>
<tr>
<td>tri-state-indeterminate</td>
<td>checkbox-indeterminate</td>
</tr>
<tr>
<td>tri-state-null</td>
<td>checkbox-null</td>
</tr>
<tr>
<td>shape-circle</td>
<td>radiobutton</td>
</tr>
<tr>
<td>notification</td>
<td>bell</td>
</tr>
<tr>
<td>information, info, note</td>
<td>info-circle</td>
</tr>
<tr>
<td>question, help</td>
<td>question-circle</td>
</tr>
<tr>
<td>warning, exception</td>
<td>exclamation-circle</td>
</tr>
<tr>
<td>photo-camera</td>
<td>camera</td>
</tr>
<tr>
<td>photo</td>
<td>image</td>
</tr>
<tr>
<td>photo-export</td>
<td>image-export</td>
</tr>
<tr>
<td>flip-h</td>
<td>flip-horizontal</td>
</tr>
<tr>
<td>flip-v</td>
<td>flip-vertical</td>
</tr>
<tr>
<td>rotate-cw</td>
<td>rotate-right</td>
</tr>
<tr>
<td>rotate-ccw</td>
<td>rotate-left</td>
</tr>
<tr>
<td>paint, background</td>
<td>droplet</td>
</tr>
<tr>
<td>line</td>
<td>shape-line</td>
</tr>
<tr>
<td>saturation</td>
<td>sliders</td>
</tr>
<tr>
<td>opacity</td>
<td>transparency</td>
</tr>
<tr>
<td>shape</td>
<td>shapes</td>
</tr>
<tr>
<td>front-element</td>
<td>bring-to-front</td>
</tr>
<tr>
<td>back-element</td>
<td>bring-to-back</td>
</tr>
<tr>
<td>forward-element</td>
<td>bring-forward</td>
</tr>
<tr>
<td>backward-element</td>
<td>bring-backward</td>
</tr>
<tr>
<td>align-left-element</td>
<td>align-self-start</td>
</tr>
<tr>
<td>align-center-element</td>
<td>align-self-center</td>
</tr>
<tr>
<td>align-right-element</td>
<td>align-self-end</td>
</tr>
<tr>
<td>align-top-element</td>
<td>align-self-start-alt</td>
</tr>
<tr>
<td>align-middle-element</td>
<td>align-self-center-alt</td>
</tr>
<tr>
<td>align-bottom-element</td>
<td>align-self-end-alt</td>
</tr>
<tr>
<td>full-screen, fullscreen-enter</td>
<td>fullscreen</td>
</tr>
<tr>
<td>full-screen-exit</td>
<td>fullscreen-exit</td>
</tr>
<tr>
<td>reset-color, paint-remove, background-remove</td>
<td>droplet-slash</td>
</tr>
<tr>
<td>images, gallery</td>
<td>photos</td>
</tr>
<tr>
<td>align-stretch-element-horizontal</td>
<td>align-self-stretch</td>
</tr>
<tr>
<td>align-stretch-element-vertical</td>
<td>align-self-stretch-alt</td>
</tr>
<tr>
<td>align-left-elements</td>
<td>align-items-start</td>
</tr>
<tr>
<td>align-center-elements</td>
<td>align-items-center</td>
</tr>
<tr>
<td>align-right-elements</td>
<td>align-items-end</td>
</tr>
<tr>
<td>align-stretch-elements-horizontal</td>
<td>align-items-stretch</td>
</tr>
<tr>
<td>align-baseline-horizontal</td>
<td>align-items-baseline</td>
</tr>
<tr>
<td>align-top-elements</td>
<td>align-items-start-alt</td>
</tr>
<tr>
<td>align-middle-elements</td>
<td>align-items-center-alt</td>
</tr>
<tr>
<td>align-bottom-elements</td>
<td>align-items-end-alt</td>
</tr>
<tr>
<td>align-stretch-elements-vertical</td>
<td>align-items-stretch-alt</td>
</tr>
<tr>
<td>align-baseline-vertical</td>
<td>align-items-baseline-alt</td>
</tr>
<tr>
<td>justify-start-horizontal</td>
<td>justify-content-start</td>
</tr>
<tr>
<td>justify-center-horizontal</td>
<td>justify-content-center</td>
</tr>
<tr>
<td>justify-end-horizontal</td>
<td>justify-content-end</td>
</tr>
<tr>
<td>justify-between-horizontal</td>
<td>justify-content-between</td>
</tr>
<tr>
<td>justify-around-horizontal</td>
<td>justify-content-around</td>
</tr>
<tr>
<td>justify-start-vertical</td>
<td>justify-content-start-alt</td>
</tr>
<tr>
<td>justify-center-vertical</td>
<td>justify-content-center-alt</td>
</tr>
<tr>
<td>justify-end-vertical</td>
<td>justify-content-end-alt</td>
</tr>
<tr>
<td>justify-between-vertical</td>
<td>justify-content-between-alt</td>
</tr>
<tr>
<td>justify-around-vertical</td>
<td>justify-content-around-alt</td>
</tr>
<tr>
<td>page-properties</td>
<td>file-wrench</td>
</tr>
<tr>
<td>text</td>
<td>foreground-color</td>
</tr>
<tr>
<td>strike-through</td>
<td>strikethrough</td>
</tr>
<tr>
<td>sub-script</td>
<td>subscript</td>
</tr>
<tr>
<td>sup-script, superscript</td>
<td>supscript</td>
</tr>
<tr>
<td>list-numbered, insert-ordered-list</td>
<td>list-ordered</td>
</tr>
<tr>
<td>list-bulleted, insert-unordered-list</td>
<td>list-unordered</td>
</tr>
<tr>
<td>indent-increase</td>
<td>indent</td>
</tr>
<tr>
<td>indent-decrease</td>
<td>outdent</td>
</tr>
<tr>
<td>insert-up, insert-n</td>
<td>insert-top</td>
</tr>
<tr>
<td>insert-m</td>
<td>insert-middle</td>
</tr>
<tr>
<td>insert-down, insert-s</td>
<td>insert-bottom</td>
</tr>
<tr>
<td>justify-left</td>
<td>align-left</td>
</tr>
<tr>
<td>justify-center</td>
<td>align-center</td>
</tr>
<tr>
<td>justify-left</td>
<td>align-right</td>
</tr>
<tr>
<td>justify-full</td>
<td>align-justify</td>
</tr>
<tr>
<td>justify-clear</td>
<td>align-remove</td>
</tr>
<tr>
<td>rule-horizontal, hr</td>
<td>horizontal-rule</td>
</tr>
<tr>
<td>all-borders</td>
<td>borders-all</td>
</tr>
<tr>
<td>outside-borders</td>
<td>borders-outside</td>
</tr>
<tr>
<td>inside-borders</td>
<td>borders-inside</td>
</tr>
<tr>
<td>border-inside-h, inside-horizontal-borders</td>
<td>borders-inside-horizontal</td>
</tr>
<tr>
<td>borders-inside-v, inside-vertical-borders</td>
<td>borders-inside-vertical</td>
</tr>
<tr>
<td>top-border</td>
<td>border-top</td>
</tr>
<tr>
<td>bottom-border</td>
<td>border-bottom</td>
</tr>
<tr>
<td>left-border</td>
<td>border-left</td>
</tr>
<tr>
<td>right-border</td>
<td>border-right</td>
</tr>
<tr>
<td>border-no, no-borders</td>
<td>borders-none</td>
</tr>
<tr>
<td>border</td>
<td>form</td>
</tr>
<tr>
<td>dictionary-add</td>
<td>book</td>
</tr>
<tr>
<td>image-light-dialog, image-insert, insert-image</td>
<td>image-add</td>
</tr>
<tr>
<td>comments-remove-all</td>
<td>comments-remove</td>
</tr>
<tr>
<td>find-and-replace, find</td>
<td>binoculars</td>
</tr>
<tr>
<td>files</td>
<td>copy</td>
</tr>
<tr>
<td>paste</td>
<td>clipboard</td>
</tr>
<tr>
<td>paste-as-html</td>
<td>clipboard-code</td>
</tr>
<tr>
<td>paste-from-word</td>
<td>clipboard-word</td>
</tr>
<tr>
<td>paste-from-word-strip-file</td>
<td>clipboard-word-alt</td>
</tr>
<tr>
<td>paste-html</td>
<td>clipboard-html</td>
</tr>
<tr>
<td>paste-markdown</td>
<td>clipboard-markdown</td>
</tr>
<tr>
<td>paste-plain-text</td>
<td>clipboard-text</td>
</tr>
<tr>
<td>clearformat</td>
<td>clear-css</td>
</tr>
<tr>
<td>style-builder</td>
<td>building-blocks</td>
</tr>
<tr>
<td>module-manager, puzzle</td>
<td>puzzle-piece</td>
</tr>
<tr>
<td>hyperlink-light-dialog, hyperlink-insert</td>
<td>link-add</td>
</tr>
<tr>
<td>hyperlink-globe</td>
<td>globe-link</td>
</tr>
<tr>
<td>hyperlink-globe-remove</td>
<td>globe-unlink</td>
</tr>
<tr>
<td>hyperlink-email</td>
<td>envelope-link</td>
</tr>
<tr>
<td>table-light-dialog, table-insert, create-table</td>
<td>table-add</td>
</tr>
<tr>
<td>add-column-left</td>
<td>table-column-insert-left</td>
</tr>
<tr>
<td>add-column-right</td>
<td>table-column-insert-right</td>
</tr>
<tr>
<td>add-row-above</td>
<td>table-row-insert-above</td>
</tr>
<tr>
<td>add-row-below</td>
<td>table-row-insert-below</td>
</tr>
<tr>
<td>delete-column</td>
<td>table-column-delete</td>
</tr>
<tr>
<td>delete-row</td>
<td>table-row-delete</td>
</tr>
<tr>
<td>merge-cells</td>
<td>cells-merge</td>
</tr>
<tr>
<td>cells-merge-h, merge-horizontally</td>
<td>cells-merge-horizontally</td>
</tr>
<tr>
<td>cells-merge-v, merge-vertically</td>
<td>cells-merge-vertically</td>
</tr>
<tr>
<td>cells-split-h</td>
<td>cell-split-horizontally</td>
</tr>
<tr>
<td>cells-split-v</td>
<td>cell-split-vertically</td>
</tr>
<tr>
<td>normal-layout</td>
<td>table-unmerge</td>
</tr>
<tr>
<td>freeze-pane</td>
<td>pane-freeze</td>
</tr>
<tr>
<td>freeze-row</td>
<td>row-freeze</td>
</tr>
<tr>
<td>col-freeze, freeze-col</td>
<td>column-freeze</td>
</tr>
<tr>
<td>fx</td>
<td>formula-fx</td>
</tr>
<tr>
<td>currency</td>
<td>dollar</td>
</tr>
<tr>
<td>format-number</td>
<td>custom-format</td>
</tr>
<tr>
<td>increace-decimal</td>
<td>decimal-increase</td>
</tr>
<tr>
<td>decrease-decimal</td>
<td>decimal-decrease</td>
</tr>
<tr>
<td>marker-pin</td>
<td>map-marker</td>
</tr>
<tr>
<td>marker-pin-target</td>
<td>map-marker-target</td>
</tr>
<tr>
<td>email, letter</td>
<td>envelope</td>
</tr>
<tr>
<td>email-box, letter-box</td>
<td>envelope-box</td>
</tr>
<tr>
<td>fields-more</td>
<td>folder-more</td>
</tr>
<tr>
<td>file-vertical, page-portrait, file-v</td>
<td>file</td>
</tr>
<tr>
<td>insert-file</td>
<td>file-add</td>
</tr>
<tr>
<td>txt</td>
<td>file-txt</td>
</tr>
<tr>
<td>csv</td>
<td>file-csv</td>
</tr>
<tr>
<td>file-xls, excel, xls, xlsa</td>
<td>file-excel</td>
</tr>
<tr>
<td>file-doc, word, doc</td>
<td>file-word</td>
</tr>
<tr>
<td>mdb</td>
<td>file-mdb</td>
</tr>
<tr>
<td>ppt</td>
<td>file-ppt</td>
</tr>
<tr>
<td>pdf, pdfa</td>
<td>file-pdf</td>
</tr>
<tr>
<td>psd</td>
<td>file-psd</td>
</tr>
<tr>
<td>flash</td>
<td>file-flash</td>
</tr>
<tr>
<td>config</td>
<td>file-config</td>
</tr>
<tr>
<td>ascx</td>
<td>file-ascx</td>
</tr>
<tr>
<td>bac</td>
<td>file-bac</td>
</tr>
<tr>
<td>zip</td>
<td>file-zip</td>
</tr>
<tr>
<td>html, source-code, view-source</td>
<td>code</td>
</tr>
<tr>
<td>page-landscape, file-h</td>
<td>file-horizontal</td>
</tr>
<tr>
<td>file-validation</td>
<td>file-error</td>
</tr>
<tr>
<td>files-validation</td>
<td>files-error</td>
</tr>
<tr>
<td>table-position-left</td>
<td>table-position-start</td>
</tr>
<tr>
<td>table-position-right</td>
<td>table-position-end</td>
</tr>
</tbody>
</table>

## See Also

* [Breaking Changes in Telerik UI for Blazor 4.0](slug://changes-in-4-0-0)
