import styles from "./OrderDetails.module.css";
import logoDone from "../../images/done.png";

function OrderDetails() {
  return (
    <div className={`${styles.info} pb-30`}>
      <h2
        className={`${styles.orderNumber} text text_type_digits-large mt-4 mb-8 `}
      >
        034536
      </h2>
      <p className="text text_type_main-medium ">индентификатор заказа</p>
      <img className="mt-15 mb-15" src={logoDone} alt="Заказ принят" />
      <p className="text text_type_main-default mb-2">
        Ваш заказ начали готовить
      </p>
      <p className={`${styles.paragraph} text text_type_main-default`}>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}

export default OrderDetails;
