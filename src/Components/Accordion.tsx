import React, { useState, useRef, useEffect } from 'react';

type AccordionProps = {
  title: string;
  children: JSX.Element;
  opened: string | null;
  handleOpen: any;
  length: number;
};

const Accordion = ({
  title,
  children,
  opened,
  handleOpen,
  length,
}: AccordionProps) => {
  const [height, setHeight] = useState<string>('0px');
  const contentElement = useRef<HTMLDivElement>(null);
  let isOpened = opened === title;

  useEffect(() => {
    setHeight(
      opened === title ? `${contentElement.current?.scrollHeight}px` : '0px',
    );
  }, [opened, title, length]);

  const HandleOpening = () => {
    handleOpen(title);
  };
  return (
    <div className="border-t border-gray-400">
      <div
        onClick={HandleOpening}
        className={'bg-gray-400 p-4 flex justify-between text-white'}
      >
        <h4 className="font-semibold">{title}</h4>
        <img
          src={
            isOpened ? '/assets/chevron_closed.svg' : '/assets/chevron_open.svg'
          }
          alt={isOpened ? 'Close' : 'Open'}
        />
      </div>
      <div
        ref={contentElement}
        style={{ height: height }}
        className="bg-white overflow-hidden transition-all duration-200"
      >
        {children}
      </div>
    </div>
  );
};

export default Accordion;
