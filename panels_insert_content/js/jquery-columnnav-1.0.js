/**
 *  jQuery Column Navigation Plugin
 *	
 *	version 1.0.0
 *	
 *	Written by Sam Clark
 *	http://sam.clark.name
 *	
 *
 *	!!! NOTICE !!!
 *	This library and related library requires jQuery 1.2.6 or higher
 *	http://www.jquery.com
 *
 *	This library requires the ScrollTo plugin for jQuery by Flesler
 *	http://plugins.jquery.com/project/ScrollTo
 *
 *	The MIT License
 *
 *	Copyright (c) 2008 Polaris Digital Limited
 *
 *	Permission is hereby granted, free of charge, to any person obtaining a copy
 *	of this software and associated documentation files (the "Software"), to deal
 *	in the Software without restriction, including without limitation the rights
 *	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *	copies of the Software, and to permit persons to whom the Software is
 *	furnished to do so, subject to the following conditions:
 *
 *	The above copyright notice and this permission notice shall be included in
 *	all copies or substantial portions of the Software.
 *
 *	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *	THE SOFTWARE.
 *
 *
 *	Quick Example
 *	=============================================================================
 *	
 *	The column navigation plugin is very quick an easy to use. It provides a very
 *	fast way to arrange and interface with large hierarchial sets of data in a
 *	familiar interface, especially for Mac OS X users.
 *	
 *	You require a unordered list currently (more to follow in later versions) with
 *	nested unordered lists. Each nesting will create a new level within the tree.
 *	
 *	HTML Example
 *	------------
 *	
 *	<html>
 *	<body>
 *	<div id="myTree">
 *		<ul>
 *			<div>	<!-- required to allow scrolling within each column -->
 *				<li>
 *					<a href="./">Homepage</a>
 *					<ul>
 *						<div>
 *							<li><a href="./contact">Contact</a></li>
 *							<li><a href="./tsandcs">Terms &amp; Conditions</a></li>
 *							<li><a href="./privacy">Privacy information</a></li>
 *						</div>
 *					</ul>
 *				</li>
 *				<li>
 *					<a href="./contents">Contents</a>
 *					<ul>
 *						<div>
 *							<li><a href="./page1/">Page 1</a></li>
 *							<li>
 *								<a href="./page2/">Page 2</a>
 *								<ul>
 *									<div>
 *									<li><a href="./page2.1/">Page 2.1</a></li>
 *									<li><a href="./page2.2/">Page 2.2</a></li>
 *									</div>
 *								</ul>
 *							</li>
 *							<li><a href="./page3/">Page 3</a></li>
 *						</div>
 *					</ul>
 *				</li>
 *			</div>
 *		</ul>
 *	</div>
 *	</body>
 *	</html>
 *	
 *	
 *	Javascript Example
 *	------------------
 *	
 *	$("div#myTree").columnNavigation();
 *	
 *	
 *	Options
 *	-------
 *	This plugin takes a large number of configuration options, all are defaulted for quick access.
 *	You can control the styling properties of almost every attribute of style and animation.
 *	
 *	All configuration items should be declared on initialisation.
 *	
 *	---
 *	
 *	$("div#myTree").conlumnNavigation({
 *		containerBackgroundColor	: "rgb(255,255,255)",
 *		columnFontFamily			: "Arial,sans-serif",
 *		columnScrollVelocity		: 400,
 *		callBackFunction			: function() {
 *			alert( $(linkObject).attr("href") );
 *		}
 *	});
 *	
 *	---
 *	
 *	The example above sets some attributes on the column navigation object.
 *	
 *	Notice the callBackFunction. You can attach an additional function to act.
 *	The callback function can be called on the dblClick event if you supply one, the
 *	'a' element is passed as the object to your handler.
 *
 **/

