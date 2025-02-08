import React, { memo } from 'react';
import clsx from 'clsx';
import { Handle, Position } from 'reactflow';

type Props = {
  data: {
    label: string;
    emoji: string;
    title?: 'main' | 'category';
  };
};

const CustomNode: React.FC<Props> = ({ data }) => {
  return (
    <div className="rounded-md border-2 bg-white px-4 py-2 shadow-md">
      <div className="flex items-center justify-center gap-4">
        <div className="flex w-max items-center justify-center rounded-full bg-gray-100">
          {data.emoji}
        </div>
        <div>
          <div
            className={clsx('text-center font-bold text-black', {
              'text-4xl text-orange-600': data.title === 'main',
              'text-3xl': data.title === 'category',
              'text-2xl': !data.title,
            })}
          >
            {data.label}
          </div>
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Top}
        className="h-2 w-16 !bg-orange-500"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="h-2 w-16 !bg-orange-500"
      />
    </div>
  );
};

export default memo(CustomNode);
