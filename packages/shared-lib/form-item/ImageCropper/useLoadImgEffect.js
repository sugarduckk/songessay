import React from 'react';

const canvasRatio = 1;
const padding = 0.1;

const useLoadImgEffect = (img, dimHandler) => {
  React.useEffect(() => {
    if (img) {
      const imgRatio = img.width / img.height;
      const portrait = imgRatio < canvasRatio;
      // determine canvas dimension
      var cWidth, cHeight;
      if (portrait) {
        cHeight = img.height;
        cWidth = canvasRatio * cHeight;
      }
      else {
        cWidth = img.width;
        cHeight = cWidth / canvasRatio;
      }
      // define box size
      var bx = padding * cWidth;
      var by = padding * cHeight;
      var bwidth = (1 - 2 * padding) * cWidth;
      var bheight = (1 - 2 * padding) * cHeight;
      // draw the image onto canvas
      var ix, iy, iwidth, iheight;

      if (portrait) {
        iwidth = bwidth;
        iheight = iwidth / imgRatio;
      }
      else {
        iheight = bheight;
        iwidth = bheight * imgRatio;
      }
      ix = (cWidth - iwidth) / 2;
      iy = (cHeight - iheight) / 2;
      dimHandler({
        cDim: {
          width: cWidth,
          height: cHeight
        },
        bDim: {
          x: bx,
          y: by,
          width: bwidth,
          height: bheight
        },
        iDim: {
          x: ix,
          y: iy,
          width: iwidth,
          height: iheight
        }
      });
    }
  }, [img, dimHandler]);
};

export default useLoadImgEffect;