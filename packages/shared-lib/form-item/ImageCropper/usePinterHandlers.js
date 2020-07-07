import React from 'react';

const eventToCoor = e => {
  var rect = e.target.getBoundingClientRect();
  var x = (e.clientX - rect.left) / rect.width; //x position within the element.
  var y = (e.clientY - rect.top) / rect.height; //y position within the element.
  return { x, y };
};

const usePointerHandlers = () => {
  const [anchor, setAnchor] = React.useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = React.useState(false);
  const [offset, setOffset] = React.useState({ x: 0, y: 0 });
  const [zoomOffset, setZoomOffset] = React.useState({ x: 0, y: 0 });
  const [move, setMove] = React.useState({ x: 0, y: 0 });
  const onPointerDown = React.useCallback(e => {
    setAnchor(eventToCoor(e));
    setMove({ x: 0, y: 0 });
    setIsMoving(true);
  }, []);

  const onPointerMove = React.useCallback(e => {
    const movedCoor = eventToCoor(e);
    if (isMoving) {
      const moved = {
        x: movedCoor.x - anchor.x,
        y: movedCoor.y - anchor.y
      };
      setMove({
        x: moved.x,
        y: moved.y
      });
    }
  }, [isMoving, anchor.x, anchor.y]);

  const save = React.useCallback(e => {
    if (isMoving) {
      setOffset(preOffset => {
        return {
          x: preOffset.x + move.x,
          y: preOffset.y + move.y
        };
      });
      setMove({ x: 0, y: 0 });
      setIsMoving(false);
    }

  }, [isMoving, move.x, move.y]);

  const onPointerUp = React.useCallback(e => {
    save(e);
  }, [save]);
  const onPointerLeave = React.useCallback(e => {
    save(e);
  }, [save]);

  return {
    anchor,
    setAnchor,
    isMoving,
    offset,
    setOffset,
    zoomOffset,
    setZoomOffset,
    move,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerLeave
  };
};

export default usePointerHandlers;