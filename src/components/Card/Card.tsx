import React from "react";
import { observer } from "mobx-react";
import s from "./Card.module.scss";
import { SearchResultModel } from "../../models";

interface Props {
  movie: SearchResultModel;
  genresText: string[];
}

const Card: React.FC<Props> = observer(
  (props): JSX.Element => {
    const movie = props.movie;
    return (
      <div className={s.wrapper}>
        <div className={s.card}>
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
          />
          <div className={s.description}>
            <span className={s.title}>{movie.title}</span>
            <span>{props.genresText?.join(", ")}</span>
          </div>
        </div>
      </div>
    );
  }
);

export default Card;
