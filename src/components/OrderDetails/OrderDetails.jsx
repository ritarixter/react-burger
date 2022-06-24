import styles from "./OrderDetails.module.css";
import logoDone from "../../images/done.png";
import Preloader from "../Preloader/Preloader";

function OrderDetails(props) {
  return (
   <div className={`${styles.info} pb-30`}>
      {props.orderNumber ? (
      <><h2
        className={`${styles.orderNumber} text text_type_digits-large mt-4 mb-8 `}
      >
        {props.orderNumber}
      </h2>
    
      
      <p className="text text_type_main-medium ">индентификатор заказа</p>
      <img className="mt-15 mb-15" src={logoDone} alt="Заказ принят" />
      <p className="text text_type_main-default mb-2">
        Ваш заказ начали готовить
      </p>
      <p className={`${styles.paragraph} text text_type_main-default`}>
        Дождитесь готовности на орбитальной станции
      </p>
      </>):
       (<div className={`${styles.preloader}`}><Preloader/></div>)}


    </div> 
 
  );
}

export default OrderDetails;
