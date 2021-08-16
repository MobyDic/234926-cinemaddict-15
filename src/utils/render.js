import Abstract from '../view/abstract.js';

export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

export const render = (container, child, place) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }

  if (child instanceof Abstract) {
    child = child.getElement();
  }

  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(child);
      break;
    case RenderPosition.BEFOREEND:
      container.append(child);
      break;
  }
};


// 1. создаём пустой div-блок
// 2. берём HTML в виде строки и вкладываем в этот div-блок, превращая в DOM-элемент
// 3. возвращаем этот DOM-элемент
export const createElement = (template) => {
  const newElement = document.createElement('div'); // 1
  newElement.innerHTML = template; // 2

  return newElement.firstChild; // 3
};
// HTML в строке должен иметь общую обёртку,

export const append = (newChild, parent) => {

  if (newChild instanceof Abstract) {
    newChild = newChild.getElement();
  }


  if (parent === null || newChild === null) {
    throw new Error('Can\'t append unexisting elements');
  }

  parent.appendChild(newChild);
};

export const remove = (component, parent) => {
  if (!(component instanceof Abstract)) {
    throw new Error('Can remove only components');
  }

  if (parent === null || component === null) {
    throw new Error('Can\'t remove elements');
  }

  parent.removeChild(component.getElement());

};
