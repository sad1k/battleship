export const makeEvent = (cell: Element, user: boolean, time: number = 1000): number | undefined => {
  if (user) {
    cell.dispatchEvent(
      new window.MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
        metaKey: false,
      })
    );
  } else {
    return setTimeout(() => {
      cell.dispatchEvent(
        new window.MouseEvent("click", {
          bubbles: true,
          cancelable: true,
          view: window,
          metaKey: true,
        })
      );
    }, time);
  }
};

