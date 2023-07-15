import React from 'react';
import DOMPurify from 'dompurify';

/**
 * This component is used to parse HTML strings and render them as HTML.
 * Using this component is a security risk, so use it with caution.
 * dangerouslySetInnerHTML is used to render the HTML string, and DOMPurify is used to sanitize the string.
 * According to the React documentation: "This is dangerous. As with the underlying DOM innerHTML property, you must exercise extreme caution! Unless the markup is coming from a completely trusted source, it is trivial to introduce an XSS vulnerability this way."
 * @param str The HTML string to be parsed.
 * @returns A JSX element containing the parsed HTML.
 */
function ParsedHTML(str: string): JSX.Element {
  const sanitized = DOMPurify.sanitize(str);
  return <div dangerouslySetInnerHTML={{ __html: sanitized }} />;
}

export default ParsedHTML;
