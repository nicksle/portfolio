import React from 'react';
import { cardStyles, getColor, getTypography, getSpacing } from '../utils/designTokens';

const TokenTest = () => {
  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: getColor('base', '#ffffff'),
      color: getColor('primary', '#000000'),
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2>Design Token Test</h2>
      
      <h3>Card Styles Test:</h3>
      <div style={{ marginBottom: '20px' }}>
        <div style={cardStyles.index}>
          Index Text (S1 Style) - Should be SF Mono, 14px, tertiary color
        </div>
        <div style={cardStyles.heading}>
          Heading Text (H3 Style) - Should be Satoshi, 24px, bold, primary color
        </div>
        <div style={cardStyles.body}>
          Body Text (B2 Style) - Should be Satoshi, 20px, regular, primary color
        </div>
      </div>

      <h3>Individual Token Tests:</h3>
      <div style={{ marginBottom: '20px' }}>
        <div style={{ 
          color: getColor('secondary', '#666666'),
          fontSize: '16px'
        }}>
          Secondary Color Test
        </div>
        <div style={{ 
          color: getColor('tertiary', '#999999'),
          fontSize: '16px'
        }}>
          Tertiary Color Test
        </div>
        <div style={{ 
          backgroundColor: getColor('hover', '#f0f0f0'),
          padding: getSpacing('md', '12px'),
          margin: getSpacing('sm', '8px')
        }}>
          Spacing and Hover Color Test
        </div>
      </div>

      <h3>Typography Test:</h3>
      <div style={{ marginBottom: '20px' }}>
        <div style={getTypography('heading.h3', {})}>
          Typography Heading H3 Test
        </div>
        <div style={getTypography('body.sm', {})}>
          Typography Body SM Test
        </div>
      </div>

      <h3>Raw Tokens Object:</h3>
      <pre style={{ 
        backgroundColor: '#f5f5f5', 
        padding: '10px', 
        fontSize: '12px',
        overflow: 'auto'
      }}>
        {JSON.stringify(cardStyles, null, 2)}
      </pre>
    </div>
  );
};

export default TokenTest;
