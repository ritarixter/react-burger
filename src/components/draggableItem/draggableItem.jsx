import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import PropTypes from "prop-types";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./draggableItem.module.css";
import { deleteElement } from "../../services/actions/constructor";

function DraggableItem({
  id,
  uid,
  name,
  price,
  image,
  findDraggableElement,
  moveDraggableElement,
}) {
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
    () => ({
      accept: "DraggableItem",
      hover({ uid: draggedUid }) {
        if (draggedUid !== uid) {
          const { draggableElementIndex: overIndex } = findDraggableElement(
            uid
          );
          moveDraggableElement(draggedUid, overIndex);
        }
      },
    }),
    [findDraggableElement, moveDraggableElement]
  );

  const handleIngredientDelete = (e) => {
    const itemToDeleteUid = e.target.closest("li").dataset.uid;
    dispatch(deleteElement(itemToDeleteUid));
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
}

DraggableItem.propTypes = {
  id: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  findDraggableElement: PropTypes.func.isRequired,
  moveDraggableElement: PropTypes.func.isRequired,
};

export default DraggableItem;
