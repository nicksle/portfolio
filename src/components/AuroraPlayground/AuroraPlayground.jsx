import React, { useState } from 'react';
import Aurora from '../Aurora/Aurora';
import './AuroraPlayground.css';

const AuroraPlayground = () => {
  const [colorStop1, setColorStop1] = useState('#5227FF');
  const [colorStop2, setColorStop2] = useState('#7cff67');
  const [colorStop3, setColorStop3] = useState('#5227FF');
  const [amplitude, setAmplitude] = useState(1.0);
  const [blend, setBlend] = useState(0.5);
  const [speed, setSpeed] = useState(1.0);
  const [previewWidth, setPreviewWidth] = useState(800);
  const [previewHeight, setPreviewHeight] = useState(600);

  const handleReset = () => {
    setColorStop1('#5227FF');
    setColorStop2('#7cff67');
    setColorStop3('#5227FF');
    setAmplitude(1.0);
    setBlend(0.5);
    setSpeed(1.0);
    setPreviewWidth(800);
    setPreviewHeight(600);
  };

  const handleExportSettings = () => {
    const settings = {
      colorStops: [colorStop1, colorStop2, colorStop3],
      amplitude,
      blend,
      speed
    };
    const settingsText = JSON.stringify(settings, null, 2);
    navigator.clipboard.writeText(settingsText);
    alert('Settings copied to clipboard!');
  };

  return (
    <div className="aurora-playground">
      <div className="playground-header">
        <h1>Aurora Playground</h1>
        <div className="header-buttons">
          <button onClick={handleExportSettings} className="export-button">Copy Settings</button>
          <button onClick={handleReset} className="reset-button">Reset to Defaults</button>
        </div>
      </div>

      <div className="playground-content">
        <div className="aurora-preview" style={{ width: `${previewWidth}px`, height: `${previewHeight}px` }}>
          <Aurora
            colorStops={[colorStop1, colorStop2, colorStop3]}
            amplitude={amplitude}
            blend={blend}
            speed={speed}
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
            <h3>Color Stops</h3>
            <div className="control-group">
              <label>
                Color Stop 1: {colorStop1}
                <input
                  type="color"
                  value={colorStop1}
                  onChange={(e) => setColorStop1(e.target.value)}
                />
              </label>
            </div>
            <div className="control-group">
              <label>
                Color Stop 2: {colorStop2}
                <input
                  type="color"
                  value={colorStop2}
                  onChange={(e) => setColorStop2(e.target.value)}
                />
              </label>
            </div>
            <div className="control-group">
              <label>
                Color Stop 3: {colorStop3}
                <input
                  type="color"
                  value={colorStop3}
                  onChange={(e) => setColorStop3(e.target.value)}
                />
              </label>
            </div>
          </div>

          <div className="control-section">
            <h3>Effect Parameters</h3>
            <div className="control-group">
              <label>
                Amplitude: {amplitude.toFixed(2)}
                <input
                  type="range"
                  min="0"
                  max="3"
                  step="0.01"
                  value={amplitude}
                  onChange={(e) => setAmplitude(parseFloat(e.target.value))}
                />
              </label>
            </div>
            <div className="control-group">
              <label>
                Blend: {blend.toFixed(2)}
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={blend}
                  onChange={(e) => setBlend(parseFloat(e.target.value))}
                />
              </label>
            </div>
            <div className="control-group">
              <label>
                Speed: {speed.toFixed(2)}
                <input
                  type="range"
                  min="0"
                  max="3"
                  step="0.01"
                  value={speed}
                  onChange={(e) => setSpeed(parseFloat(e.target.value))}
                />
              </label>
            </div>
          </div>

          <div className="code-output">
            <h3>Current Configuration</h3>
            <pre>
{`<Aurora
  colorStops={['${colorStop1}', '${colorStop2}', '${colorStop3}']}
  amplitude={${amplitude.toFixed(2)}}
  blend={${blend.toFixed(2)}}
  speed={${speed.toFixed(2)}}
/>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuroraPlayground;
