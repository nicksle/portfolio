import React, { useState } from 'react';
import GradualBlur from '../GradualBlur/GradualBlur';
import './GradualBlurPlayground.css';

const GradualBlurPlayground = () => {
  const [position, setPosition] = useState('bottom');
  const [strength, setStrength] = useState(2);
  const [height, setHeight] = useState(6);
  const [divCount, setDivCount] = useState(5);
  const [exponential, setExponential] = useState(false);
  const [opacity, setOpacity] = useState(1);
  const [curve, setCurve] = useState('linear');
  const [animated, setAnimated] = useState(false);
  const [duration, setDuration] = useState(0.3);
  const [easing, setEasing] = useState('ease-out');
  const [target, setTarget] = useState('parent');
  const [hoverIntensity, setHoverIntensity] = useState(0);
  const [preset, setPreset] = useState('');
  const [previewWidth, setPreviewWidth] = useState(800);
  const [previewHeight, setPreviewHeight] = useState(600);

  const handleReset = () => {
    setPosition('bottom');
    setStrength(2);
    setHeight(6);
    setDivCount(5);
    setExponential(false);
    setOpacity(1);
    setCurve('linear');
    setAnimated(false);
    setDuration(0.3);
    setEasing('ease-out');
    setTarget('parent');
    setHoverIntensity(0);
    setPreset('');
    setPreviewWidth(800);
    setPreviewHeight(600);
  };

  const handleExportSettings = () => {
    const settings = {
      position,
      strength,
      height: `${height}rem`,
      divCount,
      exponential,
      opacity,
      curve,
      animated,
      duration: `${duration}s`,
      easing,
      target,
      hoverIntensity: hoverIntensity || undefined
    };
    const settingsText = JSON.stringify(settings, null, 2);
    navigator.clipboard.writeText(settingsText);
    alert('Settings copied to clipboard!');
  };

  const handlePresetChange = (presetName) => {
    setPreset(presetName);
    if (!presetName) return;

    const PRESETS = {
      top: { position: 'top', height: 6 },
      bottom: { position: 'bottom', height: 6 },
      left: { position: 'left', height: 6 },
      right: { position: 'right', height: 6 },
      subtle: { height: 4, strength: 1, opacity: 0.8, divCount: 3 },
      intense: { height: 10, strength: 4, divCount: 8, exponential: true },
      smooth: { height: 8, curve: 'bezier', divCount: 10 },
      sharp: { height: 5, curve: 'linear', divCount: 4 },
      header: { position: 'top', height: 8, curve: 'ease-out' },
      footer: { position: 'bottom', height: 8, curve: 'ease-out' },
      sidebar: { position: 'left', height: 6, strength: 2.5 }
    };

    const presetConfig = PRESETS[presetName];
    if (presetConfig) {
      if (presetConfig.position) setPosition(presetConfig.position);
      if (presetConfig.strength) setStrength(presetConfig.strength);
      if (presetConfig.height) setHeight(presetConfig.height);
      if (presetConfig.divCount) setDivCount(presetConfig.divCount);
      if (presetConfig.exponential !== undefined) setExponential(presetConfig.exponential);
      if (presetConfig.opacity) setOpacity(presetConfig.opacity);
      if (presetConfig.curve) setCurve(presetConfig.curve);
    }
  };

  return (
    <div className="gradualblur-playground">
      <div className="playground-header">
        <h1>GradualBlur Playground</h1>
        <div className="header-buttons">
          <button onClick={handleExportSettings} className="export-button">Copy Settings</button>
          <button onClick={handleReset} className="reset-button">Reset to Defaults</button>
        </div>
      </div>

      <div className="playground-content">
        <div className="gradualblur-preview" style={{ width: `${previewWidth}px`, height: `${previewHeight}px` }}>
          <div className="preview-content">
            <p>Hover and scroll to see the blur effect</p>
            <p>Content behind the blur</p>
            <p>More content here...</p>
          </div>
          <GradualBlur
            position={position}
            strength={strength}
            height={`${height}rem`}
            divCount={divCount}
            exponential={exponential}
            opacity={opacity}
            curve={curve}
            animated={animated}
            duration={`${duration}s`}
            easing={easing}
            target={target}
            hoverIntensity={hoverIntensity || undefined}
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
          </div>

          <div className="control-section">
            <h3>Presets</h3>
            <div className="control-group">
              <label>
                Preset
                <select value={preset} onChange={(e) => handlePresetChange(e.target.value)}>
                  <option value="">None</option>
                  <option value="top">Top</option>
                  <option value="bottom">Bottom</option>
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                  <option value="subtle">Subtle</option>
                  <option value="intense">Intense</option>
                  <option value="smooth">Smooth</option>
                  <option value="sharp">Sharp</option>
                  <option value="header">Header</option>
                  <option value="footer">Footer</option>
                  <option value="sidebar">Sidebar</option>
                </select>
              </label>
            </div>
          </div>

          <div className="control-section">
            <h3>Position & Size</h3>
            <div className="control-group">
              <label>
                Position
                <select value={position} onChange={(e) => setPosition(e.target.value)}>
                  <option value="top">Top</option>
                  <option value="bottom">Bottom</option>
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                </select>
              </label>
            </div>
            <div className="control-group">
              <label>
                Height: {height}rem
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="0.5"
                  value={height}
                  onChange={(e) => setHeight(parseFloat(e.target.value))}
                />
              </label>
            </div>
            <div className="control-group">
              <label>
                Target
                <select value={target} onChange={(e) => setTarget(e.target.value)}>
                  <option value="parent">Parent</option>
                  <option value="page">Page</option>
                </select>
              </label>
            </div>
          </div>

          <div className="control-section">
            <h3>Blur Settings</h3>
            <div className="control-group">
              <label>
                Strength: {strength.toFixed(1)}
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.1"
                  value={strength}
                  onChange={(e) => setStrength(parseFloat(e.target.value))}
                />
              </label>
            </div>
            <div className="control-group">
              <label>
                Div Count: {divCount}
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="1"
                  value={divCount}
                  onChange={(e) => setDivCount(parseInt(e.target.value))}
                />
              </label>
            </div>
            <div className="control-group">
              <label>
                Opacity: {opacity.toFixed(2)}
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={opacity}
                  onChange={(e) => setOpacity(parseFloat(e.target.value))}
                />
              </label>
            </div>
            <div className="control-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={exponential}
                  onChange={(e) => setExponential(e.target.checked)}
                />
                Exponential Blur
              </label>
            </div>
          </div>

          <div className="control-section">
            <h3>Curve & Animation</h3>
            <div className="control-group">
              <label>
                Curve
                <select value={curve} onChange={(e) => setCurve(e.target.value)}>
                  <option value="linear">Linear</option>
                  <option value="bezier">Bezier</option>
                  <option value="ease-in">Ease In</option>
                  <option value="ease-out">Ease Out</option>
                  <option value="ease-in-out">Ease In-Out</option>
                </select>
              </label>
            </div>
            <div className="control-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={animated}
                  onChange={(e) => setAnimated(e.target.checked)}
                />
                Enable Animation
              </label>
            </div>
            <div className="control-group">
              <label>
                Duration: {duration.toFixed(1)}s
                <input
                  type="range"
                  min="0"
                  max="3"
                  step="0.1"
                  value={duration}
                  onChange={(e) => setDuration(parseFloat(e.target.value))}
                  disabled={!animated}
                />
              </label>
            </div>
            <div className="control-group">
              <label>
                Easing
                <select value={easing} onChange={(e) => setEasing(e.target.value)} disabled={!animated}>
                  <option value="ease">Ease</option>
                  <option value="ease-in">Ease In</option>
                  <option value="ease-out">Ease Out</option>
                  <option value="ease-in-out">Ease In-Out</option>
                  <option value="linear">Linear</option>
                </select>
              </label>
            </div>
          </div>

          <div className="control-section">
            <h3>Hover Effect</h3>
            <div className="control-group">
              <label>
                Hover Intensity: {hoverIntensity.toFixed(1)}
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.1"
                  value={hoverIntensity}
                  onChange={(e) => setHoverIntensity(parseFloat(e.target.value))}
                />
              </label>
            </div>
          </div>

          <div className="code-output">
            <h3>Current Configuration</h3>
            <pre>
{`<GradualBlur
  position="${position}"
  strength={${strength.toFixed(1)}}
  height="${height}rem"
  divCount={${divCount}}
  exponential={${exponential}}
  opacity={${opacity.toFixed(2)}}
  curve="${curve}"
  animated={${animated}}
  duration="${duration.toFixed(1)}s"
  easing="${easing}"
  target="${target}"${hoverIntensity > 0 ? `\n  hoverIntensity={${hoverIntensity.toFixed(1)}}` : ''}
/>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradualBlurPlayground;
