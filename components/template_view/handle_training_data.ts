/**
 * @packageDocumentation
 * @module handleTrainingData
 */

const tableElements: string[] = ["table", "tr"];

/**
 * A function to dynamically retrieve table HTML associated with a OneNote page.
 * @category Helper Functions
 * @returns
 */
export default function retrieveHTML(html: string) {
  const parser = new DOMParser();
  const parsedHTML = parser.parseFromString(html, "text/html");

  const elements: any[] = [];
  tableElements.map((elementName) => {
    const getElements = parsedHTML.getElementsByTagName(elementName);

    for (let i = 0; i < getElements.length; i++) {
      const elementObject = {
        category: elementName,
        elements: getElements[i],
      };

      if (elementName === "tr") {
        elements.push({
          ...elementObject,
          elements: getElements[i].children,
        });

        continue;
      }

      elements.push({
        ...elementObject,
      });
    }
  });

  return {
    elements,
  };
}
