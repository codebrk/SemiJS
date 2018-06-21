# SemiJS is a Simple JavaScript DOM library.

**[.add()](#add)** Create a new SemiJS object with elements added to the set of matched elements.

**[.addClass()](#addClass)** Adds the specified class(es) to each element in the set of matched elements.

**[.after()](#after)** Insert content, specified by the parameter, after each element in the set of matched elements.

**[.append()](#append)** Insert content, specified by the parameter, to the end of each element in the set of matched elements.

**[.attr()](#attr)** Get the value of an attribute for the first element in the set of matched elements.

**[.before()](#before)** Insert content, specified by the parameter, before each element in the set of matched elements.

**[.bind()](#bind)** Attach a handler to an event for the elements.




<h1 id="add">.add()</h1>
Create a new SemiJS object with elements added to the set of matched elements.

* **.add( selector )**

> A string representing a selector expression to find additional elements to add to the set of matched elements.

* **.add( elements )**

> One or more elements to add to the set of matched elements.

* **.add( html )**

> An HTML fragment to add to the set of matched elements.

* **.add( selection )**

> An existing SemiJS object to add to the set of matched elements.


```js
$( "p" ).add( "div" ).addClass( "widget" );
var pdiv = $( "p" ).add( "div" );
```

The add method works on the current object, so you can also call anytime on SemiJS object. That will add given elements.

```js
var pdiv = $( "p" );
pdiv.add( "div" );
```

<h1 id="addClass">.addClass()</h1>

Adds the specified class(es) to each element in the set of matched elements.

* **.addClass( className )**

> One or more space-separated classes to be added to the class attribute of each matched element.

* **.addClass( function )**

> A function returning one or more space-separated class names to be added to the existing class name(s). Receives the index position of the element in the set and the existing class name(s) as arguments. Within the function, this refers to the current element in the set.

More than one class may be added at a time, separated by a space, to the set of matched elements, like so:

```js
$( "p" ).addClass( "myClass yourClass" );
```

This method is often used with `.removeClass()` to switch elements' classes from one to another, like so:

```js
$( "p" ).removeClass( "myClass noClass" ).addClass( "yourClass" );
```

Here, the `myClass` and `noClass` classes are removed from all paragraphs, while `yourClass` is added.

```js
$( "ul li" ).addClass(function( index ) {
  return "item-" + index;
});
```

Given an unordered list with two `<li>` elements, this example adds the class "item-0" to the first `<li>` and "item-1" to the second.




<h1 id="after">.after()</h1>

Insert content, specified by the parameter, after each element in the set of matched elements.

* **.after( content )**

> HTML string, DOM element, text node, array of elements and text nodes, or SemiJS object to insert after each element in the set of matched elements.

```js
$( "p" ).after( $( "h2" ) );
```

> Given element will be cloned and added to every element after



<h1 id="append">.append()</h1>

Insert content, specified by the parameter, to the end of each element in the set of matched elements.

* **.append( content )**

> DOM element, text node, array of elements and text nodes, HTML string, or jQuery object to insert at the end of each element in the set of matched elements.

* **.append( function )**

> A function that returns an HTML string, DOM element(s), text node(s), or jQuery object to insert at the end of each element in the set of matched elements. Receives the index position of the element in the set and the old HTML value of the element as arguments. Within the function, this refers to the current element in the set.

```js
$( ".inner" ).append( "<p>Test</p>" );
$( ".container" ).append( $( "h2" ) );
```


<h1 id="attr">.attr()</h1>

Get the value of an attribute for the first element in the set of matched elements.

* **.attr( key, [value] )**

> The name of the attribute to get or give a value to set.

```js
var title = $( "em" ).attr( "title" );
$( "div" ).text( title );
```


<h1 id="before">.before()</h1>

Insert content, specified by the parameter, before each element in the set of matched elements.



<h1 id="bind">.bind()</h1>

* **.bind( eventType [, eventData ], handler )**

```js
$( "#foo" ).bind( "mouseenter mouseleave", function() {
  $( this ).toggleClass( "entered" );
});
```