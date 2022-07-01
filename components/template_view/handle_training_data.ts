const tableElements: string[] = ["table", "tr"];

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

  // const separateElements: any[] = [];
  // let numberOfRows: number = 0;
  // elements.map((element) => {
  //   for (let i = 0; i < element.elements.length; i++) {
  //     const text = element.elements[i].innerText.trim();
  //     if (text === "") continue;
  //     if (element.category === "tr") numberOfRows++;
  //     // Ugly code, but tr is the the table row and the iteration variable is used to identify which row the data belongs to
  //     const categoryName =
  //       element.category === "tr" ? `td_${i}` : element.category;
  //     const parsedElement = {
  //       category: categoryName,
  //       text: element.elements[i].innerText.trim,
  //     };

  //     separateElements.push(parsedElement);
  //   }
  // });

  return {
    numberOfRows: 0,
    elements,
  };
}
