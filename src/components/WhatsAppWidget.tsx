import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import { FaWhatsapp } from 'react-icons/fa';
import { WhatsAppWidgetProps } from '@src/interfaces/whatsapp';
import FloatingActionButton from '@src/shared/ui/FloatingActionButton';

const WhatsAppWidget: React.FC<WhatsAppWidgetProps> = ({
  phoneNumber,
  position = { bottom: 20, right: 20 },
  backgroundColor = '#25D366',
  iconColor = 'white',
  iconSize = 30,
  tooltipText = 'Chat with us on WhatsApp',
  draggable = true,
}) => {
  const widgetRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    window.open(`https://wa.me/${phoneNumber}`, '_blank');
  };

  const widgetStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: position.bottom,
    top: position.top,
    right: position.right,
    left: position.left,
    backgroundColor,
    color: iconColor,
    borderRadius: '50%',
    padding: 10,
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    zIndex: 1000,
    cursor: draggable ? 'grab' : 'pointer',
  };

  return (
    <Draggable disabled={!draggable} nodeRef={widgetRef}>
      <div style={widgetStyle} ref={widgetRef} title={tooltipText}>
        <FloatingActionButton
          aria-label="Open WhatsApp chat"
          backgroundColor={backgroundColor}
          iconColor={iconColor}
          onClick={handleClick}
        >
          <FaWhatsapp size={iconSize} />
        </FloatingActionButton>
      </div>
    </Draggable>
  );
};

export default WhatsAppWidget;
