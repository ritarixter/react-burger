import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import { BurgerIcon,ListIcon,ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './AppHeader.module.css'

function AppHeader(){
  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} mt-4`}>
        <ul className={styles.menu}>
          <li className="text text_type_main-default p-5">
            <a href='#' className={styles.menu__item}>
              <BurgerIcon type="primary" /><span className='ml-2'>Конструктор</span>
            </a>
          </li>

          <li className="text text_type_main-default p-5 ml-2">
            <a href='#' className={styles.menu__item}>
              <ListIcon type="secondary"/> <span className='ml-2'>Лента заказов</span>
            </a>
          </li>

          <li className={styles.m_center}>
            <a href='#' className={styles.menu__item}>
              <Logo/>
            </a>
          </li>

          <li className={`${styles.mr_l} text text_type_main-default p-5`}>
            <a href='#' className={styles.menu__item}> <ProfileIcon type="secondary" /><span className='ml-2'>Личный кабинет</span>
            </a>
          </li>
      
      </ul>
      </nav>
    </header>
  );
}

export default AppHeader