import React from 'react';

const useSyntheticEvents = () => {
  const [isHover, setIsHover] = React.useState();
  const [isActive, setIsActive] = React.useState();
  const [isFocus, setIsFocus] = React.useState();
  const [isTouch, setIsTouch] = React.useState();
  const [isInteracted, setIsInteracted] = React.useState();
  const onMouseEnter = React.useCallback(e => {
    setIsHover(true);
  }, []);
  const onMouseLeave = React.useCallback(e => {
    setIsHover(false);
  }, []);
  const onMouseDown = React.useCallback(e => {
    setIsActive(true);
  }, []);
  const onMouseUp = React.useCallback(e => {
    setIsActive(false);
  }, []);
  const onFocus = React.useCallback(e => {
    setIsFocus(true);
  }, []);
  const onBlur = React.useCallback(e => {
    setIsFocus(false);
  }, []);
  const onTouchStart = React.useCallback(e => {
    setIsTouch(true);
  }, []);
  const onTouchEnd = React.useCallback(e => {
    setIsTouch(false);
  }, []);
  // Pointer Events
  const onPointerEnter = React.useCallback(e => {
    setIsInteracted(true);
  }, []);
  const onPointerLeave = React.useCallback(e => {
    setIsInteracted(false);
  }, []);
  const onPointerDown = React.useCallback(e => {
    setIsInteracted(true);
  }, []);
  const onPointerUp = React.useCallback(e => {
    if (e.pointerType === 'touch') {
      setIsInteracted(false);
    }
  }, []);
  const element = React.useMemo(() => {
    return {
      isHover, isActive, isFocus, isTouch, isInteracted
    };
  }, [isHover, isActive, isFocus, isTouch, isInteracted]);
  const eventHandlers = React.useMemo(() => {
    return {
      onMouseEnter, onMouseLeave, onMouseDown, onMouseUp, onFocus, onBlur, onTouchStart, onTouchEnd, onPointerEnter, onPointerLeave, onPointerDown, onPointerUp
    };
  }, [onMouseEnter, onMouseLeave, onMouseDown, onMouseUp, onFocus, onBlur, onTouchStart, onTouchEnd, onPointerEnter, onPointerLeave, onPointerDown, onPointerUp]);
  return [element, eventHandlers];
};

export default useSyntheticEvents;