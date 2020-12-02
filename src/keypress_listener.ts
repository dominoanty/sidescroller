enum KeyPress {
    UP, DOWN, LEFT, RIGHT, UNKNOWN
}

interface KeyPressListener {
    onKeyPressed(keyPress: KeyPress);
}

function translateKeyPress(keyEvent: KeyboardEvent) : KeyPress {
    switch(keyEvent.keyCode) {
        case 87:
            return KeyPress.UP;
        case 83:
            return KeyPress.DOWN;
        case 65:
            return KeyPress.LEFT;
        case 68:
            return KeyPress.RIGHT;

    }
    return KeyPress.UNKNOWN;

}

export { KeyPressListener, KeyPress, translateKeyPress };