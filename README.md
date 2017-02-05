jquery.msgbox
===============

jQuery.msgbox is a lightweight jQuery plugin allowing you to append or prepend temporary messages to a box.

## Version
1.0

## Installation
* Include `jquery.msgbox.js` in your scripts after jquery.

## Properties
Enable the plugin on your selector by using the method :
`$('#selector').msgbox()`


### lines
`lines` must be an int. It's the maximum number of lines the box will display at a time.

### timer
`timer` must be an int. It's the number of milliseconds a message will appear. Can be set to null for unlimited display.

### direction
`direction` must be a string, either `append` or `prepend`. The `add` method will use this direction.

### onComplete
`onComplete` is an optional callback called after the initialization.

### animate
`animate` is a boolean. When set to true, elements will fade out instead of just disappearing.

## Methods

### add
Append or prepend a messageto the box and use an optional callback
`$('#selector').msgbox('add', 'message', callback)`

### prepend
Prepend an element and allows a callback.
`$('#selector').msgbox('prepend', 'message', callback)`

### append
Append an element and allows a callback.
`$('#selector').msgbox('append', 'message', callback)`

### empty
Empty the box and remove listeners
`$('#selector').msgbox('empty');

### destroy
Destroy the instance of msgbox then use an optional callback
`$('#selector').msgbox('destroy', callback);

### reset
Return to the initial state
`$('#selector').msgbox('reset');