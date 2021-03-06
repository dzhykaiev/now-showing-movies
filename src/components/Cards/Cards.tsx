import React from "react";
import { observer } from "mobx-react";
import { useStores } from "../../hooks/use-stores";
import Card from "../Card/Card";
import s from "./Cards.module.scss";
import { Genre } from "../../models";
import Loading from "../Loading/Loading";
import InfiniteScroll from "react-infinite-scroller";

const getGenresText = (genres: Genre[], ids: number[]): string[] => {
  return genres?.reduce((acc, cur) => {
    if (ids.some((id) => id === cur.id)) {
      return [...acc, cur.name];
    }
    return acc;
  }, []);
};

const Cards = observer(() => {
  const { movieStore } = useStores();
  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={movieStore.fetchData}
      hasMore={movieStore.hasMore}
      loader={<Loading key={"Loading"} />}
    >
      <div className={s.cards}>
        {movieStore?.result?.map((item) => {
          const genres: string[] = getGenresText(
            movieStore.genres,
            item.genre_ids
          );
          return <Card key={item.id} movie={item} genresText={genres} />;
        })}
      </div>
    </InfiniteScroll>
  );
});

export default Cards;
