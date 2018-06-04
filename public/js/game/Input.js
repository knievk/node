/**
 * This class facilitates the tracking of user input, such as mouse clicks
 * and button presses.
 * @author alvin.lin.dev@gmail.com (Alvin Lin)
 */

/**
 * Empty constructor for the Input object.
 */
function Input() {
  throw new Error('Input should not be instantiated!');
}

/** @type {boolean} */
Input.LEFT_CLICK = false;
/** @type {boolean} */
Input.RIGHT_CLICK = false;
/** @type {Array<number>} */
Input.MOUSE = [0, 0];

/** @type {boolean} */
Input.LEFT = false;
/** @type {boolean} */
Input.UP = false;
/** @type {boolean} */
Input.RIGHT = false;
/** @type {boolean} */
Input.DOWN = false;
/** @type {Object<number, boolean>} */
Input.MISC_KEYS = {};

/**
 * This method is a callback bound to the onmousedown event
 * and updates the state of the mouse click stored in the Input class.
 * @param {Event} event The event passed to this function
 */
Input.onMouseDown = function(event) {
  if (event.which == 1) {
    Input.LEFT_CLICK = true;
  } else if (event.which == 3) {
    // This may fail depending on the browser as right click handling is
    // not universally supported.
    Input.RIGHT_CLICK = true;
  }
};

/**
 * This method is a callback bound to the onmouseup event on and
 * updates the state of the mouse click stored in the Input class.
 * @param {Event} event The event passed to this function.
 */
Input.onMouseUp = function(event) {
  if (event.which == 1) {
    Input.LEFT_CLICK = false;
  } else if (event.which == 3) {
    // This may fail depending on the browser as right click handling is
    // not universally supported.
    Input.RIGHT_CLICK = false;
  }
};

/**
 * This method is a callback bound to the onkeydown event on the document and
 * @param {Event} event The event passed to this function.
 * updates the state of the keys stored in the Input class.
 */
Input.onKeyDown = function(event) {
  switch (event.keyCode) {
    case 37:
    case 65:
      Input.LEFT = true;
      break;
    case 38:
    case 87:
      Input.UP = true;
      break;
    case 39:
    case 68:
      Input.RIGHT = true;
      break;
    case 40:
    case 83:
      Input.DOWN = true;
      break;
    default:
      Input.MISC_KEYS[event.keyCode] = true;
      break;
  }
};

/**
 * This method is a callback bound to the onkeyup event on the document and
 * updates the state of the keys stored in the Input class.
 * @param {Event} event The event passed to this function.
 */
Input.onKeyUp = function(event) {
  switch (event.keyCode) {
    case 37:
    case 65:
      Input.LEFT = false;
      break;
    case 38:
    case 87:
      Input.UP = false;
      break;
    case 39:
    case 68:
      Input.RIGHT = false;
      break;
    case 40:
    case 83:
      Input.DOWN = false;
      break;
    default:
      Input.MISC_KEYS[event.keyCode] = false;
  }
};

/**
 * This should be called during initialization to allow the Input
 * class to track user input.
 * @param {Element} element The element to apply the event listener to.
 */
Input.applyEventHandlers = function() {
  document.addEventListener('mousedown', Input.onMouseDown);
  document.addEventListener('mouseup', Input.onMouseUp);
  document.addEventListener('keyup', Input.onKeyUp);
  document.addEventListener('keydown', Input.onKeyDown);
};

/**
 * This should be called any time an element needs to track mouse coordinates
 * over it. The event listener will be applied to the entire document, but the
 * the coordinates will be taken relative to the given element (using the given
 * element's top left as [0, 0]).
 * @param {Element} element The element to take the coordinates relative to.
 */
Input.addMouseTracker = function(element) {
  document.addEventListener('mousemove', (event) => {
    Input.MOUSE = [event.pageX - element.offsetLeft,
                   event.pageY - element.offsetTop];
  });
};
