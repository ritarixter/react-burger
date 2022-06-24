import styles from "./NotFound404.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useHistory } from "react-router-dom";

export function NotFound404() {
  const history = useHistory();
  return (
    <div className={styles.main}>
      <div className={styles.login}>
        <p className="text text_type_digits-large text_color_inactive">404</p>
        <p className="text text_type_main-large text_color_inactive">
          Страница не найдена
        </p>
        <div className="mt-10">
          <Button
            type="primary"
            size="medium"
            onClick={(e) => {
              e.preventDefault();
              history.replace({ pathname: "/" });
            }}
          >
            Вернуться на главную
          </Button>
        </div>
      </div>
    </div>
  );
}
