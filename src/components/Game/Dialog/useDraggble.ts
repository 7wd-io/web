export function useDraggble(selector: string) {
  return {
    onMouseDown: (event: MouseEvent) => {
      const node = document.querySelector(selector) as HTMLElement;

      const shiftX = event.clientX - node.getBoundingClientRect().left;
      const shiftY = event.clientY - node.getBoundingClientRect().top;

      function moveAt(x: number, y: number) {
        node.style.position = 'fixed';
        node.style.left = `${x - shiftX}px`;
        node.style.top = `${y - shiftY}px`;
      }

      moveAt(event.pageX, event.pageY);

      function onMouseMove(e1: MouseEvent) {
        moveAt(e1.pageX, e1.pageY);
      }

      document.addEventListener('mousemove', onMouseMove);

      node.onmouseup = function fn() {
        document.removeEventListener('mousemove', onMouseMove);
        node.onmouseup = null;
      };
    },
  };
}
