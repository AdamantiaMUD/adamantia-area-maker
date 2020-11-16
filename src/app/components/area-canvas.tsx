import React, {
    useCallback,
    useContext,
    useRef,
    useState,
} from 'react';
import {Stage, Layer} from 'react-konva';
import type Konva from 'konva';
import {useDebouncedCallback} from 'use-debounce';

import type {FC} from 'react';

import BackgroundGrid from '~/components/background-grid';
import ControlPanel from '~/components/control-panel';
import Portal from '~/components/general/portal';
import {AreaContext} from '~/area-context-provider';
import {DEBOUNCE_DELAY_SLOW} from '~/constants';

import type {Position} from '~/interfaces';

const AreaCanvas: FC = () => {
    const [stageCoords, setStageCoords] = useState<Position>({x: 0, y: 0});

    const {setSelectedId} = useContext(AreaContext);

    const stageRef = useRef<Konva.Stage | null>(null);

    const selectItem = useCallback(
        (e: Konva.KonvaEventObject<MouseEvent>, itemId: string): void => {
            /* eslint-disable-next-line no-param-reassign */
            e.cancelBubble = true;

            setSelectedId(itemId);
        },
        [setSelectedId]
    );

    const logMovement = useDebouncedCallback(
        (e: Konva.KonvaEventObject<DragEvent>) => {
            const target = e.target;

            if (target.parent === null) {
                const {x, y} = target.attrs as Position;
                setStageCoords({x, y});
            }
        },
        DEBOUNCE_DELAY_SLOW,
        {maxWait: DEBOUNCE_DELAY_SLOW}
    );

    return (
        <Stage
            draggable
            width={window.innerWidth}
            height={window.innerHeight}
            onClick={(e: Konva.KonvaEventObject<MouseEvent>): void => selectItem(e, '')}
            onDragMove={logMovement.callback}
            ref={(el: Konva.Stage | null): void => {
                stageRef.current = el;
            }}
        >
            <BackgroundGrid stageCoords={stageCoords} />
            <Portal>
                <ControlPanel />
            </Portal>
            <Layer />
        </Stage>
    );
};

export default AreaCanvas;
