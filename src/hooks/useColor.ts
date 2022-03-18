export function useColor(type: string | string[], gradient = false) {
  let color = "";

  if (!gradient) {
    switch (type as string) {
      case "fire":
        color = "bg-red-600";
        break;
      case "fighting":
        color = "bg-orange-800";
        break;
      case "flying":
        color = "bg-blue-300";
        break;
      case "psychic":
        color = "bg-rose-400";
        break;
      case "grass":
        color = "bg-green-600";
        break;
      case "poison":
        color = "bg-purple-600";
        break;
      case "water":
        color = "bg-blue-500";
        break;
      case "ice":
        color = "bg-sky-400";
        break;
      case "ghost":
        color = "bg-indigo-900";
        break;
      case "bug":
        color = "bg-lime-700";
        break;
      case "dark":
        color = "bg-stone-800";
        break;
      case "fairy":
        color = "bg-fuchsia-400";
        break;
      case "electric":
        color = "bg-amber-500";
        break;
      case "ground":
        color = "bg-yellow-700";
        break;
      case "rock":
        color = "bg-yellow-900";
        break;
      case "dragon":
        color = "bg-indigo-700";
        break;
      case "steel":
        color = "bg-zinc-400";
        break;
      default:
        color = "bg-amber-600";
        break;
    }
  }

  if (gradient && Array.isArray(type)) {
    const colorBuilder = ["bg-gradient-to-r"];

    for (const [index, element] of type.entries()) {
      switch (element) {
        case "fire":
          colorBuilder.push(index === 0 ? "from-red-600" : "to-red-600");
          break;
        case "fighting":
          colorBuilder.push(index === 0 ? "from-orange-800" : "to-orange-800");
          break;
        case "flying":
          colorBuilder.push(index === 0 ? "from-blue-300" : "to-blue-300");
          break;
        case "psychic":
          colorBuilder.push(index === 0 ? "from-rose-400" : "to-rose-400");
          break;
        case "grass":
          colorBuilder.push(index === 0 ? "from-green-600" : "to-green-600");
          break;
        case "poison":
          colorBuilder.push(index === 0 ? "from-purple-600" : "to-purple-600");
          break;
        case "water":
          colorBuilder.push(index === 0 ? "from-blue-500" : "to-blue-500");
          break;
        case "ice":
          colorBuilder.push(index === 0 ? "from-sky-400" : "to-sky-400");
          break;
        case "ghost":
          colorBuilder.push(index === 0 ? "from-indigo-900" : "to-indigo-900");
          break;
        case "bug":
          colorBuilder.push(index === 0 ? "from-lime-700" : "to-lime-700");
          color = "bg-lime-700";
          break;
        case "dark":
          colorBuilder.push(index === 0 ? "from-stone-800" : "to-stone-800");
          break;
        case "fairy":
          colorBuilder.push(
            index === 0 ? "from-fuchsia-400" : "to-fuchsia-400"
          );
          break;
        case "electric":
          colorBuilder.push(index === 0 ? "from-amber-500" : "to-amber-500");
          break;
        case "ground":
          colorBuilder.push(index === 0 ? "from-yellow-700" : "to-yellow-700");
          break;
        case "rock":
          colorBuilder.push(index === 0 ? "from-yellow-900" : "to-yellow-900");
          break;
        case "dragon":
          colorBuilder.push(index === 0 ? "from-indigo-700" : "to-indigo-700");
          break;
        case "steel":
          colorBuilder.push(index === 0 ? "from-zinc-400" : "to-zinc-400");
          break;
        default:
          colorBuilder.push(index === 0 ? "from-amber-600" : "to-amber-600");
          break;
      }
    }
    color = colorBuilder.join(" ");
  }

  return color;
}
