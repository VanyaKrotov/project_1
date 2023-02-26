import React, { FC } from "react";

import LifeCycle from "@/assets/images/life-cycle.png";

import CodeView from "components/code-view";

import Toolbar from "../toolbar";

interface Props {
  section: string;
}

const EXAMPLE = `
class CounterState extends State<{ counter: number; }> {
  public readonly data = {
    counter: 0,
  }

  public increment() {
    this.change({ counter: this.data.counter + 1 });
  }

  public decrement() {
    this.change({ counter: this.data.counter - 1 });
  }
}

const counterState = new CounterState();

counterState.watch(['counter'], () => {
  console.log('counter: ', counterState.data.counter);
});

setTimeout(() => {
  counterState.increment();
}, 1000);
`;

const INSTALL = `npm i
cd ./packages/state
npm i
`;

const Intro: FC<Props> = () => {
  return (
    <div className="section">
      <div>
        <h1>Введение в projectx.state</h1>
        <p>
          Projectx.State - это библиотека для управления состояние приложения,
          реализованая по принципам реактивного программирования.
        </p>
        <p>
          <a href="https://badge.fury.io/js/projectx.state">
            <img
              src="https://badge.fury.io/js/projectx.state.svg"
              alt="npm version"
              height="18"
            />
          </a>
        </p>
      </div>

      <br />

      <div>
        <h2>Философия</h2>
        <table>
          <tbody>
            <tr>
              <td>
                <big>😊</big>
              </td>
              <td>
                <h5>Простота</h5>
                <p>
                  Создавайте состояние без лишних усилий. Чтобы создать
                  состояние необходимо просто создать класс и указать значения
                  по умолчанию, после чего его уже можно использовать.
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <big>&#129718;</big>
              </td>
              <td>
                <h5>Легкость</h5>
                <p>
                  Благодаря простоте подхода количество кода минимальное что
                  обеспечит высокую скорость загрузки библиотеки даже при
                  медленном соединении с интернетом.
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <big>🧑‍🔧</big>
              </td>
              <td>
                <h5>Универсальность</h5>
                <p>
                  Библиотека основана построена по принципам реактивного
                  программирования благодаря чему обеспечивается поддержка
                  большого количества платформ.
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <big>🚝</big>
              </td>
              <td>
                <h5>Скорость работы</h5>
                <p>
                  Скорость работы обеспечивается меньшим количеством
                  выполняемого кода в моменте работы вашего приложения.
                  Projectx.State продвигает идею микро-состояний что позволяет
                  выполнять меньшее количество селекторов и мемоизаций при
                  работе с данными. Использование пдход с использованием
                  вотчеров вовсе приближено к сложности <code>O(1)</code>. Также
                  данная библиотека не делает лишних сравнений и копий объектов,
                  совершение мутации объекта гарантирует уведомления слушателей.
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <br />

      <div>
        <h2>Поддерживаемые среды разработки</h2>
        <ul>
          <li>
            Поддержка <a href="https://www.typescriptlang.org/">Typescript</a>
          </li>
          <li>
            Поддержка <a href="https://www.electronjs.org/">Electron</a>
          </li>
        </ul>
      </div>

      <br />

      <div>
        <h2>Небольшой пример</h2>
        <p>Пример кода показывающий основной подход создания состояния</p>
        <CodeView>{EXAMPLE}</CodeView>
        <br />

        <p>
          В представленнов выше ☝️ примере происходит создание состояния
          хранящего счетчик. После создания класса состояния происходит создание
          его экземпляра, экземпляр содержит в себе все необходимые методы для
          внешних и внутренних мутаций и реакций.
        </p>
        <p>
          После создания состояния для визуализации добавляем вотчер который
          будет следить за мутациями значения <code>counter</code>, внутри
          вотчера как экшен передаем функцию в которой будет выводится сообщение
          в консоль с текущим состоянием счетчика. Ну и в конце добавляем
          мутации счетчика посредством вызова функции инкремента счетчика с
          интервалом в 1 секунду.
        </p>

        <br />

        <p>
          <b>Как это работает?</b>
        </p>
        <p>
          При срабатывании функции интервала происходит вызов метода инкремента
          состояния который в свою очередь выполняет мутацию поля{" "}
          <code>counter</code>, мутация изменяет значение поля и оповещает всех
          слушателей о том что значение было изменено, слушатели вызывают свои
          экшены и цикл работы заканчивается переходя в режим ожидая новых
          мутаций.
        </p>
        <br />

        <div className="mr-20 p-20">
          <img src={LifeCycle} alt="жизненный цикл реакции" width="100%" />
        </div>
      </div>

      <br />

      <div>
        <h2>Разработка</h2>
        <p>
          Для создания форка или помочь в разработке необходимо сделать
          несколько простых шагов.
        </p>

        <ul>
          <li>
            Клонировать репозиторий{" "}
            <a href="https://github.com/VanyaKrotov/projectx">projectx</a>:
          </li>
          <CodeView language="http">
            git clone https://github.com/VanyaKrotov/projectx
          </CodeView>

          <li>Установить модули:</li>
          <CodeView language="http">
            npm i&#10;&#13;cd ./packages/state&#10;&#13;npm i
          </CodeView>

          <li>Запустить среду одной из команд:</li>
          <p>
            - <code>dev:state</code> - запуск разработки состояния (запустит
            сборку файла <code>examples/state/index.ts</code>)
          </p>
          <p>
            - <code>test</code> или <code>test:watch</code> - запуск
            тестирования
          </p>
        </ul>
      </div>

      <br />

      <Toolbar next={{ link: "/docs/install", title: "Установка" }} />
    </div>
  );
};

export default Intro;
