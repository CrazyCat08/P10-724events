import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
  new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
  );
  // new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  // Les évènements du slider doivent être classés du plus récent
  // au plus ancien
  // Si evtA est plus récent que evtB, -1 indique que evtA sera
  // rangé avant evtB

  const nextCard = () => {
    setTimeout(
      () => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0),
      5000
    );
  };
  // L'index du tableau byDateDesc ne peut prendre que les valeurs 0, 1 ou 2

  useEffect(() => {
    nextCard();
  });
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <>
          <div
            key={event.title}
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
            >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  key={`${_ + radioIdx}`} // La clé mentionnée n'existait pas
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx} // idx remplacé par index
                  readOnly // pour supprimer warning console
                />
              ))}
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Slider;
