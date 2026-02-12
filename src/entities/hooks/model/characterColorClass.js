export const getCharacterColorClass = (currentScene) => {
    if (!currentScene || !currentScene.character) return "character-unknown";
    switch (currentScene.character) {
      case "Казума":
        return "character-kazuma";
      case "Аква":
        return "character-aqua";
      case "Мегумин":
        return "character-megumin";
      case "Даркнесс":
        return "character-darkness";
      case "Виз":
        return "character-wiz";
      case "Юнь-Юнь":
        return "character-yunyun";
      default:
        return "character-unknown";
    }
  };
