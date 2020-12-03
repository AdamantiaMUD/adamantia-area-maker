import React, {useCallback, useState} from 'react';
import {Rect} from 'react-konva';
import {useDebounce, useDebouncedCallback} from 'use-debounce';

import type Konva from 'konva';
import type {FC} from 'react';

import {DEBOUNCE_DELAY_FAST, GRID_SIZE} from '~/constants';
import {getSnappedCoordinate, getSnappedCoords} from '~/utils/grid';

import type {Position, RoomNode} from '~/interfaces';

interface ComponentProps {
    isSelected: boolean;
    node: RoomNode;
    selectRoom: (roomId: string) => void;
    updateRoom: (room: RoomNode) => void;
}

export const Room: FC<ComponentProps> = (props: ComponentProps) => {
    const {
        isSelected,
        node,
        selectRoom,
        updateRoom,
    } = props;

    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [dragCoords, setDragCoords] = useState<Position>(node.coords);

    const [[shadowX, shadowY]] = useDebounce<[number, number]>(
        [getSnappedCoordinate(dragCoords.x), getSnappedCoordinate(dragCoords.y)],
        DEBOUNCE_DELAY_FAST,
        {maxWait: DEBOUNCE_DELAY_FAST}
    );

    const handleMove = useDebouncedCallback(
        (e: Konva.KonvaEventObject<DragEvent>) => {
            /* eslint-disable-next-line no-param-reassign */
            e.cancelBubble = true;

            const {x, y} = e.target.attrs as Position;

            setDragCoords({x, y});
        },
        DEBOUNCE_DELAY_FAST,
        {maxWait: DEBOUNCE_DELAY_FAST}
    );

    const handleClick = useCallback(
        (e: Konva.KonvaEventObject<MouseEvent>): void => {
            /* eslint-disable-next-line no-param-reassign */
            e.cancelBubble = true;

            selectRoom(node.id);
        },
        [node.id, selectRoom]
    );

    const dragEnd = useCallback(
        (e: Konva.KonvaEventObject<DragEvent>) => {
            /* eslint-disable-next-line no-param-reassign */
            e.cancelBubble = true;

            setIsDragging(false);
            updateRoom({
                ...node,
                coords: getSnappedCoords(dragCoords),
            });
        },
        [
            dragCoords,
            node,
            setIsDragging,
            updateRoom,
        ]
    );

    const dragStart = useCallback(
        (e: Konva.KonvaEventObject<DragEvent>) => {
            /* eslint-disable-next-line no-param-reassign */
            e.cancelBubble = true;

            setIsDragging(true);
        },
        [setIsDragging]
    );

    return (
        <React.Fragment>
            {isDragging && (
                <Rect
                    x={shadowX}
                    y={shadowY}
                    fill="#00f"
                    height={GRID_SIZE - 1}
                    width={GRID_SIZE - 1}
                    stroke="#999"
                    strokeWidth={1}
                />
            )}
            <Rect
                draggable
                x={node.coords.x}
                y={node.coords.y}
                fill={isSelected ? '#fb4' : node.color}
                height={GRID_SIZE}
                width={GRID_SIZE}
                stroke={isSelected ? '#fff' : '#222'}
                strokeWidth={1}
                onClick={handleClick}
                onDragEnd={dragEnd}
                onDragMove={handleMove.callback}
                onDragStart={dragStart}
            />
        </React.Fragment>
    );
};

export default Room;