(function($){
	$.fn.columnNavigation = function( configuration )
	{		
		// Setup the column navigation object with configuration settings
		// Overright existing settings where applicable
		configuration = $.extend({
			containerPosition:"relative",
			containerTop:"",
			containerLeft:"",
			containerPadding:"0",
			containerMargin:"0",
			containerWidth:"400px",
			containerHeight:"250px",
			containerBackgroundColor:"",
			containerBackgroundImage:"",
			containerBackgroundRepeat:"",
			containerBackgroundPosition:"",
			containerBorder:"1px solid rgb(178,178,178)",
			columnWidth:250,
			columnHeight:"100%",
			columnFontFamily:"'Helvetica Neue', ''HelveticaNeue', Helvetica, sans-serif",
			columnFontSize:"90%",
			columnSeperatorStyle:"1px solid rgb(220,220,220)",
			columnDeselectFontWeight:"normal",
			columnDeselectColor:"rgb(50,50,50)",
			columnDeselectBackgroundColor:"",
			columnDeselectBackgroundImage:"",
			columnDeselectBackgroundRepeat:"",
			columnDeselectBackgroundPosition:"",
			columnSelectFontWeight:"normal",
			columnSelectColor:"rgb(255,255,255)",
			columnSelectBackgroundColor:"rgb(27,115,213)",
			columnSelectBackgroundImage:"",
			columnSelectBackgroundRepeat:"",
			columnSelectBackgroundPosition:"",
			columnItemPadding:"3px 3px 5px 3px",
			columnScrollVelocity:200,
			callBackFunction:null
		}, configuration);
				
		// Setup the container space using the settings
		$(this).css({
			position:configuration.containerPosition,
			top:configuration.containerTop,
			left:configuration.containerLeft,
			padding:configuration.containerPadding,
			margin:configuration.containerMargin,
			width:configuration.containerWidth,
			height:configuration.containerHeight,
			backgroundColor:configuration.containerBackgroundColor,
			backgroundImage:configuration.containerBackgroundImage,
			backgroundPosition:configuration.containerBackgroundPosition,
			backgroundRepeat:configuration.containerBackgroundRepeat,
			border:configuration.containerBorder,
			overflowX:"scroll",
			whiteSpace: "nowrap"
		});
		
		// LI element deselect state
		var liDeselect = {
			backgroundColor:configuration.columnDeselectBackgroundColor,
			backgroundImage:configuration.columnDeselectBackgroundImage,
			backgroundRepeat:configuration.columnDeselectBackgroundRepeat,
			backgroundPosition:configuration.columnDeselectBackgroundPosition
		};
		
		// LI element select state
		var liSelect = {
			backgroundColor:configuration.columnSelectBackgroundColor,
			backgroundImage:configuration.columnSelectBackgroundImage,
			backgroundRepeat:configuration.columnSelectBackgroundRepeat,
			backgroundPosition:configuration.columnSelectBackgroundPosition			
		};
		
		// A element deselect state
		var aDeselect = {
			color:configuration.columnDeselectColor,
			fontFamily:configuration.columnFontFamily,
			fontSize:configuration.columnFontSize,
			textDecoration:"none",
			fontWeight:"normal",
			outline:"none",
			width:"100%",
			display:"block"
		};
		
		// A element select state
		var aSelect = {
			color:configuration.columnSelectColor,
			textDecoration:"none"
		};
		
		// Discover the real container position
		var containerPosition = $(this).offset();
		var containerSize = $(this).width();
				
		// Setup the column width as a string (for CSS)
		var columnWidth = configuration.columnWidth + "px";
		
		var myself = $(this);	
		
		myself.children("ul").css({
			display:"inline-block",
			whiteSpace: "normal"
		});
		
		// Hide and layout children beneath the first level
		$(this).find("ul li").find("ul").hide();

		// Style the columns
		$(this).find("ul").css({
			width:columnWidth,
			height:configuration.columnHeight,
			overflowY:"scroll",
			borderRight:configuration.columnSeperatorStyle,
			padding:"0",
			margin:"0"
		});
		
		// Ensure each level can scroll within the container
		$(this).find("ul>div").css({
			height:"100%",
			overflowX:"hidden",
			overflowY:"auto"
		});
				
		// Style the internals
		$(this).find("ul li").css({
			listStyle:"none",
			padding:configuration.columnItemPadding,
			backgroundColor:configuration.columnDeselectBackgroundColor,
			backgroundImage:configuration.columnDeselectBackgroundImage,
			backgroundRepeat:configuration.columnDeselectBackgroundRepeat,
			backgroundPosition:configuration.columnDeselectBackgroundPosition
		});
		
		// Style the unselected links (this overrides specific CSS styles on the page)
		$(this).find("ul li span.uicni").css(
			aDeselect
			);		
		
		// Setup the onclick function for each link within the tree
		$(this).delegate("span.uicni","click", function() {

			// Discover where this element is on the page
			var licoords = $(this).parent().offset();			// li position
			
			// Hide lower levels
			$(this).parent().siblings().find("ul").hide();
			
			// Deselect other levels
			$(this).parent().siblings().css( liDeselect );
			
			parentColumn = $(this).parent().parent();
			
			// Remove the next column
			parentColumn.nextAll().remove();
			
			// Deselect other levels children
			$(this).parent().siblings().find("li").css( liDeselect );
			
			// Deselect other a links
			$(this).parent().siblings().find("span.uicni").css( aDeselect );
			
			// Show child menu
			childMenu = $(this).parent().children("ul");
			childMenu.clone(true).appendTo(myself).show().css({
				display: "inline-block",
				whiteSpace: "normal"
			});
			
			// Select this level
			$(this).parent().css( liSelect );
			
			// Highlight the text if required
			$(this).css( aSelect );
			
			// Add scrolling if required
			if( (licoords.left - containerPosition.left + ( ( configuration.columnWidth * 2 ) - 1 ) > containerSize ) )
			{	
				// Calculate differnce
				var difference = '+=' + (((licoords.left - containerPosition.left + ( ( configuration.columnWidth * 2 ) - 1) ) ) - containerSize );
				
				scrollToLocale( difference );
			}
			
			
			// return false;
		});
		//$(this).find("ul li a").click(function() {console.log("click on link")});
		
		/*
		// Double decides on task.

		$(this).find("ul li a").dblclick( function() {
			
			// If there is no callback function, use the existing link
			if( configuration.callBackFunction == null )
			{
				window.location = $(this).attr("href");
			}
			else
			{
			// Otherwise attach this link to a variable and send it to the callBackFunction for processing
				var linkObject = $(this);
				configuration.callBackFunction( linkObject );
			}
		});
		*/
		// Scrolls the main view
		function scrollToLocale( difference )
		{
			myself.scrollTo( difference, configuration.columnScrollVelocity, {axis:'x'} );			
		}
	}
})
(jQuery);
