import React from 'react';

const useDragEvents = (onFilesDrop) => {
  const [isDragOver, setIsDragOver] = React.useState();
  const [dragTargetEnter, setDragTargetEnter] = React.useState();
  const onDragEnter = React.useCallback(e => {
    e.preventDefault();
    e.stopPropagation();
    setDragTargetEnter(e.target);
    setIsDragOver(true);
  }, []);
  const onDragLeave = React.useCallback(e => {
    e.preventDefault();
    e.stopPropagation();
    if (e.target === dragTargetEnter) {
      setIsDragOver(false);
    }
  }, [dragTargetEnter]);
  const onDragOver = React.useCallback(e => {
    e.preventDefault();
    e.stopPropagation();
  }, []);
  const onDrop = React.useCallback(e => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    onFilesDrop(e.dataTransfer.items, e.dataTransfer.files);
  }, [onFilesDrop]);
  const eventHandlers = React.useMemo(() => {
    return {
      onDragEnter, onDragLeave, onDragOver, onDrop
    };
  }, [onDragEnter, onDragLeave, onDragOver, onDrop]);
  return [isDragOver, eventHandlers];
};

export default useDragEvents;