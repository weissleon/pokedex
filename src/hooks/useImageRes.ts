import { useQuery } from "react-query";

function getImage(url: string) {
  return fetch(url)
    .then((res) => res.blob())
    .then((blob) => URL.createObjectURL(blob));
}

export function useImageRes(url: string) {
  const fetchImage = () => getImage(url);
  const { data } = useQuery([url], fetchImage);

  return data;
}
