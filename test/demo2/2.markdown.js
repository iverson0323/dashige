let fs = require('fs');
var text = null;
text = fs.readFileSync('2.md', 'utf8');
var md = require( "markdown" ).markdown;

// parse the markdown into a tree and grab the link references
var tree = md.parse( text ),
    refs = tree[ 1 ].references;

// iterate through the tree finding link references
( function find_link_refs( jsonml ) {
    if ( jsonml[ 0 ] === "link_ref" ) {
        var ref = jsonml[ 1 ].ref;

        // if there's no reference, define a wiki link
        if ( !refs[ ref ] ) {
            refs[ ref ] = {
                href: "http://en.wikipedia.org/wiki/" + ref.replace(/\s+/, "_" )
            };
        }
    }
    else if ( Array.isArray( jsonml[ 1 ] ) ) {
        jsonml[ 1 ].forEach( find_link_refs );
    }
    else if ( Array.isArray( jsonml[ 2 ] ) ) {
        jsonml[ 2 ].forEach( find_link_refs );
    }
} )( tree );

// convert the tree into html
var html = md.renderJsonML( md.toHTMLTree( tree ) );
console.log( html );

fs.writeFileSync('2.html', html, 'utf8');