import { useMatchStore } from "../store/matchStore";
import { Event } from "../types";

interface UseMatchCardProps {
  match: Event;
}

export function useMatchCard(props: UseMatchCardProps) {
  const store = useMatchStore();

  const handleMatchClick = () => {
    console.log('Partida clicada:', props.match.id);
  };

  return {
    handleMatchClick
  };
}