import React, { useState } from 'react';
import PixelBlast from '../PixelBlast/PixelBlast';
import './PixelBlastPlayground.css';

const PixelBlastPlayground = () => {
  const [variant, setVariant] = useState('circle');
  const [pixelSize, setPixelSize] = useState(4);
  const [color, setColor] = useState('#B19EEF');
  const [patternScale, setPatternScale] = useState(2);
  const [patternDensity, setPatternDensity] = useState(1.0);
  const [pixelSizeJitter, setPixelSizeJitter] = useState(0.3);
  const [enableRipples, setEnableRipples] = useState(true);
  const [rippleSpeed, setRippleSpeed] = useState(0.4);
  const [rippleThickness, setRippleThickness] = useState(0.12);
  const [rippleIntensityScale, setRippleIntensityScale] = useState(1.5);
  const [liquid, setLiquid] = useState(true);
  const [liquidStrength, setLiquidStrength] = useState(0.12);
  const [liquidRadius, setLiquidRadius] = useState(1.2);
  const [liquidWobbleSpeed, setLiquidWobbleSpeed] = useState(5);
  const [speed, setSpeed] = useState(0.6);
  const [edgeFade, setEdgeFade] = useState(0.3);
  const [transparent, setTransparent] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState('#0a0a0a');
  const [previewWidth, setPreviewWidth] = useState(800);
  const [previewHeight, setPreviewHeight] = useState(600);

  const handleReset = () => {
    setVariant('circle');
    setPixelSize(4);
    setColor('#B19EEF');
    setPatternScale(2);
    setPatternDensity(1.0);
    setPixelSizeJitter(0.3);
    setEnableRipples(true);
    setRippleSpeed(0.4);
    setRippleThickness(0.12);
    setRippleIntensityScale(1.5);
    setLiquid(true);
    setLiquidStrength(0.12);
    setLiquidRadius(1.2);
    setLiquidWobbleSpeed(5);
    setSpeed(0.6);
    setEdgeFade(0.3);
    setTransparent(true);
    setBackgroundColor('#0a0a0a');
    setPreviewWidth(800);
    setPreviewHeight(600);
  };

  const handleExportSettings = () => {
    const settings = {
      variant,
      pixelSize,
      color,
      patternScale,
      patternDensity,
      pixelSizeJitter,
      enableRipples,
      rippleSpeed,
      rippleThickness,
      rippleIntensityScale,
      liquid,
      liquidStrength,
      liquidRadius,
      liquidWobbleSpeed,
      speed,
      edgeFade,
      transparent
    };
    const settingsText = JSON.stringify(settings, null, 2);
    navigator.clipboard.writeText(settingsText);
    alert('Settings copied to clipboard!');
  };

  return (
    <div className="pixelblast-playground">
      <div className="playground-header">
        <h1>PixelBlast Playground</h1>
        <div className="header-buttons">
          <button onClick={handleExportSettings} className="export-button">Copy Settings</button>
          <button onClick={handleReset} className="reset-button">Reset to Defaults</button>
        </div>
      </div>

      <div className="playground-content">
        <div className="pixelblast-preview" style={{ width: `${previewWidth}px`, height: `${previewHeight}px`, backgroundColor }}>
          <PixelBlast
            variant={variant}
            pixelSize={pixelSize}
            color={color}
            patternScale={patternScale}
            patternDensity={patternDensity}
            pixelSizeJitter={pixelSizeJitter}
            enableRipples={enableRipples}
            rippleSpeed={rippleSpeed}
            rippleThickness={rippleThickness}
            rippleIntensityScale={rippleIntensityScale}
            liquid={liquid}
            liquidStrength={liquidStrength}
            liquidRadius={liquidRadius}
            liquidWobbleSpeed={liquidWobbleSpeed}
            speed={speed}
            edgeFade={edgeFade}
            transparent={transparent}
          />
        </div>

        <div className="controls-panel">
          <div className="control-section">
            <h3>Canvas Dimensions</h3>
            <div className="control-group">
              <label>
                Width: {previewWidth}px
                <input
                  type="range"
                  min="200"
                  max="1400"
                  step="10"
                  value={previewWidth}
                  onChange={(e) => setPreviewWidth(parseInt(e.target.value))}
                />
              </label>
            </div>
            <div className="control-group">
              <label>
                Height: {previewHeight}px
                <input
                  type="range"
                  min="200"
                  max="1000"
                  step="10"
                  value={previewHeight}
                  onChange={(e) => setPreviewHeight(parseInt(e.target.value))}
                />
              </label>
            </div>
            <div className="control-group">
              <label>
                Background Color: {backgroundColor}
                <input
                  type="color"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                />
              </label>
            </div>
          </div>

          <div className="control-section">
            <h3>Shape & Color</h3>
            <div className="control-group">
              <label>
                Variant
                <select value={variant} onChange={(e) => setVariant(e.target.value)}>
                  <option value="circle">Circle</option>
                  <option value="square">Square</option>
                  <option value="triangle">Triangle</option>
                  <option value="diamond">Diamond</option>
                </select>
              </label>
            </div>
            <div className="control-group">
              <label>
                Color: {color}
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                />
              </label>
            </div>
          </div>

          <div className="control-section">
            <h3>Pattern Settings</h3>
            <div className="control-group">
              <label>
                Pixel Size: {pixelSize.toFixed(1)}
                <input
                  type="range"
                  min="0.5"
                  max="10"
                  step="0.1"
                  value={pixelSize}
                  onChange={(e) => setPixelSize(parseFloat(e.target.value))}
                />
              </label>
            </div>
            <div className="control-group">
              <label>
                Pattern Scale: {patternScale.toFixed(1)}
                <input
                  type="range"
                  min="0.5"
                  max="5"
                  step="0.1"
                  value={patternScale}
                  onChange={(e) => setPatternScale(parseFloat(e.target.value))}
                />
              </label>
            </div>
            <div className="control-group">
              <label>
                Pattern Density: {patternDensity.toFixed(1)}
                <input
                  type="range"
                  min="0.1"
                  max="2"
                  step="0.1"
                  value={patternDensity}
                  onChange={(e) => setPatternDensity(parseFloat(e.target.value))}
                />
              </label>
            </div>
            <div className="control-group">
              <label>
                Pixel Size Jitter: {pixelSizeJitter.toFixed(2)}
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={pixelSizeJitter}
                  onChange={(e) => setPixelSizeJitter(parseFloat(e.target.value))}
                />
              </label>
            </div>
          </div>

          <div className="control-section">
            <h3>Ripple Effects</h3>
            <div className="control-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={enableRipples}
                  onChange={(e) => setEnableRipples(e.target.checked)}
                />
                Enable Ripples
              </label>
            </div>
            <div className="control-group">
              <label>
                Ripple Speed: {rippleSpeed.toFixed(2)}
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.01"
                  value={rippleSpeed}
                  onChange={(e) => setRippleSpeed(parseFloat(e.target.value))}
                  disabled={!enableRipples}
                />
              </label>
            </div>
            <div className="control-group">
              <label>
                Ripple Thickness: {rippleThickness.toFixed(2)}
                <input
                  type="range"
                  min="0.01"
                  max="0.5"
                  step="0.01"
                  value={rippleThickness}
                  onChange={(e) => setRippleThickness(parseFloat(e.target.value))}
                  disabled={!enableRipples}
                />
              </label>
            </div>
            <div className="control-group">
              <label>
                Ripple Intensity: {rippleIntensityScale.toFixed(1)}
                <input
                  type="range"
                  min="0.5"
                  max="3"
                  step="0.1"
                  value={rippleIntensityScale}
                  onChange={(e) => setRippleIntensityScale(parseFloat(e.target.value))}
                  disabled={!enableRipples}
                />
              </label>
            </div>
          </div>

          <div className="control-section">
            <h3>Liquid Distortion</h3>
            <div className="control-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={liquid}
                  onChange={(e) => setLiquid(e.target.checked)}
                />
                Enable Liquid Effect
              </label>
            </div>
            <div className="control-group">
              <label>
                Liquid Strength: {liquidStrength.toFixed(2)}
                <input
                  type="range"
                  min="0"
                  max="0.5"
                  step="0.01"
                  value={liquidStrength}
                  onChange={(e) => setLiquidStrength(parseFloat(e.target.value))}
                  disabled={!liquid}
                />
              </label>
            </div>
            <div className="control-group">
              <label>
                Liquid Radius: {liquidRadius.toFixed(1)}
                <input
                  type="range"
                  min="0.5"
                  max="3"
                  step="0.1"
                  value={liquidRadius}
                  onChange={(e) => setLiquidRadius(parseFloat(e.target.value))}
                  disabled={!liquid}
                />
              </label>
            </div>
            <div className="control-group">
              <label>
                Liquid Wobble Speed: {liquidWobbleSpeed.toFixed(1)}
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="0.1"
                  value={liquidWobbleSpeed}
                  onChange={(e) => setLiquidWobbleSpeed(parseFloat(e.target.value))}
                  disabled={!liquid}
                />
              </label>
            </div>
          </div>

          <div className="control-section">
            <h3>Animation & Effects</h3>
            <div className="control-group">
              <label>
                Animation Speed: {speed.toFixed(2)}
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.01"
                  value={speed}
                  onChange={(e) => setSpeed(parseFloat(e.target.value))}
                />
              </label>
            </div>
            <div className="control-group">
              <label>
                Edge Fade: {edgeFade.toFixed(2)}
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={edgeFade}
                  onChange={(e) => setEdgeFade(parseFloat(e.target.value))}
                />
              </label>
            </div>
            <div className="control-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={transparent}
                  onChange={(e) => setTransparent(e.target.checked)}
                />
                Transparent Background
              </label>
            </div>
          </div>

          <div className="code-output">
            <h3>Current Configuration</h3>
            <pre>
{`<PixelBlast
  variant="${variant}"
  pixelSize={${pixelSize.toFixed(1)}}
  color="${color}"
  patternScale={${patternScale.toFixed(1)}}
  patternDensity={${patternDensity.toFixed(1)}}
  pixelSizeJitter={${pixelSizeJitter.toFixed(2)}}
  enableRipples${enableRipples ? '' : '={false}'}
  rippleSpeed={${rippleSpeed.toFixed(2)}}
  rippleThickness={${rippleThickness.toFixed(2)}}
  rippleIntensityScale={${rippleIntensityScale.toFixed(1)}}
  liquid${liquid ? '' : '={false}'}
  liquidStrength={${liquidStrength.toFixed(2)}}
  liquidRadius={${liquidRadius.toFixed(1)}}
  liquidWobbleSpeed={${liquidWobbleSpeed.toFixed(1)}}
  speed={${speed.toFixed(2)}}
  edgeFade={${edgeFade.toFixed(2)}}
  transparent${transparent ? '' : '={false}'}
/>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PixelBlastPlayground;
