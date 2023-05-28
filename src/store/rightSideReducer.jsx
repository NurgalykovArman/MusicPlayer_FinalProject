const ListMusic = "ListMusic";
const SearchMusic = "SearchMusic";

// Получение значения из localStorage или использование значения по умолчанию
const initialState = {
  value: localStorage.getItem("rightSideValue") || "ListMusic",
};

export const rightSideReducer = (state = initialState, action) => {
  switch (action.type) {
    case ListMusic:
      return { value: "ListMusic" };
    case SearchMusic:
      return { value: "SearchMusic" };
    default:
      return state;
  }
};

export const listMusicAction = () => {
  // Сохранение значения в localStorage
  localStorage.setItem("rightSideValue", ListMusic);
  return { type: ListMusic };
};

export const searchMusicAction = () => {
  // Сохранение значения в localStorage
  localStorage.setItem("rightSideValue", SearchMusic);
  return { type: SearchMusic };
};