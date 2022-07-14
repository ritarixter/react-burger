import { useDispatch } from "../../utils/hooks";
import { useDrag, useDrop } from "react-dnd";
import PropTypes from "prop-types";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./draggableItem.module.css";
import { deleteElement } from "../../services/actions/constructor";
import { IDraggableItem } from "../../utils/types";
import { FC } from "react";

export const DraggableItem: FC<IDraggableItem> = ({
  id,
  uid,
  price,
  name,
  image,
  findDraggableElement,
  moveDraggableElement,
}) => {
  const dispatch = useDispatch();
  const originalIndex = findDraggableElement(uid).draggableElementIndex;

  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: "DraggableItem",
      item: { uid, originalIndex },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (_, monitor) => {
        if (!monitor.didDrop()) {
          moveDraggableElement(uid, originalIndex);
        }
      },
    }),
    [uid, moveDraggableElement, originalIndex]
  );

  const [, dropTarget] = useDrop(
    {
      accept: "DraggableItem",
      hover({ uid: draggedUid }: any) {
        if (draggedUid !== uid) {
          const { draggableElementIndex: overIndex } =
            findDraggableElement(uid);
          moveDraggableElement(draggedUid, overIndex);
        }
      },
    },
    [findDraggableElement, moveDraggableElement]
  );

  const handleIngredientDelete = (/*e*/) => {
    //const itemToDeleteUid = item.target.closest("li").dataset.uid;
    dispatch(deleteElement(uid));
  };

  return (
    <li
      className={`${styles.list_item} ${
        isDragging && styles.draggableElement_isDragging
      }`}
      data-id={id}
      data-uid={uid}
      key={uid}
      ref={(node) => dragRef(dropTarget(node))}
    >
      <span className="mr-2">
        <DragIcon type="primary" />
      </span>
      <ConstructorElement
        text={name}
        price={price}
        thumbnail={image}
        handleClose={handleIngredientDelete}
      />
    </li>
  );
};

export default DraggableItem;
