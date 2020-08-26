#resizing-reordering-logic

Resizing and reoredering tiles makes them snap to the dimensions of the rows and columns of the main element, and their size determines how they render - they are rendered in the first available slot that accommodates their current size, and then the next tile is rendered in the next available slot. This means that large tiles can leave small gaps that will not be filled in by tiles that do not come immediately after them, even if they are sufficiently small to fit in those gaps, and that dragging a large tile into a slot near the beginning where there is no room might not be possible.

#end