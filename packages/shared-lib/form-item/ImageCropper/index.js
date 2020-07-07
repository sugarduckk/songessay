import React from 'react';
import Label from '../Label';
import FormItemErrorMessage from '../FormItemErrorMessage';
import ImageCropperContainer from './ImageCropperContainer';
import ImageArea from './ImageArea';
import BrowseFileButton from '../FileUploader/BrowseFileButton';
import ImageAreaContainer from './ImageAreaContainer';
import AnotherContainer from './AnotherContainer';
import usePointerHandlers from './usePinterHandlers';
import ZoomBar from './ZoomBar';
import useLoadImgEffect from './useLoadImgEffect';

const maxZoom = 4;

const ImageCropper = ({ name, label, error, value, handleChange }) => {
  const { img, crop } = value || {};
  const [dim, setDim] = React.useState();
  const { anchor, isMoving, offset, setOffset, zoomOffset, setZoomOffset, move, ...pointerHandlers } = usePointerHandlers();
  const [zoom, setZoom] = React.useState(0);
  const canvasRef = React.useRef();
  useLoadImgEffect(img, setDim);
  React.useEffect(() => {
    if (dim) {
      const { cDim, bDim, iDim } = dim;
      const { x: moveX, y: moveY } = move;
      const { x: offsetX, y: offsetY } = offset;
      var ctx = canvasRef.current.getContext('2d');
      canvasRef.current.width = cDim.width;
      canvasRef.current.height = cDim.height;

      // image position
      var mul = (1 + (zoom * maxZoom / 100));
      var zwidth = iDim.width * mul;
      var zheight = iDim.height * mul;

      var extraX = (offsetX + moveX + zoomOffset.x) * cDim.width;
      var extraY = (offsetY + moveY + zoomOffset.y) * cDim.height;
      var zx, zy;
      zx = iDim.x + extraX;
      zy = iDim.y + extraY;

      var exceedX = false;
      var exceedY = false;
      var newOffsetX, newOffsetY;
      if (zx > bDim.x) {
        zx = bDim.x;
        newOffsetX = ((bDim.x - iDim.x) / cDim.width) - moveX - zoomOffset.x;
        exceedX = true;
      }
      else if (zx + zwidth < bDim.x + bDim.width) {
        zx = bDim.x + bDim.width - zwidth;
        newOffsetX = ((bDim.x + bDim.width - zwidth - iDim.x) / cDim.width) - moveX - zoomOffset.x;
        exceedX = true;
      }
      if (zy > bDim.y) {
        zy = bDim.y;
        newOffsetY = ((bDim.y - iDim.y) / cDim.height) - moveY - zoomOffset.y;
        exceedY = true;
      }
      else if (zy + zheight < bDim.y + bDim.height) {
        zy = bDim.y + bDim.height - zheight;
        newOffsetY = ((bDim.y + bDim.height - zheight - iDim.y) / cDim.height) - moveY - zoomOffset.y;
        exceedY = true;
      }
      if (exceedX || exceedY) {
        setOffset(preOffset => {
          return {
            x: exceedX ? newOffsetX : preOffset.x,
            y: exceedY ? newOffsetY : preOffset.y
          };
        });
      }

      const m = img.width / zwidth;

      const newCrop = {
        x: (bDim.x - zx) * m,
        y: (bDim.y - zy) * m,
        width: bDim.width * m,
        height: bDim.height * m
      };
      if (JSON.stringify(crop) !== JSON.stringify(newCrop)) {
        handleChange(name, {
          crop: newCrop,
          img
        });
      }
      ctx.drawImage(img, 0, 0, img.width, img.height, zx, zy, zwidth, zheight);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.rect(0, 0, cDim.width, cDim.height);
      ctx.rect(bDim.x, bDim.y, bDim.width, bDim.height);
      ctx.fill("evenodd");
    }
  }, [img, move, offset, zoomOffset.x, zoomOffset.y, setOffset, zoom, dim, handleChange, name, value, crop]);
  const selectImage = React.useCallback(e => {
    const file = e.target.files[0];
    var image = new Image;
    image.onload = () => {
      handleChange(name, {
        crop,
        img: image
      });
    };
    image.src = URL.createObjectURL(file);
  }, [handleChange, name, crop]);
  const onZoom = React.useCallback(e => {
    const currentZoom = e.target.value;
    setZoom(preZoom => {
      setZoomOffset(preZoomOffset => {
        if (dim) {
          const { iDim, cDim, bDim } = dim;
          const { x: offsetX, y: offsetY } = offset;
          //preZoom
          var preMul = (1 + (preZoom * maxZoom / 100));
          var preZwidth = iDim.width * preMul;
          var preZheight = iDim.height * preMul;

          var mul = (1 + (currentZoom * maxZoom / 100));
          var zwidth = iDim.width * mul;
          var zheight = iDim.height * mul;

          var px = ((bDim.width / 2) - ((preZoomOffset.x + offsetX) * cDim.width)) / preZwidth;
          var py = ((bDim.height / 2) - ((preZoomOffset.y + offsetY) * cDim.height)) / preZheight;

          var tx = px * zwidth;
          var ty = py * zheight;

          var newZoomOffsetX = (((bDim.width / 2) - (tx)) / cDim.width) - offsetX;
          var newZoomOffsetY = (((bDim.height / 2) - (ty)) / cDim.height) - offsetY;
        }
        return {
          x: newZoomOffsetX,
          y: newZoomOffsetY
        };
      });
      return currentZoom;
    });
  }, [dim, setZoomOffset, offset]);
  return <>
    <Label htmlFor={label}>{label}</Label>
    <ImageCropperContainer>
      <AnotherContainer>
        <ImageAreaContainer>
          <ImageArea ref={canvasRef} {...pointerHandlers} hasTouchAction={img == undefined} />
        </ImageAreaContainer>
      </AnotherContainer>
      {img && <ZoomBar min="0" max="100" value={zoom} onChange={onZoom} />}
      <BrowseFileButton label={'select file'} accept={'.jpg,.jpeg,.png'} onChange={selectImage} multiple={false} />
    </ImageCropperContainer>
    {error && <FormItemErrorMessage>{error}</FormItemErrorMessage>}
  </>;
};

export default ImageCropper;