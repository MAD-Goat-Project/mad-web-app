import type { JSX } from 'react';
import React from 'react';
import DOMPurify from 'dompurify';

const VITE_OBJECT_STORAGE_BASE_URL = import.meta.env
  .VITE_OBJECT_STORAGE_BASE_URL;

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

  // Create a temporary div to parse the sanitized HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = sanitized;

  // Find all image elements and update their src attributes
  const images = tempDiv.querySelectorAll('img');

  images.forEach((image) => {
    const currentSrc = image.getAttribute('src');
    if (currentSrc) {
      const newSrc = `${VITE_OBJECT_STORAGE_BASE_URL}/${currentSrc}`;
      image.setAttribute('src', newSrc);
    }
  });
  // Convert the modified HTML back to a string
  const modifiedHTML = tempDiv.innerHTML;

  return <div dangerouslySetInnerHTML={{ __html: modifiedHTML }} />;
}

export default ParsedHTML;
