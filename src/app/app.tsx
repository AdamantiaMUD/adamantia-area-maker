import React, {useCallback, useState} from 'react';
import {
    Stage,
    Layer,
    Rect,
    Circle,
    Text as KText,
} from 'react-konva';
import type Konva from 'konva';

import type {FC} from 'react';

const App: FC = () => {
    const [selectedId, setSelectedId] = useState<string>('');

    const selectItem = useCallback(
        (e: Konva.KonvaEventObject<MouseEvent>, itemId: string): void => {
            e.cancelBubble = true;

            setSelectedId(itemId);
        },
        [setSelectedId]
    );

    return (
        <Stage
            draggable
            width={window.innerWidth - 50}
            height={window.innerHeight - 50}
            onClick={(e: Konva.KonvaEventObject<MouseEvent>): void => selectItem(e, '')}
        >
            <Layer>
                <KText text={`Selected: '${selectedId}'`} y={50} />
                <Rect
                    draggable
                    id="square"
                    x={100}
                    y={100}
                    width={50}
                    height={50}
                    fill="red"
                    onClick={(e: Konva.KonvaEventObject<MouseEvent>): void => selectItem(e, 'square')}
                />
                <Circle
                    draggable
                    id="circle"
                    x={500}
                    y={200}
                    stroke="black"
                    radius={50}
                    onClick={(e: Konva.KonvaEventObject<MouseEvent>): void => selectItem(e, 'circle')}
                />
            </Layer>
        </Stage>
    );
};

export default App;
