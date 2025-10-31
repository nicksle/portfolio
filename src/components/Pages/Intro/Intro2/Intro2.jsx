import React, { useState } from 'react';
import './Intro2.css';
import IconImgSwapCell from '../../../IconImgSwapCell/IconImgSwapCell';
import SF01 from '../../../../assets/Intro2/SF/SF01.jpg';
import SF02 from '../../../../assets/Intro2/SF/SF02.jpg';
import SF03 from '../../../../assets/Intro2/SF/SF03.jpg';
import HowImFeelingNow from '../../../../assets/Intro2/Albums/how-im-feeling-now.png';
import NFR from '../../../../assets/Intro2/Albums/nfr.png';
import Brat from '../../../../assets/Intro2/Albums/brat.png';
import Evermore from '../../../../assets/Intro2/Albums/evermore.png';
import CowboyCarter from '../../../../assets/Intro2/Albums/cowboy-carter.jpg';
import QR01 from '../../../../assets/Intro2/QR01.jpg';
import CatPhoto from '../../../../assets/Intro2/Cat/CAT01.jpg';

const Intro2 = ({ onPrev }) => {
  const sfImages = [SF01, SF02, SF03];
  const [currentSFImage, setCurrentSFImage] = useState(sfImages[Math.floor(Math.random() * sfImages.length)]);

  const handleSFHover = () => {
    // Get a random image that's different from the current one
    let newImage;
    do {
      newImage = sfImages[Math.floor(Math.random() * sfImages.length)];
    } while (newImage === currentSFImage && sfImages.length > 1);

    setCurrentSFImage(newImage);
  };

  // Music cell state and songs
  const [hoveredMusic, setHoveredMusic] = useState(false);
  const songs = [
    { title: "party 4 u", artist: "Charli XCX", albumArt: HowImFeelingNow },
    { title: "hope is a dangerous thing for a woman like me to have - but i have it", artist: "Lana Del Rey", albumArt: NFR },
    { title: "360", artist: "Charli XCX", albumArt: Brat },
    { title: "cowboy like me", artist: "Taylor Swift", albumArt: Evermore },
    { title: "II HANDS II HEAVEN", artist: "Beyoncé", albumArt: CowboyCarter }
  ];
  const [currentSong] = useState(songs[Math.floor(Math.random() * songs.length)]);

  const handleMusicHover = () => {
    setHoveredMusic(true);
  };
  return (
    <>
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="grainNoise">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" />
            <feColorMatrix type="saturate" values="0" />
            <feBlend mode="multiply" in="SourceGraphic" />
          </filter>
        </defs>
      </svg>
      <div className="intro2-section">
      {/* Row 1 */}
      <div className="grid-cell text-r1">
        <span>I'm a product designer</span>
      </div>
      <div className="grid-cell blank-r1-c6"></div>
      <div className="grid-cell image-r1r2">
        <span>Image</span>
      </div>

      {/* Row 2 */}
      <div className="grid-cell blank-r2-c1">
        <IconImgSwapCell
          cellId="QR"
          icon={
            <svg
              width="80"
              height="80"
              viewBox="0 0 100 86.6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon points="50,86.6 0,0 100,0" fill="#FF69B4"/>
            </svg>
          }
          image={QR01}
          imageAlt="QR Code"
        />
      </div>
      <div className="grid-cell blank-r2-c2"></div>
      <div className="grid-cell text-r2">
        {"queer creative".split('').map((char, index) =>
          char === ' '
            ? <span key={index} className="space">{char}</span>
            : <span key={index} className="char">{char}</span>
        )}
      </div>

      {/* Row 3 */}
      <div className="grid-cell blank-r3-c1">
        <span>&</span>
      </div>
      <div
        className="grid-cell text-r3"
        id="Music"
        onMouseEnter={handleMusicHover}
        onMouseLeave={() => setHoveredMusic(false)}
      >
        <span className={`music-default-text ${hoveredMusic ? 'hidden' : ''}`}>
          pop music enthusiast
        </span>
        <span className={`music-now-playing ${hoveredMusic ? 'visible' : ''}`}>
          Now Playing: {currentSong.title}·{currentSong.artist}
        </span>
      </div>
      <div className="grid-cell blank-r3-c7" id="Album1">
        <div className="record"></div>
        <div className="album-image">
          {currentSong.albumArt ? (
            <img src={currentSong.albumArt} alt={`${currentSong.title} by ${currentSong.artist}`} />
          ) : (
            <div className="album-placeholder"></div>
          )}
        </div>
      </div>
      <div className="grid-cell blank-r3-c8"></div>

      {/* Row 4 */}
      <div className="grid-cell blank-r4-c1">
        <IconImgSwapCell
          cellId="Cat"
          icon={
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Cat face */}
              <circle cx="30" cy="30" r="20" fill="currentColor"/>
              {/* Left ear */}
              <path d="M15 15 L10 5 L20 12 Z" fill="currentColor"/>
              {/* Right ear */}
              <path d="M45 15 L50 5 L40 12 Z" fill="currentColor"/>
              {/* Left eye */}
              <circle cx="23" cy="28" r="3" fill="#0e0e10"/>
              {/* Right eye */}
              <circle cx="37" cy="28" r="3" fill="#0e0e10"/>
              {/* Nose */}
              <path d="M30 33 L28 36 L32 36 Z" fill="#0e0e10"/>
              {/* Mouth */}
              <path d="M30 36 Q25 40 20 38" stroke="#0e0e10" strokeWidth="1.5" fill="none"/>
              <path d="M30 36 Q35 40 40 38" stroke="#0e0e10" strokeWidth="1.5" fill="none"/>
              {/* Whiskers */}
              <line x1="10" y1="30" x2="18" y2="29" stroke="currentColor" strokeWidth="1"/>
              <line x1="10" y1="34" x2="18" y2="33" stroke="currentColor" strokeWidth="1"/>
              <line x1="50" y1="30" x2="42" y2="29" stroke="currentColor" strokeWidth="1"/>
              <line x1="50" y1="34" x2="42" y2="33" stroke="currentColor" strokeWidth="1"/>
            </svg>
          }
          image={CatPhoto}
          imageAlt="Cat photo"
        />
      </div>
      <div className="grid-cell blank-r4-c2"></div>
      <div className="grid-cell blank-r4-c3">
        <IconImgSwapCell
          cellId="SF"
          icon={
            <svg
              width="80"
              height="60"
              viewBox="0 0 80 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Golden Gate Bridge simplified icon */}
              {/* Left tower */}
              <rect x="15" y="15" width="4" height="30" fill="currentColor"/>
              {/* Right tower */}
              <rect x="61" y="15" width="4" height="30" fill="currentColor"/>
              {/* Bridge deck */}
              <rect x="0" y="40" width="80" height="3" fill="currentColor"/>
              {/* Suspension cables - main arc */}
              <path d="M15 20 Q40 10 65 20" stroke="currentColor" strokeWidth="2" fill="none"/>
              {/* Vertical suspension cables */}
              <line x1="25" y1="15" x2="25" y2="40" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
              <line x1="35" y1="11" x2="35" y2="40" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
              <line x1="45" y1="11" x2="45" y2="40" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
              <line x1="55" y1="15" x2="55" y2="40" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
            </svg>
          }
          image={currentSFImage}
          imageAlt="San Francisco"
          onHover={handleSFHover}
        />
      </div>
      <div className="grid-cell text-r4">
        <span>based in San Francisco</span>
      </div>
    </div>
    </>
  );
};

export default Intro2;
