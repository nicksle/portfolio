import React, { useState } from 'react';
import Dither from '../Dither/Dither';
import './DitherPlayground.css';

const DitherPlayground = () => {
  const [waveColor, setWaveColor] = useState([0.69, 0.62, 0.94]);
  const [waveSpeed, setWaveSpeed] = useState(0.05);
  const [waveFrequency, setWaveFrequency] = useState(3);
  const [waveAmplitude, setWaveAmplitude] = useState(0.3);
  const [colorNum, setColorNum] = useState(4);
  const [pixelSize, setPixelSize] = useState(2);
  const [mouseRadius, setMouseRadius] = useState(0.3);
  const [enableMouseInteraction, setEnableMouseInteraction] = useState(true);
  const [disableAnimation, setDisableAnimation] = useState(false);
  const [importText, setImportText] = useState('');
  const [showImport, setShowImport] = useState(false);

  const handleReset = () => {
    setWaveColor([0.69, 0.62, 0.94]);
    setWaveSpeed(0.05);
    setWaveFrequency(3);
    setWaveAmplitude(0.3);
    setColorNum(4);
    setPixelSize(2);
    setMouseRadius(0.3);
    setEnableMouseInteraction(true);
    setDisableAnimation(false);
  };

  const handleColorChange = (index, value) => {
    const newColor = [...waveColor];
    newColor[index] = parseFloat(value);
    setWaveColor(newColor);
  };

  const handleExportSettings = () => {
    const settings = {
      waveColor,
      waveSpeed,
      waveFrequency,
      waveAmplitude,
      colorNum,
      pixelSize,
      mouseRadius,
      enableMouseInteraction,
      disableAnimation
    };
    const settingsText = JSON.stringify(settings, null, 2);
    navigator.clipboard.writeText(settingsText);
    alert('Settings copied to clipboard!');
  };

  const handleImportSettings = () => {
    try {
      const settings = JSON.parse(importText);
      if (settings.waveColor) setWaveColor(settings.waveColor);
      if (settings.waveSpeed !== undefined) setWaveSpeed(settings.waveSpeed);
      if (settings.waveFrequency !== undefined) setWaveFrequency(settings.waveFrequency);
      if (settings.waveAmplitude !== undefined) setWaveAmplitude(settings.waveAmplitude);
      if (settings.colorNum !== undefined) setColorNum(settings.colorNum);
      if (settings.pixelSize !== undefined) setPixelSize(settings.pixelSize);
      if (settings.mouseRadius !== undefined) setMouseRadius(settings.mouseRadius);
      if (settings.enableMouseInteraction !== undefined) setEnableMouseInteraction(settings.enableMouseInteraction);
      if (settings.disableAnimation !== undefined) setDisableAnimation(settings.disableAnimation);
      setShowImport(false);
      setImportText('');
      alert('Settings imported successfully!');
    } catch (error) {
      alert('Invalid settings format. Please paste valid JSON.');
    }
  };

  return (
    <div className="dither-playground">
      <div className="playground-header">
        <h1>Dither Effect Playground</h1>
        <div className="header-buttons">
          <button onClick={handleExportSettings} className="export-button">Copy Settings</button>
          <button onClick={() => setShowImport(!showImport)} className="import-button">
            {showImport ? 'Hide Import' : 'Import Settings'}
          </button>
          <button onClick={handleReset} className="reset-button">Reset to Defaults</button>
        </div>
      </div>

      {showImport && (
        <div className="import-section">
          <h3>Import Settings</h3>
          <textarea
            value={importText}
            onChange={(e) => setImportText(e.target.value)}
            placeholder='Paste settings JSON here...'
            rows={6}
          />
          <button onClick={handleImportSettings} className="apply-button">Apply Settings</button>
        </div>
      )}

      <div className="playground-content">
        <div className="dither-preview">
          <Dither
            waveColor={waveColor}
            waveSpeed={waveSpeed}
            waveFrequency={waveFrequency}
            waveAmplitude={waveAmplitude}
            colorNum={colorNum}
            pixelSize={pixelSize}
            mouseRadius={mouseRadius}
            enableMouseInteraction={enableMouseInteraction}
            disableAnimation={disableAnimation}
          />
        </div>

        <div className="controls-panel">
          <div className="control-section">
            <h3>Wave Color (RGB)</h3>
            <div className="control-group">
              <label>
                Red: {waveColor[0].toFixed(2)}
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={waveColor[0]}
                  onChange={(e) => handleColorChange(0, e.target.value)}
                />
              </label>
            </div>
            <div className="control-group">
              <label>
                Green: {waveColor[1].toFixed(2)}
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={waveColor[1]}
                  onChange={(e) => handleColorChange(1, e.target.value)}
                />
              </label>
            </div>
            <div className="control-group">
              <label>
                Blue: {waveColor[2].toFixed(2)}
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={waveColor[2]}
                  onChange={(e) => handleColorChange(2, e.target.value)}
                />
              </label>
            </div>
          </div>

          <div className="control-section">
            <h3>Wave Parameters</h3>
            <div className="control-group">
              <label>
                Wave Speed: {waveSpeed.toFixed(3)}
                <input
                  type="range"
                  min="0"
                  max="0.2"
                  step="0.001"
                  value={waveSpeed}
                  onChange={(e) => setWaveSpeed(parseFloat(e.target.value))}
                />
              </label>
            </div>
            <div className="control-group">
              <label>
                Wave Frequency: {waveFrequency.toFixed(1)}
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="0.1"
                  value={waveFrequency}
                  onChange={(e) => setWaveFrequency(parseFloat(e.target.value))}
                />
              </label>
            </div>
            <div className="control-group">
              <label>
                Wave Amplitude: {waveAmplitude.toFixed(2)}
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={waveAmplitude}
                  onChange={(e) => setWaveAmplitude(parseFloat(e.target.value))}
                />
              </label>
            </div>
          </div>

          <div className="control-section">
            <h3>Dithering Effect</h3>
            <div className="control-group">
              <label>
                Color Levels: {colorNum}
                <input
                  type="range"
                  min="2"
                  max="8"
                  step="1"
                  value={colorNum}
                  onChange={(e) => setColorNum(parseInt(e.target.value))}
                />
              </label>
            </div>
            <div className="control-group">
              <label>
                Pixel Size: {pixelSize.toFixed(1)}
                <input
                  type="range"
                  min="0.1"
                  max="10"
                  step="0.1"
                  value={pixelSize}
                  onChange={(e) => setPixelSize(parseFloat(e.target.value))}
                />
              </label>
            </div>
          </div>

          <div className="control-section">
            <h3>Mouse Interaction</h3>
            <div className="control-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={enableMouseInteraction}
                  onChange={(e) => setEnableMouseInteraction(e.target.checked)}
                />
                Enable Mouse Interaction
              </label>
            </div>
            <div className="control-group">
              <label>
                Mouse Radius: {mouseRadius.toFixed(2)}
                <input
                  type="range"
                  min="0.1"
                  max="2"
                  step="0.1"
                  value={mouseRadius}
                  onChange={(e) => setMouseRadius(parseFloat(e.target.value))}
                  disabled={!enableMouseInteraction}
                />
              </label>
            </div>
          </div>

          <div className="control-section">
            <h3>Animation</h3>
            <div className="control-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={disableAnimation}
                  onChange={(e) => setDisableAnimation(e.target.checked)}
                />
                Disable Animation
              </label>
            </div>
          </div>

          <div className="code-output">
            <h3>Current Configuration</h3>
            <pre>
{`<Dither
  waveColor={[${waveColor[0].toFixed(2)}, ${waveColor[1].toFixed(2)}, ${waveColor[2].toFixed(2)}]}
  waveSpeed={${waveSpeed.toFixed(3)}}
  waveFrequency={${waveFrequency.toFixed(1)}}
  waveAmplitude={${waveAmplitude.toFixed(2)}}
  colorNum={${colorNum}}
  pixelSize={${pixelSize.toFixed(1)}}
  mouseRadius={${mouseRadius.toFixed(2)}}
  enableMouseInteraction={${enableMouseInteraction}}
  disableAnimation={${disableAnimation}}
/>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DitherPlayground;
